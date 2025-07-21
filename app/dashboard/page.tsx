"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  Clock,
  Star,
  Play,
  Download,
  MessageSquare,
  TrendingUp,
  Music,
  Calendar,
  Award,
  Settings,
  Crown,
  Shield,
  Plus,
  FileAudio,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

export default function DashboardPage() {
  const { user, updateUser, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitData, setSubmitData] = useState({
    title: "",
    description: "",
    mood: "",
    file: null as File | null,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      window.location.href = "/"
    }
  }, [user, isLoading, mounted])

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

  const isAdmin = user.role === "admin" || user.role === "master_admin"
  const isMasterAdmin = user.role === "master_admin"

  const handleSubmitTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!submitData.file || user.submissionsUsed >= user.submissions) return

    setIsSubmitting(true)

    // Simulate file upload and processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update user's submission count
    updateUser({
      submissionsUsed: user.submissionsUsed + 1,
    })

    setIsSubmitting(false)
    setShowSubmitModal(false)
    setSubmitData({ title: "", description: "", mood: "", file: null })
  }

  const mockSubmissions = [
    {
      id: 1,
      title: "Summer Vibes",
      status: "ranked",
      rating: 4.8,
      mood: ["Uplifting", "Love"],
      submittedDate: "2024-01-15",
      adminNotes: "Great production quality. Strong commercial appeal.",
      waveform: true,
    },
    {
      id: 2,
      title: "Urban Dreams",
      status: "pending",
      rating: null,
      mood: ["Action", "Urban"],
      submittedDate: "2024-01-20",
      adminNotes: null,
      waveform: true,
    },
  ]

  const recentActivity = [
    {
      type: "submission",
      title: "Track submitted for review",
      description: "Your track 'Summer Vibes' is being reviewed",
      time: "2 hours ago",
      icon: Music,
      color: "text-blue-400",
    },
    {
      type: "rating",
      title: "Track rated",
      description: "Your track received a 4.8/5 rating",
      time: "1 day ago",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      type: "message",
      title: "New feedback",
      description: "Admin left feedback on your submission",
      time: "2 days ago",
      icon: MessageSquare,
      color: "text-purple-400",
    },
  ]

  const canSubmit = user.submissionsUsed < user.submissions

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-900/10 via-blue-900/10 to-black">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
                <div className="flex items-center space-x-4">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 capitalize">{user.plan} Plan</Badge>
                  {isMasterAdmin && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Master Admin
                    </Badge>
                  )}
                  {isAdmin && !isMasterAdmin && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400">Submissions</p>
                <p className="text-2xl font-bold text-white">
                  {user.submissionsUsed}/{user.submissions}
                </p>
              </div>
            </div>
          </div>

          {/* Admin Quick Actions */}
          {isAdmin && (
            <div className="mb-8">
              <Card className="glass border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    {isMasterAdmin ? (
                      <Crown className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Shield className="w-5 h-5 text-purple-400" />
                    )}
                    <span>{isMasterAdmin ? "Master Admin" : "Admin"} Quick Actions</span>
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    {isMasterAdmin ? "Full system access and controls" : "Review and manage submissions"}
                  </CardDescription>
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
                      onClick={() => (window.location.href = "/admin-portal/submissions")}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Music className="w-4 h-4 mr-2" />
                      Review Tracks
                    </Button>
                    {isMasterAdmin && (
                      <Button
                        onClick={() => (window.location.href = "/admin-portal/system")}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        System Admin
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* My Submissions */}
            <div className="lg:col-span-2">
              <Card className="glass border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Music className="w-5 h-5" />
                      <span>My Submissions</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Track your music submissions and reviews
                    </CardDescription>
                  </div>
                  <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
                    <DialogTrigger asChild>
                      <Button
                        disabled={!canSubmit}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Submit Track
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass border-gray-700 max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-white">Submit New Track</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitTrack} className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="text-white">
                            Track Title
                          </Label>
                          <Input
                            id="title"
                            value={submitData.title}
                            onChange={(e) => setSubmitData({ ...submitData, title: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder="Enter track title"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="mood" className="text-white">
                            Mood/Genre
                          </Label>
                          <Select onValueChange={(value) => setSubmitData({ ...submitData, mood: value })}>
                            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                              <SelectValue placeholder="Select mood" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700">
                              <SelectItem value="uplifting">Uplifting</SelectItem>
                              <SelectItem value="love">Love</SelectItem>
                              <SelectItem value="action">Action</SelectItem>
                              <SelectItem value="urban">Urban</SelectItem>
                              <SelectItem value="chill">Chill</SelectItem>
                              <SelectItem value="energetic">Energetic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description" className="text-white">
                            Description (Optional)
                          </Label>
                          <Textarea
                            id="description"
                            value={submitData.description}
                            onChange={(e) => setSubmitData({ ...submitData, description: e.target.value })}
                            className="bg-gray-800 border-gray-600 text-white"
                            placeholder="Tell us about your track..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="file" className="text-white">
                            Audio File
                          </Label>
                          <Input
                            id="file"
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setSubmitData({ ...submitData, file: e.target.files?.[0] || null })}
                            className="bg-gray-800 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !submitData.file}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Track
                            </>
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {mockSubmissions.length > 0 ? (
                    <div className="space-y-4">
                      {mockSubmissions.map((submission) => (
                        <Card key={submission.id} className="bg-gray-800/50 border-gray-700">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                  <FileAudio className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-white font-semibold text-lg">{submission.title}</h3>
                                  <p className="text-gray-400 text-sm">Submitted {submission.submittedDate}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={
                                    submission.status === "ranked"
                                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                                      : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  }
                                >
                                  {submission.status === "ranked" ? (
                                    <>
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Ranked
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3 h-3 mr-1" />
                                      Pending
                                    </>
                                  )}
                                </Badge>
                                {submission.rating && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-white font-medium">{submission.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Waveform Visualization */}
                            <div className="flex items-center space-x-1 mb-4 h-8">
                              {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="waveform-bar bg-gradient-to-t from-blue-500 to-purple-500 w-1"
                                  style={{
                                    height: `${Math.random() * 100 + 20}%`,
                                    animationDelay: `${i * 0.05}s`,
                                  }}
                                />
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {submission.mood.map((mood, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                                  >
                                    {mood}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                  <Play className="w-4 h-4" />
                                </Button>
                                {isAdmin && (
                                  <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                                    <Download className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            {submission.adminNotes && (
                              <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                                <p className="text-sm text-gray-300">
                                  <MessageSquare className="w-4 h-4 inline mr-2" />
                                  {submission.adminNotes}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400 mb-2">No submissions yet</h3>
                      <p className="text-gray-500 mb-4">Upload your first track to get started</p>
                      {canSubmit && (
                        <Button
                          onClick={() => setShowSubmitModal(true)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Your First Track
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Plan Status */}
              <Card className="glass border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Plan Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Plan</span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 capitalize">{user.plan}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Submissions Used</span>
                    <span className="text-white font-medium">
                      {user.submissionsUsed}/{user.submissions}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(user.submissionsUsed / user.submissions) * 100}%` }}
                    />
                  </div>

                  {!canSubmit && (
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-300">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">No submissions remaining</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button
                      onClick={() => (window.location.href = "/pricing")}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button
                      onClick={() => (window.location.href = "/pricing")}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Buy Submission Packs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0`}
                        >
                          <activity.icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm">{activity.title}</p>
                          <p className="text-gray-400 text-sm">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="glass border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Your Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">2</div>
                      <div className="text-xs text-gray-400">Tracks Submitted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">4.8</div>
                      <div className="text-xs text-gray-400">Avg Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">1</div>
                      <div className="text-xs text-gray-400">Placements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">5</div>
                      <div className="text-xs text-gray-400">Days Active</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
