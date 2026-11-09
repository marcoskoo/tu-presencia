/**
 * Spot-check ASR de un segmento de producción: node asr-spot.js <wav> "<referencia>"
 */
const ZAI = require('z-ai-web-dev-sdk').default
const fs = require('fs')

const file = process.argv[2]
const reference = process.argv[3]
if (!file || !reference) {
  console.error('uso: node asr-spot.js <wav> "<referencia>"')
  process.exit(1)
}

function similarity(a, b) {
  const wa = a.toLowerCase().split(/\s+/).filter(Boolean)
  const wb = new Set(b.toLowerCase().split(/\s+/).filter(Boolean))
  let hit = 0
  for (const w of wa) if (wb.has(w)) hit++
  return hit / Math.max(wa.length, 1)
}

async function main() {
  const zai = await ZAI.create()
  for (let i = 0; i < 4; i++) {
    try {
      const res = await zai.audio.asr.create({ file_base64: fs.readFileSync(file).toString('base64') })
      const text = (res.text ?? '').trim().replace(/\s+/g, ' ')
      console.log(`similitud: ${(similarity(reference, text) * 100).toFixed(0)}%`)
      console.log(`ASR: ${text}`)
      return
    } catch (e) {
      if (e.message?.includes('429') && i < 3) {
        console.log('429, espera 45s…')
        await new Promise((r) => setTimeout(r, 45000))
        continue
      }
      throw e
    }
  }
}

main().catch((e) => {
  console.error('FALLO:', e.message)
  process.exit(1)
})
