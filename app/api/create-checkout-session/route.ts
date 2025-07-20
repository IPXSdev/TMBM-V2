import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  console.log("=== STRIPE CHECKOUT SESSION API CALLED ===")

  try {
    // Parse the request body
    const body = await request.json()
    console.log("Request body:", body)

    const { priceId, userId, userEmail, planName } = body

    // Validate required fields
    if (!priceId) {
      console.error("Missing priceId")
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    if (!userId) {
      console.error("Missing userId")
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!userEmail) {
      console.error("Missing userEmail")
      return NextResponse.json({ error: "User email is required" }, { status: 400 })
    }

    console.log("Creating checkout session for:", { priceId, userId, userEmail, planName })

    // Get the current URL origin for success/cancel URLs
    const origin = request.headers.get("origin") || "http://localhost:3000"
    console.log("Using origin:", origin)

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: planName === "Indie" || planName === "Pro" ? "subscription" : "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        userId,
        userEmail,
        planName: planName || "",
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    console.log("Checkout session created:", {
      id: session.id,
      url: session.url,
      mode: session.mode,
    })

    // Return the session URL
    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })
  } catch (error: any) {
    console.error("=== STRIPE SESSION ERROR ===")
    console.error("Error type:", error.type)
    console.error("Error message:", error.message)
    console.error("Error code:", error.code)

    // Handle specific Stripe errors
    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: error.message,
        },
        { status: 400 },
      )
    }

    if (error.code === "resource_missing") {
      return NextResponse.json(
        {
          error: "Price not found",
          details: "The selected price is not available",
        },
        { status: 404 },
      )
    }

    // Generic error
    return NextResponse.json(
      {
        error: "Failed to create checkout session",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
