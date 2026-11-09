const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')
const path = require('path')

const REFERENCE_ES =
  'hola esto es una prueba de voz en español la respiración consciente me trae al presente'
const REFERENCE_EN =
  'hello this is a voice test in english conscious breathing brings me to the present'

function similarity(a, b) {
  const wa = new Set(a.toLowerCase().split(/\s+/).filter(Boolean))
  const wb = new Set(b.toLowerCase().split(/\s+/).filter(Boolean))
  let hit = 0
  for (const w of wa) if (wb.has(w)) hit++
  return hit / Math.max(wa.size, wb.size)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function asrWithRetry(zai, buf, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      return await zai.audio.asr.create({ file_base64: buf.toString('base64') })
    } catch (e) {
      if (e.message?.includes('429') && i < tries - 1) {
        console.log('   (rate limit, esperando 20s…)')
        await sleep(20000)
        continue
      }
      throw e
    }
  }
}

async function main() {
  const zai = await ZAI.create()
  const cases = [
    { file: 'voice-matrix/tongtong.wav', ref: REFERENCE_ES, lang: 'ES' },
    { file: 'voice-matrix/douji.wav', ref: REFERENCE_ES, lang: 'ES' },
    { file: 'voice-matrix/luodo.wav', ref: REFERENCE_ES, lang: 'ES' },
    { file: 'voice-matrix/jam.wav', ref: REFERENCE_ES, lang: 'ES' },
  ]

  for (const c of cases) {
    const p = path.join(__dirname, c.file)
    if (!fs.existsSync(p)) {
      console.log(`== ${c.file}: NO EXISTE`)
      continue
    }
    try {
      const res = await asrWithRetry(zai, fs.readFileSync(p))
      const text = res.text ?? ''
      console.log(`\n== ${path.basename(c.file)} [${c.lang}] — similitud ${(similarity(c.ref, text) * 100).toFixed(0)}%`)
      console.log(`   "${text}"`)
    } catch (e) {
      console.log(`\n== ${path.basename(c.file)} — ERROR: ${e.message}`)
    }
    await sleep(12000)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
