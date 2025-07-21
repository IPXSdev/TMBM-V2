"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Upload, Headphones, Users, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      window.location.href = "/"
    }
  }, [user, isLoading, mounted])

  useEffect(() => {
    // Animate through the steps
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const steps = [
    {
      icon: CheckCircle,
      title: "Account Created!",
      description: "Welcome to the MBM family",
      color: "from-green-500 to-emerald-500",
      active: currentStep === 0,
    },
    {
      icon: CheckCircle,
      title: "You're In!",
      description: "Your journey to industry success starts now",
      color: "from-green-500 to-emerald-500",
      active: currentStep === 1,
    },
    {
      icon: CheckCircle,
      title: "Ready to Submit",
      description: "Upload your first track and get discovered",
      color: "from-green-500 to-emerald-500",
      active: currentStep === 2,
    },
  ]

  const nextSteps = [
    {
      icon: Upload,
      title: "Submit Your First Track",
      description: "Upload your best song and get it in front of Grammy-nominated producers and A&Rs.",
      action: "Upload Now",
      color: "from-blue-500 to-blue-600",
      href: "/dashboard",
    },
    {
      icon: Headphones,
      title: "Explore Podcast Content",
      description: "Access exclusive behind-the-scenes content and industry insights from the legends.",
      action: "Watch Now",
      color: "from-purple-500 to-pink-500",
      href: "/podcast",
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "Connect with other artists and stay updated on placement opportunities.",
      action: "Explore",
      color: "from-orange-500 to-red-500",
      href: "/community",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900/10 via-blue-900/10 to-purple-900/10">
        <div className="container mx-auto px-4 py-16">
          {/* Success Steps Animation */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex justify-center items-center space-x-8 mb-12">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    step.active ? "scale-110 opacity-100" : "scale-90 opacity-50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-3 ${
                      step.active ? "animate-pulse" : ""
                    }`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm text-center">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Account Successfully Created
              </Badge>
            </div>
          </div>

          {/* Main Welcome Content */}
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Welcome to
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Your Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              You've just joined an exclusive community of artists who are serious about their music careers. Industry
              legends are waiting to hear what you've got.
            </p>
          </div>

          {/* Next Steps Cards */}
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {nextSteps.map((step, index) => (
                <Card
                  key={index}
                  className="glass border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>
                    <Button
                      onClick={() => (window.location.href = step.href)}
                      className={`bg-gradient-to-r ${step.color} hover:opacity-90 text-white px-6 py-3`}
                    >
                      {step.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="glass border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Your Music Career Starts Now</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Don't wait. The industry is looking for fresh talent, and you're exactly what they need. Upload your
                  first track and let the professionals hear what you've been working on.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg blue-glow"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Your Music
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg glass"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
