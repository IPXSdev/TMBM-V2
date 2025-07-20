"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle, ArrowLeft, CreditCard, Home } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-red-900/10 via-gray-900/10 to-black">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400">Payment Canceled</h1>
              <p className="text-xl text-gray-300">No worries! Your payment was canceled and no charges were made.</p>
            </div>

            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>What Happened?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <p className="text-gray-300">
                  Your payment was canceled before completion. This could happen for several reasons:
                </p>
                <ul className="space-y-2 text-gray-400 ml-4">
                  <li>• You clicked the back button or closed the payment window</li>
                  <li>• You decided to review your purchase decision</li>
                  <li>• There was a technical issue with the payment process</li>
                </ul>
                <p className="text-gray-300">
                  Don't worry - no charges were made to your account. You can try again anytime!
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button
                onClick={() => (window.location.href = "/pricing")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Pricing
              </Button>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 text-lg py-6"
              >
                Go to Dashboard
              </Button>

              <Button
                onClick={() => (window.location.href = "/")}
                variant="ghost"
                className="w-full text-gray-400 hover:text-white text-lg py-6"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                💡 <strong>Need help?</strong> If you experienced any issues during checkout, please contact our support
                team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
