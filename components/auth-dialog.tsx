"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { Eye, EyeOff, Music, Loader2, AlertCircle, CheckCircle } from "lucide-react"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    artistName: "",
    genre: "",
    inviteCode: "",
  })

  const { login, signup } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        setSuccess("Login successful!")
        setTimeout(() => {
          onOpenChange(false)
          onSuccess?.()
        }, 1000)
      } else {
        setError("Invalid credentials. Please try again.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (signupData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    try {
      const success = await signup({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        artistName: signupData.artistName,
        genre: signupData.genre,
        inviteCode: signupData.inviteCode,
      })

      if (success) {
        setSuccess("Account created successfully!")
        setTimeout(() => {
          onOpenChange(false)
          onSuccess?.()
          window.location.href = "/welcome"
        }, 1000)
      } else {
        setError("Account creation failed. Please try again.")
      }
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-gray-700 max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">MBM</h2>
            <p className="text-sm text-gray-400">Where Sound Meets Opportunity</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-blue-600">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-white data-[state=active]:bg-blue-600">
              Sign Up
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert className="bg-red-900/20 border-red-500/50 mt-4">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-900/20 border-green-500/50 mt-4">
              <CheckCircle className="w-4 h-4" />
              <AlertDescription className="text-green-200">{success}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <Card className="bg-transparent border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-400">Sign in to your MBM account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white pr-10"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-transparent border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-white">Join MBM</CardTitle>
                <CardDescription className="text-gray-400">Start your music industry journey</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="signup-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="artistName" className="text-white">
                        Artist Name
                      </Label>
                      <Input
                        id="artistName"
                        value={signupData.artistName}
                        onChange={(e) => setSignupData({ ...signupData, artistName: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Your stage name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="genre" className="text-white">
                        Genre
                      </Label>
                      <Input
                        id="genre"
                        value={signupData.genre}
                        onChange={(e) => setSignupData({ ...signupData, genre: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="Hip-Hop, R&B, etc."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="signup-password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="inviteCode" className="text-white">
                      Invite Code (Optional)
                    </Label>
                    <Input
                      id="inviteCode"
                      value={signupData.inviteCode}
                      onChange={(e) => setSignupData({ ...signupData, inviteCode: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter invite code"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-400 mt-4">
          <p>Demo credentials:</p>
          <p>User: any email / any password</p>
          <p>Admin: admin@test.com / admin123</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
