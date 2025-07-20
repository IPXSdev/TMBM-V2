"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface BillingPortalButtonProps {
  className?: string
}

export function BillingPortalButton({ className }: BillingPortalButtonProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [customerId, setCustomerId] = useState<string | null>(null)

  useEffect(() => {
    const getCustomerId = async () => {
      if (!user?.email) return

      try {
        const response = await fetch(`/api/get-customer?email=${encodeURIComponent(user.email)}`)
        const data = await response.json()

        if (data.customer) {
          setCustomerId(data.customer.id)
        }
      } catch (error) {
        console.error("Error getting customer:", error)
      }
    }

    getCustomerId()
  }, [user?.email])

  const handlePortalAccess = async () => {
    if (!user || !customerId) {
      alert("Unable to access billing portal. Please contact support.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || "No portal URL received")
      }
    } catch (error) {
      console.error("Error accessing billing portal:", error)
      alert("Unable to access billing portal. Please try again or contact support.")
    } finally {
      setIsLoading(false)
    }
  }

  // Only show button if user has made a purchase (has a customer ID)
  if (!customerId) {
    return null
  }

  return (
    <Button onClick={handlePortalAccess} disabled={isLoading} variant="outline" className={className}>
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          Manage Billing
        </>
      )}
    </Button>
  )
}
