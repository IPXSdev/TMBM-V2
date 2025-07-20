"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import {
  Eye,
  EyeOff,
  Music,
  Star,
  Trophy,
  Target,
  Shield,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    artistName: "",
    genre: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()
  const { signup } = useAuth()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    if (!formData.artistName.trim()) newErrors.artistName = "Artist name is required"
    if (!formData.genre.trim()) newErrors.genre = "Genre is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const success = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        artistName: formData.artistName,
        genre: formData.genre,
      })

      if (success) {
        router.push("/welcome")
      } else {
        setErrors({ general: "Account creation failed. Please try again." })
      }
    } catch (error) {
      setErrors({ general: "Account creation failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Benefits & Motivation */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white">Join MBM Today</h1>
                      <p className="text-blue-300">Start your music industry journey</p>
                    </div>
                  </div>
                </div>

                {/* What You'll Get */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">What You'll Get:</h2>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Industry Professional Reviews</h3>
                        <p className="text-gray-300">
                          Get your music heard by Grammy-nominated producers and A&Rs who can change your career
                          trajectory
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Sync Placement Opportunities</h3>
                        <p className="text-gray-300">
                          Top-rated tracks get featured in films, TV shows, commercials, and streaming content
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Exclusive Content & Insights</h3>
                        <p className="text-gray-300">
                          Learn from industry legends through exclusive behind-the-scenes content and masterclasses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <Shield className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-white font-bold text-xl">Trusted by 10,000+ Artists</h3>
                      <p className="text-gray-300">Join the community that's changing music careers</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-yellow-400">500+</div>
                      <div className="text-gray-400">Sync Placements</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-400">95%</div>
                      <div className="text-gray-400">Artist Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-400">24/7</div>
                      <div className="text-gray-400">Industry Access</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="space-y-6">
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Create Your Account</CardTitle>
                    <CardDescription className="text-gray-400">
                      Join thousands of artists advancing their careers
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Error Message */}
                    {errors.general && (
                      <Alert className="bg-red-900/20 border-red-500/50">
                        <AlertCircle className="w-4 h-4" />
                        <AlertDescription className="text-red-200">{errors.general}</AlertDescription>
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-white">
                            First Name *
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className={`bg-gray-800 border-gray-600 text-white ${errors.firstName ? "border-red-500" : ""}`}
                            placeholder="John"
                          />
                          {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white">
                            Last Name *
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className={`bg-gray-800 border-gray-600 text-white ${errors.lastName ? "border-red-500" : ""}`}
                            placeholder="Doe"
                          />
                          {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`bg-gray-800 border-gray-600 text-white ${errors.email ? "border-red-500" : ""}`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="password" className="text-white">
                            Password *
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChange("password", e.target.value)}
                              className={`bg-gray-800 border-gray-600 text-white pr-10 ${
                                errors.password ? "border-red-500" : ""
                              }`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-white">
                            Confirm Password *
                          </Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                              className={`bg-gray-800 border-gray-600 text-white pr-10 ${
                                errors.confirmPassword ? "border-red-500" : ""
                              }`}
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="artistName" className="text-white">
                            Artist Name *
                          </Label>
                          <Input
                            id="artistName"
                            type="text"
                            value={formData.artistName}
                            onChange={(e) => handleInputChange("artistName", e.target.value)}
                            className={`bg-gray-800 border-gray-600 text-white ${errors.artistName ? "border-red-500" : ""}`}
                            placeholder="Your stage name"
                          />
                          {errors.artistName && <p className="text-red-400 text-sm mt-1">{errors.artistName}</p>}
                        </div>
                        <div>
                          <Label htmlFor="genre" className="text-white">
                            Primary Genre *
                          </Label>
                          <Input
                            id="genre"
                            type="text"
                            value={formData.genre}
                            onChange={(e) => handleInputChange("genre", e.target.value)}
                            className={`bg-gray-800 border-gray-600 text-white ${errors.genre ? "border-red-500" : ""}`}
                            placeholder="Hip-Hop, R&B, Pop, etc."
                          />
                          {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre}</p>}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                            className="mt-1"
                          />
                          <div className="text-sm">
                            <label htmlFor="agreeToTerms" className="text-gray-300 cursor-pointer">
                              I agree to the{" "}
                              <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                                Privacy Policy
                              </a>{" "}
                              *
                            </label>
                            {errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>}
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="subscribeNewsletter"
                            checked={formData.subscribeNewsletter}
                            onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                            className="mt-1"
                          />
                          <label htmlFor="subscribeNewsletter" className="text-gray-300 text-sm cursor-pointer">
                            Subscribe to our newsletter for industry insights, exclusive opportunities, and artist
                            success stories
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Creating Your Account...
                          </>
                        ) : (
                          <>
                            Create Account & Start Journey
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Free to start • No credit card required</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Already have an account?{" "}
                          <a href="/login" className="text-blue-400 hover:text-blue-300 underline">
                            Sign in here
                          </a>
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
