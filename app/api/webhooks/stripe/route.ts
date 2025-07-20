import { type NextRequest, NextResponse } from "next/server"

import Stripe from "stripe"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    })

    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Received webhook event:", event.type)

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        console.log("Checkout session completed:", session.id)

        // Extract metadata
        const { userId, planType, credits, userEmail } = session.metadata || {}

        if (userId && planType) {
          // Here you would update your database
          // For now, we'll just log the information
          console.log("User upgrade:", {
            userId,
            planType,
            credits,
            userEmail,
            customerId: session.customer,
            subscriptionId: session.subscription,
            amountTotal: session.amount_total,
          })

          // TODO: Update user in database
          // await updateUserSubscription(userId, planType, credits, session.customer)
        }
        break

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription
        console.log("Subscription created:", subscription.id)
        // TODO: Handle subscription creation
        break

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription
        console.log("Subscription updated:", updatedSubscription.id)
        // TODO: Handle subscription updates
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log("Subscription deleted:", deletedSubscription.id)
        // TODO: Handle subscription cancellation
        break

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice
        console.log("Invoice payment succeeded:", invoice.id)
        // TODO: Handle successful payment
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log("Invoice payment failed:", failedInvoice.id)
        // TODO: Handle failed payment
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
