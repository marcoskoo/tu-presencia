/**
 * Genera el arte base para la imagen OG (1216×640, múltiplos de 32)
 * usando z-ai-web-dev-sdk (solo backend). La composición tipográfica
 * se hace después con PIL en compose-og.py.
 *
 * Uso: bun scripts/og-generate.ts
 */
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'

const PROMPT = [
  'Minimalist serene landscape at dawn',
  'soft mist over a calm lake',
  'distant gentle mountains',
  'pale golden sun as a soft brush circle like an ensō',
  'warm cream and sage green palette with muted terracotta accents',
  'flat matte texture',
  'large areas of soft empty sky in the upper half for text',
  'contemplative meditation aesthetic',
  'no text, no people',
  'high quality, detailed',
].join(', ')

async function main() {
  const zai = await ZAI.create()
  const response = await zai.images.generations.create({
    prompt: PROMPT,
    size: '1216x640',
  })
  const base64 = response.data[0]?.base64
  if (!base64) throw new Error('respuesta sin imagen')
  const buffer = Buffer.from(base64, 'base64')
  fs.writeFileSync('scripts/og-art.png', buffer)
  console.log(`OK scripts/og-art.png (${(buffer.length / 1024).toFixed(0)} KB)`)
}

main().catch((err) => {
  console.error('FALLO:', err.message)
  process.exit(1)
})
