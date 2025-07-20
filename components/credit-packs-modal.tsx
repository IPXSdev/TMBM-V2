"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StripeButton } from "./stripe-button"
import { useAuth } from "./auth-provider"
import { Check, Gem, Trophy, Zap, X, ArrowRight } from "lucide-react"

interface CreditPacksModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreditPacksModal({ isOpen, onClose }: CreditPacksModalProps) {
  const { user } = useAuth()

  const creditPacks = [
    {
      name: "Silver Pack",
      price: "$4.99",
      credits: 1,
      description: "Perfect for trying us out",
      icon: Gem,
      color: "from-gray-400 to-gray-600",
      popular: false,
      features: [
        "1 track submission credit",
        "Professional industry feedback",
        "Sync placement consideration",
        "Detailed review report",
        "90-day credit validity",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SILVER || "",
    },
    {
      name: "Gold Pack",
      price: "$19.99",
      credits: 2,
      description: "Great value for multiple submissions",
      icon: Trophy,
      color: "from-yellow-400 to-yellow-600",
      popular: true,
      features: [
        "2 track submission credits",
        "Professional industry feedback",
        "Priority sync placement consideration",
        "Detailed review reports",
        "180-day credit validity",
        "Bonus: Extra feedback detail",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_GOLD || "",
    },
    {
      name: "Platinum Pack",
      price: "$34.99",
      credits: 4,
      description: "Maximum value and exposure",
      icon: Zap,
      color: "from-purple-400 to-purple-600",
      popular: false,
      features: [
        "4 track submission credits",
        "Professional industry feedback",
        "VIP sync placement consideration",
        "Direct A&R contact for standout tracks",
        "Detailed review reports",
        "365-day credit validity",
        "Bonus: Industry networking opportunities",
      ],
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PLATINUM || "",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl text-white">Buy Credit Packs</DialogTitle>
              <DialogDescription className="text-gray-400">
                One-time purchases for occasional submissions
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {creditPacks.map((pack) => (
            <Card
              key={pack.name}
              className={`relative bg-gray-800/50 border-gray-700 ${pack.popular ? "ring-2 ring-yellow-500/50" : ""}`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-4 py-1">
                    Best Value
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${pack.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <pack.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">{pack.name}</CardTitle>
                <CardDescription className="text-gray-400">{pack.description}</CardDescription>
                <div className="text-4xl font-bold text-white mt-4">{pack.price}</div>
                <div className="text-sm text-gray-400">
                  {pack.credits} submission credit{pack.credits > 1 ? "s" : ""}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {pack.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {user ? (
                  <StripeButton
                    priceId={pack.priceId}
                    className={`w-full bg-gradient-to-r ${pack.color} hover:opacity-90 text-white`}
                  >
                    Buy {pack.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </StripeButton>
                ) : (
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    className={`w-full bg-gradient-to-r ${pack.color} hover:opacity-90 text-white`}
                  >
                    Sign In to Purchase
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
          <p className="text-orange-300 text-sm text-center">
            🔥 <strong>Pro Tip:</strong> Credits never expire and can be used anytime. Buy in bulk to save more!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
