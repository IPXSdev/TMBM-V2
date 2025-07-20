"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap } from "lucide-react"

interface UpgradeModalProps {
  children: React.ReactNode
}

export function UpgradeModal({ children }: UpgradeModalProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleViewPricing = () => {
    setOpen(false)
    router.push("/pricing")
  }

  const plans = [
    {
      name: "Indie",
      price: "$19.99",
      period: "/month",
      icon: <Zap className="h-5 w-5" />,
      features: ["1 Credit per month", "Access to all content", "Standard support", "Mobile app access"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$24.99",
      period: "/month",
      icon: <Crown className="h-5 w-5" />,
      features: [
        "2 Credits per month",
        "Access to all content",
        "Priority support",
        "Mobile app access",
        "Early access to new features",
      ],
      popular: true,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Upgrade Your Plan</DialogTitle>
          <DialogDescription className="text-center">
            Choose a subscription plan to get monthly credits and unlock premium features
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-lg border-2 transition-all ${
                plan.popular ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                  Most Popular
                </Badge>
              )}

              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon}
                  <h3 className="text-xl font-bold ml-2">{plan.name}</h3>
                </div>
                <div className="text-3xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button onClick={handleViewPricing} className="w-full sm:w-auto px-8">
            View Pricing Plans
          </Button>
          <p className="text-sm text-gray-600 mt-2">Compare all plans and purchase credits on our pricing page</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
