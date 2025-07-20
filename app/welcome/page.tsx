"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Sparkles, Upload, Trophy, Users, Play, Headphones } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function WelcomePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: CheckCircle,
      title: "Account Created!",
      description: "Welcome to the MBM family",
    },
    {
      icon: Sparkles,
      title: "You're In!",
      description: "Your journey to industry success starts now",
    },
    {
      icon: Trophy,
      title: "Ready to Submit",
      description: "Upload your first track and get discovered",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Success Steps */}
            <div className="mb-12">
              <div className="flex justify-center items-center space-x-8 mb-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center transition-all duration-500 ${
                      index <= currentStep ? "opacity-100 scale-100" : "opacity-30 scale-75"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                        index <= currentStep ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gray-700"
                      }`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Welcome Message */}
            <div className="mb-12">
              <Badge className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30">
                <CheckCircle className="w-3 h-3 mr-1" />
                Account Successfully Created
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Welcome to
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Your Future
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                You've just joined an exclusive community of artists who are serious about their music careers. Industry
                legends are waiting to hear what you've got.
              </p>
            </div>

            {/* Next Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Submit Your First Track</h3>
                  <p className="text-gray-400 mb-4">
                    Upload your best song and get it in front of Grammy-nominated producers and A&Rs.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Explore Podcast Content</h3>
                  <p className="text-gray-400 mb-4">
                    Access exclusive behind-the-scenes content and industry insights from the legends.
                  </p>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 bg-transparent">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Join the Community</h3>
                  <p className="text-gray-400 mb-4">
                    Connect with other artists and stay updated on placement opportunities.
                  </p>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Your Music Career Starts Now</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Don't wait. The industry is looking for fresh talent, and you're exactly what they need. Upload your
                first track and let the professionals hear what you've been working on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
                  onClick={() => (window.location.href = "/submit")}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Your Music
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-6 bg-transparent"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Success Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">24hrs</div>
                <div className="text-gray-400">Average Review Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
                <div className="text-gray-400">Successful Placements</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">10k+</div>
                <div className="text-gray-400">Artists in Community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
