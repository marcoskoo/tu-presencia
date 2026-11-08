import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Limpia artefactos de las pruebas automatizadas
  await db.reflection.deleteMany({ where: { name: 'Sofía' } })
  await db.subscriber.deleteMany({
    where: { email: 'prueba.presencia@example.com' },
  })
  const refs = await db.reflection.count()
  const subs = await db.subscriber.count()
  console.log(`Estado final -> reflexiones: ${refs}, suscriptores: ${subs}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
