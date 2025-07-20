import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    console.log("Verifying session:", sessionId)

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    })

    console.log("Session retrieved:", session)

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 })
    }

    // Extract metadata
    const { userId, planType, credits, userEmail } = session.metadata || {}

    if (!userId || !planType) {
      return NextResponse.json({ error: "Invalid session metadata" }, { status: 400 })
    }

    // Get line items for purchase details
    const lineItems = session.line_items?.data || []
    const purchaseDetails = lineItems.map((item) => ({
      description: item.description,
      amount: item.amount_total,
      currency: session.currency,
      quantity: item.quantity,
    }))

    console.log("Payment verified successfully for user:", userId)

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        payment_status: session.payment_status,
        metadata: session.metadata,
        line_items: purchaseDetails,
      },
      user: {
        id: userId,
        email: userEmail,
        planType,
        credits,
      },
    })
  } catch (error: any) {
    console.error("Session verification error:", error)

    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json({ error: "Invalid session ID" }, { status: 400 })
    }

    return NextResponse.json(
      {
        error: "Failed to verify session",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
