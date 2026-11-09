import { NextResponse } from 'next/server'

/**
 * Crea una sesión de Checkout para Presencia+ (4,99 US$/mes).
 * Si no hay STRIPE_SECRET_KEY configurada, responde en modo demo
 * para que la interfaz ofrezca la activación de prueba.
 */

const PRICE_CENTS = 499
const CURRENCY = 'usd'

export async function POST() {
  const key = process.env.STRIPE_SECRET_KEY

  if (!key) {
    return NextResponse.json({ demo: true })
  }

  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(key)

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const lineItem = process.env.STRIPE_PRICE_ID
      ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
      : {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: PRICE_CENTS,
            recurring: { interval: 'month' },
            product_data: {
              name: 'Presencia+',
              description:
                'Retiros extendidos, temporizador de 90 minutos y nuevas meditaciones cada mes. Apoya un espacio sin anuncios.',
            },
          },
        }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [lineItem],
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#premium`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('stripe checkout error', error)
    return NextResponse.json(
      { error: 'checkout_failed' },
      { status: 500 }
    )
  }
}
