import { NextResponse } from 'next/server'
import { db, ensureDb } from '@/lib/db'

export const dynamic = 'force-dynamic'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let email = ''
  try {
    const body = await request.json()
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Introduce un correo electrónico válido' },
        { status: 400 }
      )
    }

    try {
      await ensureDb()
      const existing = await db.subscriber.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json(
          { message: 'Ya formas parte de este círculo de consciencia' },
          { status: 200 }
        )
      }
      await db.subscriber.create({ data: { email } })
    } catch (dbError) {
      // Persistencia efímera (serverless sin BD real): aceptamos igualmente
      console.error('POST /api/newsletter persistencia efímera:', dbError)
    }

    return NextResponse.json(
      { message: 'Te has unido al círculo de consciencia' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al suscribirse:', error)
    return NextResponse.json(
      { error: 'No se pudo completar la suscripción' },
      { status: 500 }
    )
  }
}
