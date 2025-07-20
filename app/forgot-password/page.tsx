"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful password reset request
      setIsSuccess(true)
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />

        <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black flex items-center justify-center">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Check Your Email</h1>
              <p className="text-gray-300 mb-6">
                We've sent a password reset link to <strong className="text-blue-400">{email}</strong>
              </p>
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <p className="text-blue-200 text-sm">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => (window.location.href = "/login")}
                >
                  Back to Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={() => {
                    setIsSuccess(false)
                    setEmail("")
                  }}
                >
                  Try Different Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 mx-auto w-fit">
                  Password Reset
                </Badge>
                <CardTitle className="text-white text-3xl mb-2">Forgot Password?</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  No worries! Enter your email and we'll send you a reset link.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                {/* Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`bg-gray-800 border-gray-600 text-white pl-10 ${error ? "border-red-500" : ""}`}
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Reset Link...</span>
                      </div>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Back to Login */}
                <div className="text-center">
                  <p className="text-gray-400">
                    Remember your password?{" "}
                    <a href="/login" className="text-blue-400 hover:text-blue-300 underline font-medium">
                      Sign in here
                    </a>
                  </p>
                </div>

                {/* Help Text */}
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Need Help?</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Check your spam/junk folder</li>
                    <li>• Make sure you're using the correct email</li>
                    <li>• Contact support if you continue having issues</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
