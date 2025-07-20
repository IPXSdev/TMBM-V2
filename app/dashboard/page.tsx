"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { UpgradeModal } from "@/components/upgrade-modal"
import { CreditPacksModal } from "@/components/credit-packs-modal"
import { useAuth } from "@/components/auth-provider"
import { Upload, Clock, Trophy, Settings, Music, Star, TrendingUp, Calendar, Crown, Shield, Zap } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showCreditPacksModal, setShowCreditPacksModal] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const hasCredits = user.credits > 0

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900/10 via-blue-900/10 to-black">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.fullName}!</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{user.plan} Plan</Badge>
                  {user.role === "master_dev" && (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      <Crown className="w-3 h-3 mr-1" />
                      Master Developer
                    </Badge>
                  )}
                  {user.role === "admin" && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Master Developer Quick Actions */}
          {user.role === "master_dev" && (
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-300 flex items-center space-x-2">
                    <Crown className="w-5 h-5" />
                    <span>Master Developer Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => (window.location.href = "/admin-portal")}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Portal
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/admin-portal/dev-tools")}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Dev Tools
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/profile")}
                      variant="outline"
                      className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Master Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Submit Music Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Submit Music</CardTitle>
                <CardDescription className="text-gray-400">Upload your track for professional review</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {hasCredits ? (
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Track
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed">
                    <Upload className="w-4 h-4 mr-2" />
                    No Credits Available
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Track Status Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Track Status</CardTitle>
                <CardDescription className="text-gray-400">Check your submission reviews</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  View Submissions
                </Button>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Achievements</CardTitle>
                <CardDescription className="text-gray-400">View your placement success</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Information */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-white">{user.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan:</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{user.plan}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Credits:</span>
                    <span className={`font-semibold ${user.credits > 0 ? "text-green-400" : "text-red-400"}`}>
                      {user.credits}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">Need submission credits?</p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button
                      onClick={() => setShowCreditPacksModal(true)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Buy Credit Packs
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/profile")}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Track submitted for review</p>
                      <p className="text-gray-400 text-xs">Your track 'Summer Vibes' is being reviewed</p>
                      <p className="text-gray-500 text-xs flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Feedback received</p>
                      <p className="text-gray-400 text-xs">Professional feedback available for 'Night Drive'</p>
                      <p className="text-gray-500 text-xs flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />1 day ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Sync opportunity</p>
                      <p className="text-gray-400 text-xs">Your track matched with a commercial project</p>
                      <p className="text-gray-500 text-xs flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />3 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
      <CreditPacksModal isOpen={showCreditPacksModal} onClose={() => setShowCreditPacksModal(false)} />
    </div>
  )
}
