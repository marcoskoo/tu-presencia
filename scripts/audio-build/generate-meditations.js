/**
 * Pipeline de meditaciones GUIADAS CON VOZ (TTS) — EN DESUSO para la app.
 * A petición del usuario, las pistas de public/audios son ahora melodías
 * instrumentales sin voz: ver make-melodies.py (el generador actual).
 * Este archivo queda como referencia por si se quiere volver a tener voz.
 *
 * Pipeline original:
 * 1. TTS por segmento (voz chuichui, velocidad 0.75) con reanudación y reintentos
 * 2. Recorte de silencios + pulido cálido por segmento
 * 3. Ensamblado: campana inicial + segmentos + pausas + campana final
 * 4. Codificación MP3 en public/audios/
 */
const ZAI = require('z-ai-web-dev-sdk').default
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const { MEDITATIONS } = require('./meditations-data')

// Filtro opcional por id: `node generate-meditations.js caminando yoga-nidra`
const FILTER_IDS = process.argv.slice(2)
const SELECTED = FILTER_IDS.length
  ? MEDITATIONS.filter((m) => FILTER_IDS.includes(m.id))
  : MEDITATIONS

const BUILD = path.join(__dirname, 'build')
const SEG_DIR = path.join(BUILD, 'segments')
const PIECE_DIR = path.join(BUILD, 'pieces')
const OUT_DIR = '/home/z/my-project/public/audios'

// Voz y ritmo — ver scripts/audio-build/voice-matrix-v2 y duelo para la evaluación.
// chuichui: mejor español disponible (57-61% ASR) y a 0.75 desarrolla pausas
// meditativas naturales (60% de silencio intra-segmento). Para volver a la voz
// anterior: VOICE='tongtong', SPEED=0.8.
const VOICE = 'chuichui'
const SPEED = 0.75

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function sh(cmd, args) {
  execFileSync(cmd, args, { stdio: ['ignore', 'ignore', 'ignore'] })
}

function ffprobeDuration(file) {
  const out = execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file],
    { encoding: 'utf-8' }
  )
  return parseFloat(out.trim())
}

/** Recorta bordes de silencio manteniendo un pequeño colchón, normaliza a 24 kHz mono */
function trimSegment(src, dst) {
  sh('ffmpeg', [
    '-y', '-i', src,
    '-af',
    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,' +
      'areverse,' +
      'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.25,' +
      'areverse',
    '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', dst,
  ])
}

/**
 * Pulido cálido-relajante de un segmento de voz ya recortado:
 *  - igual que antes recorta bordes, y además:
 *  - -3.5 dB en la banda 4.7 kHz (dureza/sibilancia, timbre "infantil" de la voz)
 *  - lowpass 10.5 kHz (quita aire estridente; el contenido útil del habla queda intacto)
 *  - +2 dB de estante de graves bajo 230 Hz (calidez de pecho)
 *  - highpass 70 Hz (limpia rumble)
 * Luego, si el segmento dura >= 2.5 s, loudnorm a -19 LUFS (nivel suave y parejo).
 */
function polishSegment(src, dst) {
  const tmp = dst + '.tmp.wav'
  sh('ffmpeg', [
    '-y', '-i', src,
    '-af',
    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,' +
      'areverse,' +
      'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.3,' +
      'areverse,' +
      'equalizer=f=4700:width_type=o:w=1.1:g=-3.5,' +
      'lowpass=f=10500,' +
      'bass=g=2:f=230,' +
      'highpass=f=70',
    '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', tmp,
  ])
  const dur = ffprobeDuration(tmp)
  if (dur >= 2.5) {
    sh('ffmpeg', [
      '-y', '-i', tmp,
      '-af', 'loudnorm=I=-19:TP=-2.0:LRA=11',
      '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', dst,
    ])
  } else {
    // segmento muy corto: loudnorm no mide bien; solo EQ + retoque de nivel
    sh('ffmpeg', [
      '-y', '-i', tmp,
      '-af', 'volume=-1.5dB',
      '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', dst,
    ])
  }
  fs.unlinkSync(tmp)
}

function makeSilence(dst, seconds) {
  sh('ffmpeg', [
    '-y', '-f', 'lavfi', '-i', `anullsrc=r=24000:cl=mono`,
    '-t', String(seconds), '-c:a', 'pcm_s16le', dst,
  ])
}

function convertTo24k(src, dst, extra = []) {
  sh('ffmpeg', ['-y', '-i', src, ...extra, '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', dst])
}

async function ttsSegment(zai, text, outPath) {
  for (let attempt = 1; attempt <= 7; attempt++) {
    try {
      const res = await zai.audio.tts.create({
        input: text,
        voice: VOICE,
        speed: SPEED,
        response_format: 'wav',
        stream: false,
      })
      const buf = Buffer.from(new Uint8Array(await res.arrayBuffer()))
      if (buf.length < 2000) throw new Error(`audio sospechosamente pequeño (${buf.length} B)`)
      fs.writeFileSync(outPath, buf)
      return
    } catch (e) {
      const is429 = e.message?.includes('429')
      const wait = is429 ? 30000 * attempt : 5000
      console.log(`   reintento ${attempt} (${is429 ? 'rate limit' : e.message}) — espera ${wait / 1000}s`)
      if (attempt === 7) throw e
      await sleep(wait)
    }
  }
}

