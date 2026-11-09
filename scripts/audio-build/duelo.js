/**
 * Duelo final tongtong vs chuichui:
 * 1. TTS de texto difícil (rr, ñ, diptongos, números) a velocidades 0.75 y 0.85
 * 2. ASR por muestra
 * 3. Métricas acústicas (F0, pausas) se calculan aparte en Python
 */
const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const TEXT =
  'Siente el peso del cuerpo. Escucha los sonidos de tu alrededor. ' +
  'La mandíbula se relaja, la frente se suaviza. Cinco, cuatro, tres, dos, uno. Descansa.'

const REFERENCE =
  'siente el peso del cuerpo escucha los sonidos de tu alrededor ' +
  'la mandíbula se relaja la frente se suaviza cinco cuatro tres dos uno descansa'

const CASES = [
  { voice: 'tongtong', speed: 0.75 },
  { voice: 'tongtong', speed: 0.85 },
  { voice: 'chuichui', speed: 0.75 },
  { voice: 'chuichui', speed: 0.85 },
]

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

async function main() {
  const zai = await ZAI.create()
  const outDir = path.join(__dirname, 'duelo')
  fs.mkdirSync(outDir, { recursive: true })

  for (const c of CASES) {
    const name = `${c.voice}-${String(c.speed).replace('.', '')}`
    const file = path.join(outDir, `${name}.wav`)
    if (fs.existsSync(file) && fs.statSync(file).size > 2000) {
      console.log(`[cache] ${name} ya existe`)
    } else {
      process.stdout.write(`TTS ${name}… `)
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          const res = await zai.audio.tts.create({
            input: TEXT,
            voice: c.voice,
            speed: c.speed,
            response_format: 'wav',
            stream: false,
          })
          const buf = Buffer.from(new Uint8Array(await res.arrayBuffer()))
          if (buf.length < 2000) throw new Error('audio pequeño')
          fs.writeFileSync(file, buf)
          console.log('ok')
          break
        } catch (e) {
          const is429 = e.message?.includes('429')
          const wait = is429 ? 30000 * attempt : 6000
          console.log(`   reintento ${attempt} (${is429 ? '429' : e.message}) — espera ${wait / 1000}s`)
          if (attempt === 5) throw e
          await sleep(wait)
        }
      }
      await sleep(8000)
    }
  }

  console.log('\nmuestra         | similitud | duración | transcripción')
  console.log('----------------|-----------|----------|---------------------')
  for (const c of CASES) {
    const name = `${c.voice}-${String(c.speed).replace('.', '')}`
    const file = path.join(outDir, `${name}.wav`)
    try {
      const res = await asrWithRetry(zai, fs.readFileSync(file))
      const text = (res.text ?? '').trim().replace(/\s+/g, ' ')
      const sim = similarity(REFERENCE, text)
      const dur = ffprobeDuration(file)
      console.log(`${name.padEnd(15)} | ${(sim * 100).toFixed(0).padStart(7)}% | ${dur.toFixed(1).padStart(6)}s | ${text}`)
      fs.appendFileSync(
        path.join(outDir, 'results.jsonl'),
        JSON.stringify({ voice: c.voice, speed: c.speed, similarity: +sim.toFixed(3), duration: +dur.toFixed(2), transcript: text }) + '\n'
      )
    } catch (e) {
      console.log(`${name.padEnd(15)} | ERROR ASR: ${e.message}`)
    }
    await sleep(15000)
  }
}

main().catch((e) => {
  console.error('FALLO:', e)
  process.exit(1)
})
