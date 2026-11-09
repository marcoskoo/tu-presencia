import { NextResponse } from 'next/server'

/**
 * Verifica que una sesión de Checkout esté pagada.
 * El cliente marca el estado premium tras la confirmación.
 */
export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ paid: false, error: 'not_configured' }, { status: 400 })
  }

  try {
    const { sessionId } = (await request.json()) as { sessionId?: string }
    if (!sessionId) {
      return NextResponse.json({ paid: false, error: 'missing_session' }, { status: 400 })
    }

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(key)

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const paid =
      session.payment_status === 'paid' || session.payment_status === 'no_payment_required'

    return NextResponse.json({ paid })
  } catch (error) {
    console.error('stripe verify error', error)
    return NextResponse.json({ paid: false, error: 'verify_failed' }, { status: 500 })
  }
}
