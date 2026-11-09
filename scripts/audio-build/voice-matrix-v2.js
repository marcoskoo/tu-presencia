/**
 * Matriz de voces v2 — selección de voz para meditaciones en español.
 * 1. TTS de una frase representativa con las 7 voces (misma velocidad 0.8)
 * 2. ASR de cada muestra para puntuar pronunciación española
 * 3. Reporte: similitud %, duración (ritmo natural), tamaño
 */
const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const TEXT =
  'Bienvenida a este espacio de presencia. Escucha los sonidos de tu alrededor. ' +
  'Respira con suavidad: el aire entra, y el aire sale. Suelta la tensión de los hombros.'

const REFERENCE =
  'bienvenida a este espacio de presencia escucha los sonidos de tu alrededor ' +
  'respira con suavidad el aire entra y el aire sale suelta la tensión de los hombros'

// Ordenadas por promesa para "relajante + español"; el cacheo por voz permite reanudar
const VOICES = ['xiaochen', 'douji', 'luodo', 'kazi', 'tongtong', 'jam', 'chuichui']
const SPEED = 0.8

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function ffprobeDuration(file) {
  const out = execFileSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file],
    { encoding: 'utf-8' }
  )
  return parseFloat(out.trim())
}

function similarity(a, b) {
  const wa = a.toLowerCase().split(/\s+/).filter(Boolean)
  const wb = new Set(b.toLowerCase().split(/\s+/).filter(Boolean))
  let hit = 0
  for (const w of wa) if (wb.has(w)) hit++
  return hit / Math.max(wa.length, 1)
}

async function ttsWithRetry(zai, text, voice, outPath) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await zai.audio.tts.create({
        input: text,
        voice,
        speed: SPEED,
        response_format: 'wav',
        stream: false,
      })
      const buf = Buffer.from(new Uint8Array(await res.arrayBuffer()))
      if (buf.length < 2000) throw new Error(`audio pequeño (${buf.length} B)`)
      fs.writeFileSync(outPath, buf)
      return
    } catch (e) {
      const is429 = e.message?.includes('429')
      const wait = is429 ? 30000 * attempt : 6000
      console.log(`   [${voice}] reintento ${attempt} (${is429 ? '429' : e.message}) — espera ${wait / 1000}s`)
      if (attempt === 5) throw e
      await sleep(wait)
    }
  }
}

async function asrWithRetry(zai, buf, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      return await zai.audio.asr.create({ file_base64: buf.toString('base64') })
    } catch (e) {
      if (e.message?.includes('429') && i < tries - 1) {
        await sleep(20000)
        continue
      }
      throw e
    }
  }
}

async function main() {
  const zai = await ZAI.create()
  const outDir = path.join(__dirname, 'voice-matrix-v2')
  fs.mkdirSync(outDir, { recursive: true })

  const results = []

  // 1) TTS por voz
  for (const voice of VOICES) {
    const file = path.join(outDir, `${voice}.wav`)
    if (fs.existsSync(file) && fs.statSync(file).size > 2000) {
      console.log(`[cache] ${voice}.wav ya existe`)
    } else {
      process.stdout.write(`TTS ${voice}… `)
      try {
        await ttsWithRetry(zai, TEXT, voice, file)
        console.log('ok')
      } catch (e) {
        console.log(`FALLO definitivo: ${e.message}`)
        results.push({ voice, error: e.message })
        continue
      }
      await sleep(8000)
    }
    results.push({ voice, file })
  }

  // 2) ASR por muestra
  console.log('\n==== RESULTADOS ====')
  console.log('voz        | similitud | duración | tamaño | transcripción ASR')
  console.log('-----------|-----------|----------|--------|------------------')
  for (const r of results) {
    if (r.error || !fs.existsSync(r.file)) {
      console.log(`${r.voice.padEnd(10)} | FALLO TTS`)
      continue
    }
    try {
      const res = await asrWithRetry(zai, fs.readFileSync(r.file))
      const text = (res.text ?? '').trim()
      const sim = similarity(REFERENCE, text)
      const dur = ffprobeDuration(r.file)
      const kb = Math.round(fs.statSync(r.file).size / 1024)
      console.log(
        `${r.voice.padEnd(10)} | ${(sim * 100).toFixed(0).padStart(7)}% | ${dur.toFixed(1).padStart(6)}s | ${String(kb).padStart(5)}KB | ${text.slice(0, 80)}`
      )
      // JSON para consumo posterior
      fs.appendFileSync(
        path.join(outDir, 'results.jsonl'),
        JSON.stringify({ voice: r.voice, similarity: +sim.toFixed(3), duration: +dur.toFixed(2) }) + '\n'
      )
    } catch (e) {
      console.log(`${r.voice.padEnd(10)} | ERROR ASR: ${e.message}`)
    }
    await sleep(10000)
  }
}

main().catch((e) => {
  console.error('FALLO:', e)
  process.exit(1)
})
