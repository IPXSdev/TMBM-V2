"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Crown,
  Shield,
  Users,
  Music,
  TrendingUp,
  Search,
  Play,
  Star,
  MessageSquare,
  Settings,
  Database,
  Activity,
} from "lucide-react"

export default function AdminPortalPage() {
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTrack, setSelectedTrack] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && (!user || (user.role !== "master_dev" && user.email !== "2668harris@gmail.com"))) {
      window.location.href = "/dashboard"
    }
  }, [user, isLoading, mounted])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || (user.role !== "master_dev" && user.email !== "2668harris@gmail.com")) {
    return null
  }

  const adminStats = [
    { icon: Users, label: "Total Users", value: "12,847", change: "+12%" },
    { icon: Music, label: "Tracks Submitted", value: "45,231", change: "+8%" },
    { icon: TrendingUp, label: "Placements", value: "8,934", change: "+15%" },
    { icon: Shield, label: "Active Campaigns", value: "234", change: "+5%" },
  ]

  const mockTracks = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "DJ Rockwilder",
      genre: "Hip-Hop",
      duration: "3:24",
      status: "approved",
      rating: 4.8,
      submittedDate: "2024-01-15",
      placement: "Netflix Original",
    },
    {
      id: 2,
      title: "Urban Dreams",
      artist: "Big Tank",
      genre: "Trap",
      duration: "2:56",
      status: "pending",
      rating: 4.2,
      submittedDate: "2024-01-14",
      placement: "Under Review",
    },
    {
      id: 3,
      title: "Midnight Flow",
      artist: "Mr. Porter",
      genre: "R&B",
      duration: "4:12",
      status: "rejected",
      rating: 3.1,
      submittedDate: "2024-01-13",
      placement: "Not Suitable",
    },
  ]

  const mockUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      plan: "Pro",
      credits: 25,
      joinDate: "2024-01-10",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      plan: "Indie",
      credits: 12,
      joinDate: "2024-01-08",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      plan: "Creator",
      credits: 0,
      joinDate: "2024-01-05",
      status: "inactive",
    },
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Admin Privileges Console */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="w-5 h-5 mr-2 text-yellow-400" />
            Admin Privileges Console
          </CardTitle>
          <CardDescription className="text-gray-300">
            Master Developer: {user.name} ({user.email})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">System Status</span>
              </div>
              <p className="text-green-400 text-sm">All Systems Operational</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">Database</span>
              </div>
              <p className="text-green-400 text-sm">Connected & Synced</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-pink-400" />
                <span className="text-white font-medium">Access Level</span>
              </div>
              <p className="text-yellow-400 text-sm">Master Developer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-green-400 text-sm">{stat.change} from last month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Platform Activity</CardTitle>
          <CardDescription className="text-gray-400">Recent system events and user activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                <Music className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white">New track submitted: "Summer Vibes" by DJ Rockwilder</p>
                <p className="text-gray-400 text-sm">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white">New user registration: sarah@example.com</p>
                <p className="text-gray-400 text-sm">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-800/30 rounded-lg">
              <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-white">Track placement confirmed: "Urban Dreams" → HBO Max</p>
                <p className="text-gray-400 text-sm">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTrackManagement = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tracks, artists, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                <SelectItem value="trap">Trap</SelectItem>
                <SelectItem value="rnb">R&B</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tracks Table */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Track Management</CardTitle>
          <CardDescription className="text-gray-400">Review and manage submitted tracks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">Track</TableHead>
                <TableHead className="text-gray-300">Artist</TableHead>
                <TableHead className="text-gray-300">Genre</TableHead>
                <TableHead className="text-gray-300">Duration</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Rating</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTracks.map((track) => (
                <TableRow key={track.id} className="border-gray-800">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{track.title}</p>
                        <p className="text-gray-400 text-sm">Submitted {track.submittedDate}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{track.artist}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">{track.genre}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{track.duration}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        track.status === "approved"
                          ? "bg-green-600/20 text-green-300 border-green-500/30"
                          : track.status === "pending"
                            ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                            : "bg-red-600/20 text-red-300 border-red-500/30"
                      }
                    >
                      {track.status.charAt(0).toUpperCase() + track.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300">{track.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300"
                        onClick={() => setSelectedTrack(track)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Track Review Panel */}
      {selectedTrack && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Review: {selectedTrack.title}</CardTitle>
            <CardDescription className="text-gray-400">Provide feedback and rating</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Rating (1-5)</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="5">5 - Excellent</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="1">1 - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Status</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-gray-300">Feedback</Label>
              <Textarea
                placeholder="Provide detailed feedback for the artist..."
                className="bg-gray-800 border-gray-700 text-white"
                rows={4}
              />
            </div>
            <div className="flex space-x-4">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                Save Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedTrack(null)}
                className="border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderUserManagement = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">User Management</CardTitle>
          <CardDescription className="text-gray-400">Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Plan</TableHead>
                <TableHead className="text-gray-300">Credits</TableHead>
                <TableHead className="text-gray-300">Join Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">{user.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{user.credits}</TableCell>
                  <TableCell className="text-gray-300">{user.joinDate}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "active"
                          ? "bg-green-600/20 text-green-300 border-green-500/30"
                          : "bg-red-600/20 text-red-300 border-red-500/30"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Platform Analytics</CardTitle>
          <CardDescription className="text-gray-400">Detailed insights and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Revenue Overview</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-green-400">$45,230</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Month</span>
                  <span className="text-gray-300">$38,920</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Growth</span>
                  <span className="text-green-400">+16.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">User Engagement</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Active</span>
                  <span className="text-blue-400">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Weekly Active</span>
                  <span className="text-blue-400">8,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Retention Rate</span>
                  <span className="text-green-400">84.3%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-white font-semibold mb-4">Placement Success</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg. Response Time</span>
                  <span className="text-blue-400">2.3 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Client Satisfaction</span>
                  <span className="text-green-400">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const tabs = [
    { id: "overview", label: "Overview", icon: Shield },
    { id: "tracks", label: "Track Management", icon: Music },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
                <p className="text-gray-400">Master Developer Access - {user.name}</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && renderOverview()}
          {activeTab === "tracks" && renderTrackManagement()}
          {activeTab === "users" && renderUserManagement()}
          {activeTab === "analytics" && renderAnalytics()}
        </div>
      </div>
    </div>
  )
}
