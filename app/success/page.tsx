"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Home, CreditCard, Mail, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"

interface SessionData {
  id: string
  amount_total: number
  currency: string
  payment_status: string
  customer_email: string
  metadata: {
    userId: string
    planType: string
    credits: string
    price: string
  }
  created: number
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setError("No session ID found")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        const data = await response.json()

        if (data.success) {
          setSessionData(data.session)

          // Update user credits/plan based on purchase
          if (user && data.session.metadata) {
            const { planType, credits } = data.session.metadata
            const creditsNum = Number.parseInt(credits)

            if (planType === "Indie" || planType === "Pro") {
              // For subscriptions, set the plan and monthly credits
              updateUser({
                plan: planType,
                credits: creditsNum,
              })

              // Update localStorage
              localStorage.setItem("userPlan", planType)
              localStorage.setItem("userCredits", credits)
            } else {
              // For one-time packs, add to existing credits
              const newCredits = user.credits + creditsNum
              updateUser({ credits: newCredits })
              localStorage.setItem("userCredits", newCredits.toString())
            }
          }
        } else {
          setError(data.error || "Payment verification failed")
        }
      } catch (error) {
        console.error("Error verifying session:", error)
        setError("Failed to verify payment")
      } finally {
        setIsLoading(false)
      }
    }

    verifySession()
  }, [sessionId, user, updateUser])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPlanDisplayName = (planType: string) => {
    switch (planType) {
      case "Creator":
        return "🆓 Creator Plan"
      case "Indie":
        return "⭐️ Indie Plan"
      case "Pro":
        return "🔥 Pro Plan"
      case "silver-pack":
        return "Silver Pack"
      case "gold-pack":
        return "Gold Pack"
      case "platinum-pack":
        return "Platinum Pack"
      default:
        return planType
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Verifying your purchase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-red-900/10 via-gray-900/10 to-black">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-red-400">Payment Verification Failed</h1>
              <p className="text-xl text-gray-300 mb-8">{error}</p>
              <div className="space-y-4">
                <Button
                  onClick={() => (window.location.href = "/pricing")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-black">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Payment Successful!
              </h1>
              <p className="text-xl text-gray-300">Thank you for your purchase. Your account has been updated.</p>
            </div>

            {sessionData && (
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Purchase Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Plan/Pack:</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {getPlanDisplayName(sessionData.metadata?.planType || "Unknown")}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Amount Paid:</span>
                    <span className="text-white font-semibold">
                      ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Credits Added:</span>
                    <span className="text-green-400 font-semibold">+{sessionData.metadata?.credits || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Purchase Date:</span>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(sessionData.created)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Transaction ID:</span>
                    <span className="text-gray-300 text-sm font-mono">{sessionData.id.slice(-12)}</span>
                  </div>
                  {sessionData.customer_email && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Email:</span>
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{sessionData.customer_email}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                onClick={() => (window.location.href = "/")}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 text-lg py-6"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                📧 A confirmation email has been sent to your registered email address with your receipt and next steps.
              </p>
            </div>

            {/* Next Steps */}
            <div className="mt-8 p-6 bg-gray-900/30 border border-gray-700 rounded-lg text-left">
              <h3 className="text-lg font-semibold text-white mb-4">🎵 What's Next?</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Your credits have been added to your account</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>You can now submit tracks for professional review</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Access exclusive behind-the-scenes content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Get detailed feedback from industry professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
