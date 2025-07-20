"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { AuthDialog } from "@/components/auth-dialog"
import { Loader2 } from "lucide-react"

interface StripeButtonProps {
  priceId: string
  planName: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function StripeButton({ priceId, planName, children, className, disabled }: StripeButtonProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [authDialog, setAuthDialog] = useState({ isOpen: false })
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    console.log("=== STRIPE BUTTON CLICKED ===")
    console.log("Price ID:", priceId)
    console.log("Plan Name:", planName)
    console.log("User:", user)

    // Clear any previous errors
    setError(null)

    // Check if user is authenticated
    if (!user) {
      console.log("User not authenticated, showing auth dialog")
      setAuthDialog({ isOpen: true })
      return
    }

    // Validate price ID
    if (!priceId || priceId.trim() === "") {
      console.error("Invalid price ID:", priceId)
      setError("Invalid pricing configuration. Please contact support.")
      return
    }

    setIsLoading(true)

    try {
      console.log("Creating checkout session...")

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId.trim(),
          userId: user.id,
          userEmail: user.email,
          planName: planName,
        }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Checkout session error:", errorData)
        throw new Error(errorData.details || errorData.error || "Failed to create checkout session")
      }

      const { url } = await response.json()
      console.log("Checkout URL:", url)

      if (url) {
        console.log("Redirecting to Stripe checkout...")
        // Use window.open instead of window.location to avoid blocking
        const newWindow = window.open(url, "_blank")
        if (!newWindow) {
          // If popup was blocked, fall back to same window
          window.location.href = url
        }
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error: any) {
      console.error("Stripe button error:", error)
      setError(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleCheckout} disabled={isLoading || disabled || !priceId} className={className}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          children
        )}
      </Button>

      {error && (
        <div className="mt-2 text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded p-2">{error}</div>
      )}

      <AuthDialog isOpen={authDialog.isOpen} onClose={() => setAuthDialog({ isOpen: false })} />
    </>
  )
}