async function main() {
  fs.mkdirSync(SEG_DIR, { recursive: true })
  fs.mkdirSync(PIECE_DIR, { recursive: true })
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const zai = await ZAI.create()

  // 1) Generar todos los segmentos de voz (con reanudación)
  let total = 0
  for (const med of SELECTED) total += med.segments.length

  let done = 0
  const failed = new Set()
  for (const med of SELECTED) {
    for (let i = 0; i < med.segments.length; i++) {
      const segPath = path.join(SEG_DIR, `${med.id}-${String(i).padStart(2, '0')}.wav`)
      if (!fs.existsSync(segPath)) {
        process.stdout.write(`[${++done}/${total}] TTS ${med.id} seg ${i + 1}… `)
        try {
          await ttsSegment(zai, med.segments[i].text, segPath)
          console.log('ok')
        } catch (e) {
          console.log(`FALLO definitivo: ${med.id} seg ${i + 1}`)
          failed.add(med.id)
        }
        await sleep(12000)
      } else {
        console.log(`[cache] ${med.id} seg ${i + 1} ya existe`)
      }
    }
  }

  // 2) Preparar piezas fijas — campanas atenuadas 3 dB para no sobresaltar
  const bellStart = path.join(BUILD, 'bell-start-24k.wav')
  const bellEnd = path.join(BUILD, 'bell-end-24k.wav')
  const bellDing = path.join(BUILD, 'bell-ding-24k.wav')
  convertTo24k(path.join(__dirname, 'bell-start.wav'), bellStart, ['-af', 'volume=-3dB'])
  convertTo24k(path.join(__dirname, 'bell-end.wav'), bellEnd, ['-af', 'volume=-3dB'])
  // "Ding" corto: primeros 3.5 s de la campana final con fundido
  convertTo24k(path.join(__dirname, 'bell-end.wav'), bellDing, ['-t', '3.5', '-af', 'afade=t=out:st=2.3:d=1.2,volume=-3dB'])

  const silences = new Map()
  function silenceFile(seconds) {
    const key = seconds.toFixed(2)
    if (!silences.has(key)) {
      const p = path.join(PIECE_DIR, `sil-${key}.wav`)
      makeSilence(p, seconds)
      silences.set(key, p)
    }
    return silences.get(key)
  }

  // 3) Ensamblar cada meditación (solo si todos sus segmentos existen)
  for (const med of SELECTED) {
    if (failed.has(med.id)) {
      console.log(`✗ ${med.id}: omitida por fallos de TTS`)
      continue
    }
    const listPath = path.join(BUILD, `concat-${med.id}.txt`)
    const lines = []

    if (med.introBell) {
      lines.push(`file '${bellStart}'`)
      lines.push(`file '${silenceFile(2.0)}'`)
    } else {
      lines.push(`file '${silenceFile(0.6)}'`)
    }

    for (let i = 0; i < med.segments.length; i++) {
      const trimmed = path.join(PIECE_DIR, `${med.id}-${String(i).padStart(2, '0')}-trim.wav`)
      polishSegment(path.join(SEG_DIR, `${med.id}-${String(i).padStart(2, '0')}.wav`), trimmed)
      lines.push(`file '${trimmed}'`)
      lines.push(`file '${silenceFile(med.segments[i].pause)}'`)
    }

    lines.push(`file '${silenceFile(2.5)}'`)
    lines.push(`file '${med.introBell ? bellEnd : bellDing}'`)
    lines.push(`file '${silenceFile(1.2)}'`)

    fs.writeFileSync(listPath, lines.join('\n') + '\n')

    const rawOut = path.join(BUILD, `${med.id}-full.wav`)
    sh('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listPath, '-c:a', 'pcm_s16le', rawOut])

    const mp3Out = path.join(OUT_DIR, med.file)
    sh('ffmpeg', ['-y', '-i', rawOut, '-codec:a', 'libmp3lame', '-b:a', '64k', '-ar', '24000', '-ac', '1', mp3Out])

    const dur = ffprobeDuration(mp3Out)
    const size = (fs.statSync(mp3Out).size / 1024 / 1024).toFixed(2)
    console.log(`✓ ${med.file}: ${Math.floor(dur / 60)}m ${Math.round(dur % 60)}s · ${size} MB`)
  }

  // 4) Campana de presencia (interactiva) y ding de fase
  //    La campana larga se atenúa 3 dB (suena tras estados de calma; que no sobresalte)
  const bellOut = path.join(OUT_DIR, 'campana-presencia.mp3')
  sh('ffmpeg', ['-y', '-i', path.join(__dirname, 'bell-presence.wav'), '-af', 'volume=-3dB', '-codec:a', 'libmp3lame', '-b:a', '96k', '-ar', '24000', '-ac', '1', bellOut])
  console.log(`✓ campana-presencia.mp3: ${ffprobeDuration(bellOut).toFixed(1)}s`)

  const dingOut = path.join(OUT_DIR, 'ding-fase.mp3')
  sh('ffmpeg', ['-y', '-i', path.join(__dirname, 'ding-fase.wav'), '-codec:a', 'libmp3lame', '-b:a', '64k', '-ar', '24000', '-ac', '1', dingOut])
  console.log(`✓ ding-fase.mp3: ${ffprobeDuration(dingOut).toFixed(1)}s`)

  console.log('\nRESUMEN ARCHIVOS FINALES:')
  for (const f of fs.readdirSync(OUT_DIR)) {
    console.log(`  ${f} — ${(fs.statSync(path.join(OUT_DIR, f)).size / 1024 / 1024).toFixed(2)} MB`)
  }
  if (failed.size) {
    console.log(`\nATENCION: meditaciones incompletas: ${[...failed].join(', ')}`)
    process.exitCode = 2
  }
}

main().catch((e) => {
  console.error('FALLO:', e)
  process.exit(1)
})
