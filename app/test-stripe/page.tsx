"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, CreditCard, AlertTriangle, Info } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function TestStripePage() {
  const [testResults, setTestResults] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  const [envStatus, setEnvStatus] = useState<any>({})

  useEffect(() => {
    // Check environment variables on component mount
    testStripeConnection()
  }, [])

  const testStripeConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-stripe")
      const data = await response.json()
      setTestResults(data)
      setEnvStatus(data.environment_check || {})
    } catch (error) {
      setTestResults({ error: "Failed to test Stripe connection" })
    } finally {
      setIsLoading(false)
    }
  }

  const testCheckoutSession = async (planType: string) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          price: planType === "Indie" ? 19.99 : planType === "Pro" ? 24.99 : 4.99,
          credits: planType === "Indie" ? 1 : planType === "Pro" ? 2 : 1,
          userId: "test-user-123",
          userEmail: "test@example.com",
        }),
      })

      const data = await response.json()
      if (data.url) {
        window.open(data.url, "_blank")
      } else {
        alert(`Error: ${data.error}\n\nDetails: ${data.details || "No additional details"}`)
      }
    } catch (error) {
      alert("Failed to create checkout session")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stripe Integration Test
            </h1>
            <p className="text-gray-300">Test your Stripe integration to make sure everything is working correctly</p>
          </div>

          {/* Environment Variables Check */}
          <Card className="bg-gray-900/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Environment Variables Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(envStatus).length > 0 ? (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span>STRIPE_SECRET_KEY:</span>
                    <Badge variant={envStatus.stripe_secret_key ? "default" : "destructive"}>
                      {envStatus.stripe_secret_key ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>STRIPE_WEBHOOK_SECRET:</span>
                    <Badge variant={envStatus.stripe_webhook_secret ? "default" : "destructive"}>
                      {envStatus.stripe_webhook_secret ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>NEXT_PUBLIC_DOMAIN:</span>
                    <Badge variant={envStatus.next_public_domain ? "default" : "destructive"}>
                      {envStatus.next_public_domain ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>STRIPE_PRICE_INDIE:</span>
                    <Badge variant={envStatus.stripe_price_indie ? "default" : "destructive"}>
                      {envStatus.stripe_price_indie ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>STRIPE_PRICE_PRO:</span>
                    <Badge variant={envStatus.stripe_price_pro ? "default" : "destructive"}>
                      {envStatus.stripe_price_pro ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>STRIPE_PRICE_SILVER:</span>
                    <Badge variant={envStatus.stripe_price_silver ? "default" : "destructive"}>
                      {envStatus.stripe_price_silver ? "✅ Set" : "❌ Missing"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Click "Test Stripe Connection" to check environment variables</p>
              )}
            </CardContent>
          </Card>

          {/* Connection Test */}
          <Card className="bg-gray-900/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Stripe Connection Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testStripeConnection} disabled={isLoading} className="mb-4">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Stripe Connection"
                )}
              </Button>

              {testResults.success && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400">Stripe connection successful!</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <p>Connection Status: {testResults.connection?.status}</p>
                    <p>Key Type: {testResults.connection?.key_type}</p>
                    <p>Products Accessible: {testResults.connection?.products_accessible ? "✅" : "❌"}</p>
                  </div>

                  {testResults.prices && (
                    <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
                      <h4 className="text-green-400 font-semibold mb-2">Price Validation Results:</h4>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        {Object.entries(testResults.prices).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="capitalize">{key}:</span>
                            <div className="flex items-center space-x-2">
                              <span className={value.valid ? "text-green-400" : "text-red-400"}>
                                {value.valid ? "✅" : "❌"}
                              </span>
                              {value.valid && (
                                <span className="text-gray-400">
                                  ${value.amount} {value.currency?.toUpperCase()} ({value.recurring})
                                </span>
                              )}
                              {!value.valid && <span className="text-red-400 text-xs">{value.error}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {testResults.error && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">{testResults.error}</span>
                  </div>
                  {testResults.suggestion && (
                    <div className="text-sm text-yellow-400 bg-yellow-900/20 p-3 rounded flex items-start space-x-2">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{testResults.suggestion}</span>
                    </div>
                  )}
                  {testResults.details && (
                    <div className="text-sm text-gray-400 bg-red-900/20 p-3 rounded">
                      <strong>Details:</strong> {testResults.details}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Price IDs Test */}
          <Card className="bg-gray-900/50 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Checkout Session Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-white">Indie Plan</h3>
                  <p className="text-sm text-gray-400">$19.99/month</p>
                  <Button
                    size="sm"
                    onClick={() => testCheckoutSession("Indie")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!envStatus.stripe_price_indie}
                  >
                    Test Indie Checkout
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-white">Pro Plan</h3>
                  <p className="text-sm text-gray-400">$24.99/month</p>
                  <Button
                    size="sm"
                    onClick={() => testCheckoutSession("Pro")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={!envStatus.stripe_price_pro}
                  >
                    Test Pro Checkout
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-white">Silver Pack</h3>
                  <p className="text-sm text-gray-400">$4.99 one-time</p>
                  <Button
                    size="sm"
                    onClick={() => testCheckoutSession("silver-pack")}
                    className="w-full bg-gray-600 hover:bg-gray-700"
                    disabled={!envStatus.stripe_price_silver}
                  >
                    Test Silver Checkout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Webhook Status */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Webhook Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Webhook Endpoint:</span>
                  <Badge variant="outline" className="text-xs">
                    /api/webhooks/stripe
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Webhook Secret:</span>
                  <Badge variant={envStatus.stripe_webhook_secret ? "default" : "destructive"}>
                    {envStatus.stripe_webhook_secret ? "✅ Configured" : "❌ Missing"}
                  </Badge>
                </div>
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 <strong>To test webhooks:</strong> Go to your Stripe Dashboard → Webhooks → Your webhook → "Send
                    test webhook" and select "checkout.session.completed"
                  </p>
                </div>
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-sm">
                    ⚠️ <strong>Note:</strong> Automatic tax calculation has been disabled to avoid origin address
                    requirements. You can enable it later in your Stripe dashboard settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
