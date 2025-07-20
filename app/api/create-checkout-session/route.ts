import { type NextRequest, NextResponse } from "next/server"

import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    // Initialize Stripe inside the handler to avoid build-time env var errors
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    })
    const body = await request.json()
    const { priceId, planName, userId, userEmail } = body

    console.log("Checkout session request:", { priceId, planName, userId, userEmail })

    // Validate required fields
    if (!priceId || !planName || !userId || !userEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate price exists in Stripe
    try {
      await stripe.prices.retrieve(priceId)
      console.log("Price validated successfully:", priceId)
    } catch (error) {
      console.error("Invalid price ID:", priceId, error)
      return NextResponse.json({ error: "Invalid price ID" }, { status: 400 })
    }

    // Get domain with multiple fallback strategies
    let domain = ""

    // Strategy 1: Use NEXT_PUBLIC_DOMAIN if available
    if (process.env.NEXT_PUBLIC_DOMAIN) {
      domain = process.env.NEXT_PUBLIC_DOMAIN
      console.log("Using NEXT_PUBLIC_DOMAIN:", domain)
    } else {
      // Strategy 2: Construct from request headers
      const host = request.headers.get("host")
      const protocol = request.headers.get("x-forwarded-proto") || "https"

      if (host) {
        domain = `${protocol}://${host}`
        console.log("Constructed from headers:", { host, protocol, domain })
      } else {
        // Strategy 3: Use request URL as fallback
        const url = new URL(request.url)
        domain = `${url.protocol}//${url.host}`
        console.log("Using request URL:", domain)
      }
    }

    // Final validation and fallback
    if (!domain || domain === "https://null" || !domain.includes("://")) {
      // Last resort fallback for development
      domain = "http://localhost:3000"
      console.warn("Using localhost fallback:", domain)
    }

    console.log("Final domain:", domain)

    const successUrl = `${domain}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${domain}/pricing`

    console.log("Checkout URLs:", { successUrl, cancelUrl })

    // Determine if this is a subscription or one-time payment
    const price = await stripe.prices.retrieve(priceId)
    const mode = price.type === "recurring" ? "subscription" : "payment"

    console.log("Checkout mode:", mode, "Price type:", price.type)

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: userEmail,
      metadata: {
        userId,
        planName,
        priceId,
      },
      allow_promotion_codes: true,
    }

    // Add mode-specific metadata
    if (mode === "subscription") {
      sessionConfig.subscription_data = {
        metadata: {
          userId,
          planName,
        },
      }
    } else {
      sessionConfig.payment_intent_data = {
        metadata: {
          userId,
          planName,
        },
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log("Checkout session created successfully:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Checkout session creation error:", error)
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
