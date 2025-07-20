import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

    // Search for customer by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (customers.data.length === 0) {
      return NextResponse.json({ customer: null })
    }

    const customer = customers.data[0]

    // Get active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 10,
    })

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        created: customer.created,
        subscriptions: subscriptions.data.map((sub) => ({
          id: sub.id,
          status: sub.status,
          current_period_start: sub.current_period_start,
          current_period_end: sub.current_period_end,
          cancel_at_period_end: sub.cancel_at_period_end,
          metadata: sub.metadata,
        })),
      },
    })
  } catch (error) {
    console.error("Error getting customer:", error)
    return NextResponse.json({ error: "Failed to get customer", details: error.message }, { status: 500 })
  }
}
