import { NextResponse } from 'next/server'

/**
 * Webhook de Stripe: eventos de suscripción de Presencia+.
 * Configurar con `stripe listen` o en el panel, apuntando a
 * /api/stripe/webhook, y guardar STRIPE_WEBHOOK_SECRET.
 *
 * Nota: el estado premium del cliente se verifica en /api/stripe/verify
 * tras el pago; este webhook queda como punto de extensión para
 * sincronizar suscripciones (emails, revocaciones, etc.).
 */
export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!key || !secret) {
    return NextResponse.json({ received: false, error: 'not_configured' }, { status: 400 })
  }

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(key)
    const signature = request.headers.get('stripe-signature')
    if (!signature) {
      return NextResponse.json({ received: false }, { status: 400 })
    }

    const payload = await request.text()
    const event = stripe.webhooks.constructEvent(payload, signature, secret)

    switch (event.type) {
      case 'checkout.session.completed':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'invoice.payment_failed':
        // Punto de extensión: sincronizar estado con una base de datos
        console.log(`[stripe] evento recibido: ${event.type}`)
        break
      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('stripe webhook error', error)
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
