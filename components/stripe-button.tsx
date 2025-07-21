"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

interface StripeButtonProps {
  priceId: string
  planName: string
  className?: string
  children: React.ReactNode
  onAuthRequired?: () => void
}

export function StripeButton({ priceId, planName, className, children, onAuthRequired }: StripeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const handleClick = async () => {
    if (!user) {
      onAuthRequired?.()
      return
    }

    if (!priceId) {
      console.error("No price ID provided")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planName,
          userId: user.id,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isLoading || !priceId} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
