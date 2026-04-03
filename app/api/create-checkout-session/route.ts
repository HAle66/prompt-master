import { NextResponse } from 'next/server'

function getStripe() {
  const Stripe = require('stripe')
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 503 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const priceId = body.priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID

    if (!priceId) {
      return NextResponse.json(
        { error: 'No price ID configured. Please set NEXT_PUBLIC_STRIPE_PRICE_ID.' },
        { status: 503 }
      )
    }

    const stripe = getStripe()

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-prompts-hale.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-prompts-hale.vercel.app'}?canceled=true`,
      metadata: {
        plan: 'premium',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
