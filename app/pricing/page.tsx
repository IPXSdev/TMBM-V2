"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StripeButton } from "@/components/stripe-button"
import { Check, Star, Crown, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function PricingPage() {
  const { user } = useAuth()

  const plans = [
    {
      name: "Creator",
      price: "Free",
      period: "",
      description: "Perfect for getting started",
      priceId: "", // No price ID for free plan
      features: [
        "Access select podcast clips",
        "Behind-the-scenes sneak peeks",
        "Artist placement news & announcements",
        "Community access",
        "Basic industry insights",
      ],
      popular: false,
      color: "from-blue-500 to-cyan-500",
      isFree: true,
    },
    {
      name: "Indie",
      price: "$19.99",
      period: "/month",
      description: "For serious independent artists",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE || "",
      features: [
        "Everything in Creator",
        "Submit 1 track per month",
        "Professional feedback from industry pros",
        "Priority review queue",
        "Monthly sync opportunities newsletter",
        "Access to exclusive artist showcases",
      ],
      popular: true,
      color: "from-purple-500 to-pink-500",
      isFree: false,
    },
    {
      name: "Pro",
      price: "$24.99",
      period: "/month",
      description: "Maximum exposure and opportunities",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "",
      features: [
        "Everything in Indie",
        "Submit 2 tracks per month",
        "Direct A&R contact for top tracks",
        "Exclusive sync opportunities",
        "Monthly industry insights call",
        "Priority placement consideration",
        "Advanced analytics dashboard",
      ],
      popular: false,
      color: "from-yellow-500 to-orange-500",
      isFree: false,
    },
  ]

  const creditPacks = [
    {
      name: "Silver Pack",
      credits: 1,
      price: "$4.99",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SILVER || "",
      description: "Perfect for trying us out",
      color: "from-gray-400 to-gray-600",
      features: [
        "1 track submission credit",
        "Credits never expire",
        "Use anytime in your dashboard",
        "Same professional review process",
      ],
    },
    {
      name: "Gold Pack",
      credits: 2,
      price: "$19.99",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GOLD || "",
      description: "Great value for multiple submissions",
      color: "from-yellow-400 to-yellow-600",
      popular: true,
      features: [
        "2 track submission credits",
        "Credits never expire",
        "Use anytime in your dashboard",
        "Same professional review process",
        "Best value per submission",
      ],
    },
    {
      name: "Platinum Pack",
      credits: 4,
      price: "$34.99",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PLATINUM || "",
      description: "Maximum value for serious artists",
      color: "from-purple-400 to-purple-600",
      features: [
        "4 track submission credits",
        "Credits never expire",
        "Use anytime in your dashboard",
        "Same professional review process",
        "Maximum savings per submission",
        "Perfect for album projects",
      ],
    },
  ]

  // Check if user is on current plan
  const isCurrentPlan = (planName: string) => {
    return user?.plan === planName
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Star className="w-4 h-4 mr-2" />
              Choose Your Plan
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Get Your Music Heard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan to connect with Grammy-nominated producers and industry professionals.
            </p>
            {user && (
              <div className="mt-6">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Current Plan: {user.plan} • {user.credits} Credits
                </Badge>
              </div>
            )}
          </div>

          {/* Monthly Plans */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Monthly Subscriptions</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                  } ${isCurrentPlan(plan.name) ? "ring-2 ring-green-500" : ""}`}
                >
                  {plan.popular && !isCurrentPlan(plan.name) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1">
                        <Crown className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {isCurrentPlan(plan.name) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-1">
                        <Check className="w-3 h-3 mr-1" />
                        Your Current Plan
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                    >
                      {plan.name === "Creator" && <Zap className="w-8 h-8 text-white" />}
                      {plan.name === "Indie" && <Star className="w-8 h-8 text-white" />}
                      {plan.name === "Pro" && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isCurrentPlan(plan.name) ? (
                      <Button disabled className="w-full bg-green-600/50 text-green-200 cursor-not-allowed">
                        <Check className="w-4 h-4 mr-2" />
                        Current Plan
                      </Button>
                    ) : plan.isFree ? (
                      <Button
                        onClick={() => (window.location.href = "/signup")}
                        className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-3 text-lg`}
                      >
                        Get Started Free
                      </Button>
                    ) : (
                      <StripeButton
                        priceId={plan.priceId}
                        planName={plan.name}
                        className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white font-semibold py-3 text-lg`}
                      >
                        {plan.name === "Indie" ? "Start Indie Plan" : "Go Pro"}
                      </StripeButton>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Credit Packs */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">One-Time Credit Packs</h2>
              <p className="text-gray-400">
                Purchase submission credits that never expire. Use them anytime in your dashboard.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {creditPacks.map((pack) => (
                <Card
                  key={pack.name}
                  className={`bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                    pack.popular ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 px-4 py-1">
                        Best Value
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${pack.color} flex items-center justify-center`}
                    >
                      <span className="text-white font-bold">{pack.credits}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{pack.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{pack.description}</p>
                    <div className="text-2xl font-bold text-white mt-2">{pack.price}</div>
                    <p className="text-gray-400 text-sm">
                      {pack.credits} submission credit{pack.credits > 1 ? "s" : ""}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pack.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <StripeButton
                      priceId={pack.priceId}
                      planName={pack.name}
                      className={`w-full bg-gradient-to-r ${pack.color} hover:opacity-90 text-white font-semibold py-2`}
                    >
                      Buy {pack.name}
                    </StripeButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">How does the submission process work?</h3>
                <p className="text-gray-400">
                  Upload your track, add details about your music, and our Grammy-nominated producers will review it
                  within 7 days (48 hours for Pro members).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">What kind of feedback do I get?</h3>
                <p className="text-gray-400">
                  You'll receive detailed feedback on production quality, commercial potential, and specific suggestions
                  for improvement from industry professionals.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-400">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your current billing period.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Do credits expire?</h3>
                <p className="text-gray-400">
                  Monthly subscription credits reset each month. One-time credit pack purchases never expire and can be
                  used whenever you're ready in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
