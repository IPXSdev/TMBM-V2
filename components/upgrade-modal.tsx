"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StripeButton } from "./stripe-button"
import { useAuth } from "./auth-provider"
import { Check, Star, Crown, X, ArrowRight } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const { user } = useAuth()

  const plans = [
    {
      name: "Indie",
      price: "$19.99",
      period: "/month",
      description: "Perfect for independent artists",
      icon: Star,
      color: "from-purple-500 to-pink-600",
      popular: true,
      features: [
        "3 monthly track submissions",
        "Professional industry feedback",
        "Priority review queue",
        "Monthly sync opportunities newsletter",
        "Access to exclusive artist showcases",
        "Direct A&R communication for standout tracks",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_INDIE || "",
    },
    {
      name: "Pro",
      price: "$24.99",
      period: "/month",
      description: "Maximum exposure and opportunities",
      icon: Crown,
      color: "from-yellow-500 to-orange-600",
      popular: false,
      features: [
        "5 monthly track submissions",
        "Premium A&R consideration",
        "Exclusive sync opportunities",
        "Monthly industry insights call",
        "Priority placement consideration",
        "Advanced analytics dashboard",
        "1-on-1 consultation sessions",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || "",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">Upgrade Your Plan</DialogTitle>
              <DialogDescription className="text-gray-400">
                Choose the perfect plan to advance your music career
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-gray-800/50 border-gray-700 ${plan.popular ? "ring-2 ring-purple-500/50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">
                  {plan.price}
                  <span className="text-lg text-gray-400">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {user ? (
                  <StripeButton
                    priceId={plan.priceId}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
                  >
                    Upgrade to {plan.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </StripeButton>
                ) : (
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}
                  >
                    Sign In to Upgrade
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm text-center">
            💡 <strong>Need help choosing?</strong> All plans include professional feedback and sync placement
            consideration. Upgrade anytime!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
