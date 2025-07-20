import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json({ error: "No session ID provided" }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    })

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer", "subscription"],
    })

    if (session.payment_status === "paid") {
      return NextResponse.json({
        success: true,
        session: {
          id: session.id,
          customer_email: session.customer_details?.email,
          amount_total: session.amount_total,
          currency: session.currency,
          payment_status: session.payment_status,
          metadata: session.metadata,
          subscription_id: session.subscription,
          customer_id: session.customer,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Payment not completed",
        payment_status: session.payment_status,
      })
    }
  } catch (error: any) {
    console.error("Session verification error:", error)
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 })
  }
}
