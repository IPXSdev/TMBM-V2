"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Music, Star, Crown, Diamond, Trophy, Zap, ArrowRight } from "lucide-react"
import { StripeButton } from "@/components/stripe-button"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"

export default function PricingPage() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const { user } = useAuth()

  const handleAuthRequired = () => {
    setShowAuthDialog(true)
  }

  const handleAuthSuccess = () => {
    setShowAuthDialog(false)
  }

  const monthlyPlans = [
    {
      name: "Basic",
      price: "Free",
      yearlyPrice: "Free",
      submissions: "1/month",
      features: [
        "1 submission per month",
        "Basic feedback from industry professionals",
        "Track status updates",
        "Community access",
        "Standard review queue (5-7 days)",
      ],
      cta: "Get Started Free",
      popular: false,
      color: "border-gray-700",
      priceId: "",
      yearlyPriceId: "",
    },
    {
      name: "Creator",
      price: "$19.99",
      yearlyPrice: "$199.99",
      submissions: "3/month",
      features: [
        "3 submissions per month",
        "Detailed professional feedback",
        "Priority review queue (3-5 days)",
        "Sync opportunity alerts",
        "Direct messaging with A&Rs",
        "Monthly industry insights newsletter",
      ],
      cta: "Start Creating",
      popular: true,
      color: "border-blue-500",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE || "",
      yearlyPriceId: "",
    },
    {
      name: "Pro",
      price: "$24.99",
      yearlyPrice: "$249.99",
      submissions: "5/month",
      features: [
        "5 submissions per month",
        "Premium feedback with detailed notes",
        "Priority sync placement consideration",
        "Direct A&R contact for top tracks",
        "Advanced analytics dashboard",
        "Exclusive sync opportunities",
        "Monthly 1-on-1 industry call",
      ],
      cta: "Go Pro",
      popular: false,
      color: "border-purple-500",
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "",
      yearlyPriceId: "",
    },
  ]

  const submissionPacks = [
    {
      name: "Silver",
      price: "$4.99",
      submissions: "+1",
      description: "Perfect for trying us out",
      color: "from-gray-400 to-gray-600",
      icon: Diamond,
      features: [
        "1 additional submission credit",
        "Professional industry feedback",
        "Sync placement consideration",
        "Detailed review report",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SILVER || "",
      popular: false,
    },
    {
      name: "Gold",
      price: "$9.99",
      submissions: "+2",
      description: "Great value for multiple submissions",
      color: "from-yellow-400 to-orange-500",
      icon: Trophy,
      features: [
        "2 additional submission credits",
        "Professional industry feedback",
        "Priority sync placement consideration",
        "Detailed review reports",
        "Bonus: Extra feedback detail",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GOLD || "",
      popular: true,
    },
    {
      name: "Platinum",
      price: "$14.99",
      submissions: "+4",
      description: "Maximum value and exposure",
      color: "from-purple-400 to-pink-500",
      icon: Zap,
      features: [
        "4 additional submission credits",
        "Professional industry feedback",
        "VIP sync placement consideration",
        "Direct A&R contact for standout tracks",
        "Detailed review reports",
        "Bonus: Industry networking opportunities",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PLATINUM || "",
      popular: false,
    },
  ]

  const compareFeatures = [
    { feature: "Monthly Submissions", basic: "1", creator: "3", pro: "5" },
    { feature: "Review Time", basic: "5-7 days", creator: "3-5 days", pro: "1-3 days" },
    { feature: "Feedback Detail", basic: "Basic", creator: "Detailed", pro: "Premium" },
    { feature: "Sync Consideration", basic: "Standard", creator: "Priority", pro: "VIP" },
    { feature: "A&R Contact", basic: "❌", creator: "Top tracks", pro: "All tracks" },
    { feature: "Analytics", basic: "Basic", creator: "Standard", pro: "Advanced" },
    { feature: "Industry Calls", basic: "❌", creator: "❌", pro: "Monthly" },
    { feature: "Exclusive Opportunities", basic: "❌", creator: "Some", pro: "All" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
            <Music className="w-4 h-4 mr-2" />
            Pricing Plans
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Get your music heard by industry professionals and Grammy-nominated producers
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative w-14 h-7 bg-gray-700 rounded-full transition-colors duration-200 focus:outline-none"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${billingCycle === "yearly" ? "transform translate-x-7" : ""}`}
              />
            </button>
            <span className={`${billingCycle === "yearly" ? "text-white" : "text-gray-400"}`}>
              Yearly
              <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Monthly Subscriptions */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Monthly Subscriptions</h2>
            <p className="text-gray-400">Ongoing access with monthly track submissions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {monthlyPlans.map((plan, index) => (
              <Card key={index} className={`glass ${plan.color} relative ${plan.popular ? "scale-105" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 ${plan.name === "Basic" ? "bg-blue-600" : plan.name === "Creator" ? "bg-purple-600" : "bg-gradient-to-r from-orange-500 to-red-500"} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      {plan.name === "Basic" ? (
                        <Music className="w-8 h-8 text-white" />
                      ) : plan.name === "Creator" ? (
                        <Star className="w-8 h-8 text-white" />
                      ) : (
                        <Crown className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">
                      {plan.name === "Basic"
                        ? "Perfect for getting started"
                        : plan.name === "Creator"
                          ? "For serious independent artists"
                          : "Maximum exposure and opportunities"}
                    </p>
                    <div className="text-4xl font-bold text-white">
                      {billingCycle === "monthly" ? plan.price : plan.yearlyPrice}
                      {plan.price !== "Free" && (
                        <span className="text-lg text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      )}
                    </div>
                    <p className="text-gray-400 mt-2">{plan.submissions}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {plan.name === "Basic" ? (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => (!user ? handleAuthRequired() : (window.location.href = "/dashboard"))}
                    >
                      {plan.cta} →
                    </Button>
                  ) : (
                    <StripeButton
                      priceId={billingCycle === "monthly" ? plan.priceId : plan.yearlyPriceId}
                      planName={`${plan.name} Plan`}
                      className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"} text-white`}
                      onAuthRequired={handleAuthRequired}
                    >
                      {plan.cta} →
                    </StripeButton>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Compare Plans</h2>
            <p className="text-gray-400">Detailed feature comparison across all plans</p>
          </div>

          <Card className="glass border-gray-700 max-w-5xl mx-auto">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-6 text-white font-semibold">Features</th>
                      <th className="text-center p-6 text-white font-semibold">Basic</th>
                      <th className="text-center p-6 text-white font-semibold">Creator</th>
                      <th className="text-center p-6 text-white font-semibold">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareFeatures.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 last:border-b-0">
                        <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                        <td className="p-6 text-center text-gray-300">{row.basic}</td>
                        <td className="p-6 text-center text-gray-300">{row.creator}</td>
                        <td className="p-6 text-center text-gray-300">{row.pro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Packs */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Submission Credit Packs</h2>
            <p className="text-gray-400">One-time purchases for additional track submissions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {submissionPacks.map((pack, index) => (
              <Card key={index} className={`glass border-gray-700 ${pack.popular ? "border-yellow-500" : ""} relative`}>
                {pack.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                    Best Value
                  </Badge>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${pack.color} rounded-full flex items-center justify-center mx-auto mb-4 relative`}
                    >
                      <pack.icon className="w-8 h-8 text-white" />
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {pack.submissions.replace("+", "")}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{pack.name} Pack</h3>
                    <p className="text-gray-400 mb-4">{pack.description}</p>
                    <div className="text-4xl font-bold text-white mb-2">{pack.price}</div>
                    <p className="text-gray-400">{pack.submissions} submission credits</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <StripeButton
                    priceId={pack.priceId}
                    planName={`${pack.name} Pack`}
                    className={`w-full ${pack.popular ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" : "bg-gray-600 hover:bg-gray-700"} text-white`}
                    onAuthRequired={handleAuthRequired}
                  >
                    Buy {pack.name} Pack →
                  </StripeButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Can I change my plan at any time?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.",
              },
              {
                question: "Do unused submissions roll over?",
                answer:
                  "No, unused monthly submissions don't roll over. However, submission pack credits never expire and can be used anytime.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment processing.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Our Basic plan is completely free forever with 1 submission per month. You can upgrade anytime to access more features.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.",
              },
            ].map((faq, index) => (
              <Card key={index} className="glass border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="glass border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Your Music Heard?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of artists who have already connected with industry professionals through MBM
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => (!user ? handleAuthRequired() : (window.location.href = "/dashboard"))}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg blue-glow"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/how-it-works")}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg glass bg-transparent"
                >
                  Learn How It Works
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onSuccess={handleAuthSuccess} />
    </div>
  )
}
