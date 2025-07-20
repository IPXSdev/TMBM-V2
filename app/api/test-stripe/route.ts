import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function GET() {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        error: "Stripe not configured",
        details: "STRIPE_SECRET_KEY environment variable is missing",
        environment_check: {
          stripe_secret_key: false,
          stripe_webhook_secret: false,
          next_public_domain: false,
          stripe_price_indie: false,
          stripe_price_pro: false,
          stripe_price_silver: false,
        },
      })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    })

    // Test basic Stripe connection by listing products (works with restricted keys)
    let connectionTest
    let keyType = "unknown"

    try {
      // Try to list products - this works with most key types
      const products = await stripe.products.list({ limit: 1 })
      connectionTest = {
        status: "connected",
        products_accessible: true,
      }

      // Determine key type from the key format
      const key = process.env.STRIPE_SECRET_KEY
      if (key.startsWith("sk_test_")) {
        keyType = "test"
      } else if (key.startsWith("sk_live_")) {
        keyType = "live"
      } else if (key.startsWith("rk_")) {
        keyType = "restricted"
      }
    } catch (error: any) {
      connectionTest = {
        status: "error",
        products_accessible: false,
        error: error.message,
      }
    }

    // Test each price ID
    const priceTests = {
      indie: await testPriceId(stripe, process.env.STRIPE_PRICE_INDIE),
      pro: await testPriceId(stripe, process.env.STRIPE_PRICE_PRO),
      silver: await testPriceId(stripe, process.env.STRIPE_PRICE_SILVER),
      gold: await testPriceId(stripe, process.env.STRIPE_PRICE_GOLD),
      platinum: await testPriceId(stripe, process.env.STRIPE_PRICE_PLATINUM),
    }

    // Environment variables check
    const environmentCheck = {
      stripe_secret_key: !!process.env.STRIPE_SECRET_KEY,
      stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
      next_public_domain: !!process.env.NEXT_PUBLIC_DOMAIN,
      stripe_price_indie: !!process.env.STRIPE_PRICE_INDIE,
      stripe_price_pro: !!process.env.STRIPE_PRICE_PRO,
      stripe_price_silver: !!process.env.STRIPE_PRICE_SILVER,
      stripe_price_gold: !!process.env.STRIPE_PRICE_GOLD,
      stripe_price_platinum: !!process.env.STRIPE_PRICE_PLATINUM,
    }

    return NextResponse.json({
      success: true,
      connection: {
        ...connectionTest,
        key_type: keyType,
      },
      prices: priceTests,
      environment_check: environmentCheck,
    })
  } catch (error: any) {
    console.error("Stripe test error:", error)

    let suggestion = ""
    if (error.message?.includes("does not have the required permissions")) {
      suggestion =
        "You're using a restricted API key. This is fine for checkout sessions, but some test features may be limited. Consider using a standard secret key for full functionality."
    } else if (error.message?.includes("Invalid API Key")) {
      suggestion = "Please check that your STRIPE_SECRET_KEY is correct and properly formatted."
    }

    return NextResponse.json({
      error: error.message || "Unknown Stripe error",
      details: error.type || "unknown_error",
      suggestion,
      environment_check: {
        stripe_secret_key: !!process.env.STRIPE_SECRET_KEY,
        stripe_webhook_secret: !!process.env.STRIPE_WEBHOOK_SECRET,
        next_public_domain: !!process.env.NEXT_PUBLIC_DOMAIN,
        stripe_price_indie: !!process.env.STRIPE_PRICE_INDIE,
        stripe_price_pro: !!process.env.STRIPE_PRICE_PRO,
        stripe_price_silver: !!process.env.STRIPE_PRICE_SILVER,
        stripe_price_gold: !!process.env.STRIPE_PRICE_GOLD,
        stripe_price_platinum: !!process.env.STRIPE_PRICE_PLATINUM,
      },
    })
  }
}

async function testPriceId(stripe: Stripe, priceId: string | undefined) {
  if (!priceId) {
    return {
      valid: false,
      error: "Price ID not configured",
    }
  }

  try {
    const price = await stripe.prices.retrieve(priceId)
    return {
      valid: true,
      amount: price.unit_amount ? price.unit_amount / 100 : 0,
      currency: price.currency,
      type: price.type,
      recurring: price.recurring ? `${price.recurring.interval}ly` : "one-time",
    }
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || "Failed to retrieve price",
    }
  }
}
