import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  const subs = await db.subscriber.findMany()
  const refs = await db.reflection.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  console.log('Suscriptores:', subs.map((s) => s.email))
  console.log('Reflexiones:', refs.map((r) => `${r.name}: ${r.text.slice(0, 30)}…`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
