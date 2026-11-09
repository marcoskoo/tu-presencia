import { NextResponse } from 'next/server'
import { db, ensureDb } from '@/lib/db'
import { SEED_REFLECTIONS } from '@/lib/reflections-data'

export const dynamic = 'force-dynamic'

function fallbackReflections() {
  return SEED_REFLECTIONS.map((r, i) => ({
    id: `semilla-${i}`,
    name: r.name,
    text: r.text,
    createdAt: new Date().toISOString(),
  }))
}

export async function GET() {
  try {
    await ensureDb()
    const reflections = await db.reflection.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12,
    })
    return NextResponse.json({ reflections })
  } catch (error) {
    // Serverless efímero o BD no disponible: mostramos contenido inicial
    console.error('GET /api/reflections usando respaldo:', error)
    return NextResponse.json({ reflections: fallbackReflections() })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' && body.name.trim() ? body.name.trim().slice(0, 40) : 'Anónimo'
    const text = typeof body.text === 'string' ? body.text.trim() : ''

    if (!text) {
      return NextResponse.json(
        { error: 'La reflexión no puede estar vacía' },
        { status: 400 }
      )
    }
    if (text.length > 500) {
      return NextResponse.json(
        { error: 'La reflexión no puede superar los 500 caracteres' },
        { status: 400 }
      )
    }

    try {
      await ensureDb()
      const reflection = await db.reflection.create({ data: { name, text } })
      return NextResponse.json({ reflection }, { status: 201 })
    } catch (dbError) {
      // Persistencia efímera (serverless sin BD real): aceptamos igualmente
      console.error('POST /api/reflections persistencia efímera:', dbError)
      return NextResponse.json(
        {
          reflection: {
            id: `sesion-${Date.now()}`,
            name,
            text,
            createdAt: new Date().toISOString(),
          },
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error('Error al crear reflexión:', error)
    return NextResponse.json(
      { error: 'No se pudo guardar la reflexión' },
      { status: 500 }
    )
  }
}
