import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY

    if (!secretKey) {
      console.error('Missing STRIPE_SECRET_KEY env var')
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 503 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const priceId = body.priceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID

    if (!priceId) {
      console.error('Missing price ID. NEXT_PUBLIC_STRIPE_PRICE_ID:', process.env.NEXT_PUBLIC_STRIPE_PRICE_ID)
      return NextResponse.json(
        { error: 'No price ID configured.' },
        { status: 503 }
      )
    }

    console.log('Creating checkout session with priceId:', priceId)

    const stripe = new Stripe(secretKey, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })

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

    console.log('Checkout session created:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Stripe error:', error.message, error.stack)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
