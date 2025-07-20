"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Music, Star, Crown, Diamond, Trophy, Zap } from "lucide-react"
import { StripeButton } from "@/components/stripe-button"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"

export default function PricingPage() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()

  const handleAuthRequired = () => {
    console.log("Auth required, showing dialog")
    setShowAuthDialog(true)
  }

  const handleAuthSuccess = () => {
    console.log("Auth successful, closing dialog")
    setShowAuthDialog(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get your music heard by industry professionals and Grammy-nominated producers
          </p>
        </div>

        {/* Monthly Subscriptions */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Monthly Subscriptions</h2>
            <p className="text-gray-400">Ongoing access with monthly track submissions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Creator Plan */}
            <Card className="bg-gray-900 border-gray-800 relative">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Creator</h3>
                  <p className="text-gray-400 mb-4">Perfect for getting started</p>
                  <div className="text-4xl font-bold text-white">Free</div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Access select podcast clips
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Behind-the-scenes sneak peeks
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Artist placement news & announcements
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Community access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Basic industry insights
                  </li>
                </ul>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get Started Free →</Button>
              </CardContent>
            </Card>

            {/* Indie Plan */}
            <Card className="bg-gray-900 border-purple-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                Most Popular
              </Badge>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Indie</h3>
                  <p className="text-gray-400 mb-4">For serious independent artists</p>
                  <div className="text-4xl font-bold text-white">
                    $19.99<span className="text-lg text-gray-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Everything in Creator
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Submit 3 tracks per month
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Professional feedback from industry pros
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Priority review queue
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Monthly sync opportunities newsletter
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Access to exclusive artist showcases
                  </li>
                </ul>

                <StripeButton
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE || ""}
                  planName="Indie Plan"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onAuthRequired={handleAuthRequired}
                >
                  Start Indie Plan →
                </StripeButton>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gray-900 border-gray-800 relative">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                  <p className="text-gray-400 mb-4">Maximum exposure and opportunities</p>
                  <div className="text-4xl font-bold text-white">
                    $24.99<span className="text-lg text-gray-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Everything in Indie
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Submit 5 tracks per month
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Direct A&R contact for top tracks
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Exclusive sync opportunities
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Monthly industry insights call
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Priority placement consideration
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Advanced analytics dashboard
                  </li>
                </ul>

                <StripeButton
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || ""}
                  planName="Pro Plan"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  onAuthRequired={handleAuthRequired}
                >
                  Go Pro →
                </StripeButton>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Credit Packs */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Credit Packs</h2>
            <p className="text-gray-400">One-time purchases for track submissions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Silver Pack */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Diamond className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Silver Pack</h3>
                  <p className="text-gray-400 mb-4">Perfect for trying us out</p>
                  <div className="text-4xl font-bold text-white mb-2">$4.99</div>
                  <p className="text-gray-400">1 submission credit</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />1 track submission credit
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Professional industry feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Sync placement consideration
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Detailed review report
                  </li>
                </ul>

                <StripeButton
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_SILVER || ""}
                  planName="Silver Pack"
                  className="w-full border border-gray-600 text-white hover:bg-gray-800"
                  onAuthRequired={handleAuthRequired}
                >
                  Buy Silver Pack →
                </StripeButton>
              </CardContent>
            </Card>

            {/* Gold Pack */}
            <Card className="bg-gray-900 border-yellow-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                Best Value
              </Badge>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Gold Pack</h3>
                  <p className="text-gray-400 mb-4">Great value for multiple submissions</p>
                  <div className="text-4xl font-bold text-white mb-2">$19.99</div>
                  <p className="text-gray-400">2 submission credits</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />2 track submission credits
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Professional industry feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Priority sync placement consideration
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Detailed review reports
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Bonus: Extra feedback detail
                  </li>
                </ul>

                <StripeButton
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_GOLD || ""}
                  planName="Gold Pack"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  onAuthRequired={handleAuthRequired}
                >
                  Buy Gold Pack →
                </StripeButton>
              </CardContent>
            </Card>

            {/* Platinum Pack */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Platinum Pack</h3>
                  <p className="text-gray-400 mb-4">Maximum value and exposure</p>
                  <div className="text-4xl font-bold text-white mb-2">$34.99</div>
                  <p className="text-gray-400">4 submission credits</p>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />4 track submission credits
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Professional industry feedback
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    VIP sync placement consideration
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Direct A&R contact for standout tracks
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Detailed review reports
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    Bonus: Industry networking opportunities
                  </li>
                </ul>

                <StripeButton
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PLATINUM || ""}
                  planName="Platinum Pack"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onAuthRequired={handleAuthRequired}
                >
                  Buy Platinum Pack →
                </StripeButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onSuccess={handleAuthSuccess} />
    </div>
  )
}
