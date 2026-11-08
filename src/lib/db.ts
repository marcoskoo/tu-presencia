import { PrismaClient } from '@prisma/client'
import { SEED_REFLECTIONS } from '@/lib/reflections-data'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  dbReady: Promise<void> | undefined
}

/**
 * En serverless (Vercel) el sistema de archivos es efímero: usamos /tmp
 * para una base SQLite que se inicializa bajo demanda en cada arranque
 * de la instancia. En desarrollo local se usa la base del proyecto.
 */
function resolveDatabaseUrl(): string {
  if (process.env.VERCEL) return 'file:/tmp/presencia.sqlite'
  return process.env.DATABASE_URL ?? 'file:./db/custom.db'
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/**
 * Garantiza que existan las tablas (y datos iniciales) antes de consultar.
 * Idempotente: en local no cambia nada; en serverless crea el esquema en /tmp.
 */
export function ensureDb(): Promise<void> {
  if (!globalForPrisma.dbReady) {
    globalForPrisma.dbReady = (async () => {
      await db.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS "Reflection" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT NOT NULL DEFAULT 'Anónimo',
          "text" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`
      )
      await db.$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS "Subscriber" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "email" TEXT NOT NULL,
          "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`
      )
      await db.$executeRawUnsafe(
        `CREATE UNIQUE INDEX IF NOT EXISTS "Subscriber_email_key" ON "Subscriber"("email")`
      )
      if ((await db.reflection.count()) === 0) {
        await db.reflection.createMany({
          data: SEED_REFLECTIONS.map((r) => ({ name: r.name, text: r.text })),
        })
      }
    })().catch((error) => {
      // Permite reintentar en la siguiente petición si falló el arranque
      globalForPrisma.dbReady = undefined
      throw error
    })
  }
  return globalForPrisma.dbReady
}
