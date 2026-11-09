/**
 * ASR completo v2 — verifica pronunciación española de las muestras de
 * voice-matrix-v2, troceando en fragmentos <=28s (límite ASR: 30s).
 * Concatena transcripciones y puntúa contra la referencia completa.
 */
const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const VOICES = ['xiaochen', 'douji', 'luodo', 'kazi', 'tongtong', 'jam', 'chuichui']

const REFERENCE =
  'bienvenida a este espacio de presencia escucha los sonidos de tu alrededor ' +
  'respira con suavidad el aire entra y el aire sale suelta la tensión de los hombros'

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

function similarity(a, b) {
  const wa = a.toLowerCase().split(/\s+/).filter(Boolean)
  const wb = new Set(b.toLowerCase().split(/\s+/).filter(Boolean))
  let hit = 0
  for (const w of wa) if (wb.has(w)) hit++
  return hit / Math.max(wa.length, 1)
}

async function asrWithRetry(zai, buf, tries = 6) {
  for (let i = 0; i < tries; i++) {
    try {
      return await zai.audio.asr.create({ file_base64: buf.toString('base64') })
    } catch (e) {
      if (e.message?.includes('429') && i < tries - 1) {
        await sleep(45000)
        continue
      }
      throw e
    }
  }
}

function chunkPaths(file, dur, chunkDir, tag) {
  const paths = []
  const MAX = 28 // segundos por trozo (límite ASR 30s, margen)
  const cuts = []
  for (let t = 0; t < dur; t += MAX) cuts.push([t, Math.min(t + MAX, dur)])
  cuts.forEach(([ss, to], i) => {
    const p = path.join(chunkDir, `${tag}-c${i}.wav`)
    sh('ffmpeg', ['-y', '-i', file, '-ss', String(ss), '-to', String(to), '-c:a', 'pcm_s16le', p])
    paths.push(p)
  })
  return paths
}

async function main() {
  const zai = await ZAI.create()
  const srcDir = path.join(__dirname, 'voice-matrix-v2')
  const chunkDir = path.join(srcDir, 'chunks')
  fs.mkdirSync(chunkDir, { recursive: true })

  // Saltar voces ya verificadas en results.jsonl
  const outPath = path.join(srcDir, 'results.jsonl')
  const done = new Set()
  if (fs.existsSync(outPath)) {
    for (const line of fs.readFileSync(outPath, 'utf-8').split('\n')) {
      if (!line.trim()) continue
      try { done.add(JSON.parse(line).voice) } catch {}
    }
  }
  const pending = VOICES.filter((v) => !done.has(v))
  if (pending.length < VOICES.length) {
    console.log(`[cache] ya verificadas: ${[...done].join(', ')} — pendientes: ${pending.join(', ')}`)
  }

  console.log('voz        | similitud | duración | transcripción completa')
  console.log('-----------|-----------|----------|------------------------')

  for (const voice of pending) {
    const file = path.join(srcDir, `${voice}.wav`)
    if (!fs.existsSync(file)) {
      console.log(`${voice.padEnd(10)} | SIN MUESTRA`)
      continue
    }
    const dur = ffprobeDuration(file)
    let texts = []
    try {
      const chunks = dur <= 29 ? [file] : chunkPaths(file, dur, chunkDir, voice)
      for (const c of chunks) {
        const res = await asrWithRetry(zai, fs.readFileSync(c))
        texts.push((res.text ?? '').trim())
        if (chunks.length > 1) await sleep(10000)
      }
    } catch (e) {
      console.log(`${voice.padEnd(10)} | ERROR ASR: ${e.message}`)
      await sleep(8000)
      continue
    }
    const text = texts.join(' ').replace(/\s+/g, ' ')
    const sim = similarity(REFERENCE, text)
    console.log(`${voice.padEnd(10)} | ${(sim * 100).toFixed(0).padStart(7)}% | ${dur.toFixed(1).padStart(6)}s | ${text}`)
    fs.appendFileSync(
      path.join(srcDir, 'results.jsonl'),
      JSON.stringify({ voice, similarity: +sim.toFixed(3), duration: +dur.toFixed(2), transcript: text }) + '\n'
    )
    await sleep(15000)
  }
}

main().catch((e) => {
  console.error('FALLO:', e)
  process.exit(1)
})
