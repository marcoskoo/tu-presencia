const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')
const path = require('path')

const TEXT = 'Hola, esto es una prueba de voz en español. La respiración consciente me trae al presente.'

const VOICES = ['tongtong', 'kazi', 'douji', 'luodo', 'jam', 'xiaochen']

async function main() {
  const zai = await ZAI.create()
  const outDir = path.join(__dirname, 'voice-matrix')
  fs.mkdirSync(outDir, { recursive: true })

  for (const voice of VOICES) {
    try {
      const res = await zai.audio.tts.create({
        input: TEXT,
        voice,
        speed: 0.85,
        response_format: 'wav',
        stream: false,
      })
      const buf = Buffer.from(new Uint8Array(await res.arrayBuffer()))
      const file = path.join(outDir, `${voice}.wav`)
      fs.writeFileSync(file, buf)
      console.log(`${voice}: OK (${(buf.length / 1024).toFixed(0)} KB)`)
    } catch (e) {
      console.log(`${voice}: ERROR ${e.message}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
