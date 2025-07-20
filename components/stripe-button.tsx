"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface StripeButtonProps {
  priceId: string
  planName: string
  className?: string
  children: React.ReactNode
  onAuthRequired?: () => void
}

export function StripeButton({ priceId, planName, className, children, onAuthRequired }: StripeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { user } = useAuth()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("StripeButton clicked:", { user, priceId, planName })

    if (!user) {
      console.log("No user found, triggering auth required")
      if (onAuthRequired) {
        onAuthRequired()
      }
      return
    }

    if (!priceId) {
      console.error("No price ID provided")
      setError("Price ID not configured for this plan")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("Creating checkout session for:", { priceId, planName, userId: user.id })

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
          userId: user.id,
          userEmail: user.email,
        }),
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.url) {
        console.log("Redirecting to checkout:", data.url)
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (err: any) {
      console.error("Stripe checkout error:", err)
      setError(err.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={isLoading || !priceId} className={className}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
