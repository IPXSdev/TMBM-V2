"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Star,
  Clock,
  User,
  Music,
  TrendingUp,
  Shield,
  Crown,
  Users,
  FileMusic,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  BarChart3,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  genre: string
  duration: string
  status: "pending" | "approved" | "rejected" | "placed"
  submittedAt: string
  reviewedBy?: string
  placement?: string
  rating?: number
}

interface AdminUser {
  id: string
  name: string
  email: string
  plan: string
  role: string
  joinedAt: string
  lastActive: string
  tracksSubmitted: number
  tracksPlaced: number
}

export default function AdminPortal() {
  const { user } = useAuth()
  const [tracks, setTracks] = useState<Track[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("tracks")

  const isMasterDev = user?.role === "master_dev" || user?.email === "2668harris@gmail.com"

  useEffect(() => {
    // Simulate loading tracks data
    const mockTracks: Track[] = [
      {
        id: "1",
        title: "Summer Vibes",
        artist: "DJ Rockwilder",
        genre: "Hip-Hop",
        duration: "3:24",
        status: "approved",
        submittedAt: "2024-01-15",
        reviewedBy: "Will Harris",
        placement: "Netflix Original Series",
        rating: 5,
      },
      {
        id: "2",
        title: "Big Tank Energy",
        artist: "Big Tank",
        genre: "Trap",
        duration: "2:58",
        status: "pending",
        submittedAt: "2024-01-14",
        rating: 4,
      },
      {
        id: "3",
        title: "Urban Dreams",
        artist: "Mr. Porter",
        genre: "R&B",
        duration: "4:12",
        status: "placed",
        submittedAt: "2024-01-13",
        reviewedBy: "Will Harris",
        placement: "Apple TV+ Commercial",
        rating: 5,
      },
      {
        id: "4",
        title: "Night Shift",
        artist: "Producer X",
        genre: "Electronic",
        duration: "3:45",
        status: "rejected",
        submittedAt: "2024-01-12",
        reviewedBy: "Will Harris",
        rating: 2,
      },
      {
        id: "5",
        title: "City Lights",
        artist: "Urban Beats",
        genre: "Pop",
        duration: "3:18",
        status: "pending",
        submittedAt: "2024-01-11",
        rating: 3,
      },
    ]

    const mockUsers: AdminUser[] = [
      {
        id: "1",
        name: "Will Harris",
        email: "2668harris@gmail.com",
        plan: "Master Developer",
        role: "master_dev",
        joinedAt: "2023-01-01",
        lastActive: "2024-01-15",
        tracksSubmitted: 0,
        tracksPlaced: 0,
      },
      {
        id: "2",
        name: "DJ Rockwilder",
        email: "rockwilder@example.com",
        plan: "Pro",
        role: "artist",
        joinedAt: "2023-06-15",
        lastActive: "2024-01-15",
        tracksSubmitted: 12,
        tracksPlaced: 8,
      },
      {
        id: "3",
        name: "Big Tank",
        email: "bigtank@example.com",
        plan: "Indie",
        role: "artist",
        joinedAt: "2023-08-20",
        lastActive: "2024-01-14",
        tracksSubmitted: 15,
        tracksPlaced: 6,
      },
      {
        id: "4",
        name: "Mr. Porter",
        email: "mrporter@example.com",
        plan: "Pro",
        role: "artist",
        joinedAt: "2023-09-10",
        lastActive: "2024-01-13",
        tracksSubmitted: 18,
        tracksPlaced: 12,
      },
    ]

    setTracks(mockTracks)
    setUsers(mockUsers)
  }, [])

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || track.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600/20 text-green-300 border-green-500/30">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-600/20 text-red-300 border-red-500/30">Rejected</Badge>
      case "placed":
        return <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">Placed</Badge>
      default:
        return <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/30">Pending</Badge>
    }
  }

  const getRatingStars = (rating?: number) => {
    if (!rating) return null
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
        ))}
      </div>
    )
  }

  const handleTrackReview = (track: Track) => {
    setSelectedTrack(track)
    setIsReviewDialogOpen(true)
  }

  const stats = [
    { label: "Total Tracks", value: tracks.length, icon: FileMusic, color: "text-blue-400" },
    {
      label: "Pending Review",
      value: tracks.filter((t) => t.status === "pending").length,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      label: "Approved",
      value: tracks.filter((t) => t.status === "approved").length,
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      label: "Placed",
      value: tracks.filter((t) => t.status === "placed").length,
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ]

  if (!isMasterDev) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900/50 border-red-500/30 max-w-md">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">You don't have permission to access the admin portal.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Crown className="w-8 h-8 mr-3 text-purple-400" />
              Admin Portal
            </h1>
            <p className="text-gray-400 mt-1">Master Developer Console</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Master Developer
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg">
          <Button
            onClick={() => setActiveTab("tracks")}
            variant={activeTab === "tracks" ? "default" : "ghost"}
            className={activeTab === "tracks" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}
          >
            <FileMusic className="w-4 h-4 mr-2" />
            Track Management
          </Button>
          <Button
            onClick={() => setActiveTab("users")}
            variant={activeTab === "users" ? "default" : "ghost"}
            className={activeTab === "users" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}
          >
            <Users className="w-4 h-4 mr-2" />
            User Management
          </Button>
          <Button
            onClick={() => setActiveTab("analytics")}
            variant={activeTab === "analytics" ? "default" : "ghost"}
            className={activeTab === "analytics" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Track Management Tab */}
        {activeTab === "tracks" && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Track Management</CardTitle>
                  <CardDescription className="text-gray-400">Review and manage submitted tracks</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Import
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search tracks, artists, genres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="placed">Placed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {/* Tracks Table */}
              <div className="rounded-lg border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="text-gray-300">Track</TableHead>
                      <TableHead className="text-gray-300">Artist</TableHead>
                      <TableHead className="text-gray-300">Genre</TableHead>
                      <TableHead className="text-gray-300">Duration</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Rating</TableHead>
                      <TableHead className="text-gray-300">Submitted</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTracks.map((track) => (
                      <TableRow key={track.id} className="border-gray-800 hover:bg-gray-800/30">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                              <Music className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{track.title}</p>
                              {track.placement && <p className="text-xs text-blue-400">{track.placement}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{track.artist}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {track.genre}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{track.duration}</TableCell>
                        <TableCell>{getStatusBadge(track.status)}</TableCell>
                        <TableCell>{getRatingStars(track.rating)}</TableCell>
                        <TableCell className="text-gray-300">{track.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTrackReview(track)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Management Tab */}
        {activeTab === "users" && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
              <CardDescription className="text-gray-400">Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-gray-800/50">
                      <TableHead className="text-gray-300">User</TableHead>
                      <TableHead className="text-gray-300">Plan</TableHead>
                      <TableHead className="text-gray-300">Role</TableHead>
                      <TableHead className="text-gray-300">Tracks</TableHead>
                      <TableHead className="text-gray-300">Placed</TableHead>
                      <TableHead className="text-gray-300">Last Active</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/30">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.plan === "Master Developer"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                                : user.plan === "Pro"
                                  ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                                  : "bg-green-600/20 text-green-300 border-green-500/30"
                            }
                          >
                            {user.plan === "Master Developer" && <Crown className="w-3 h-3 mr-1" />}
                            {user.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300 capitalize">{user.role}</TableCell>
                        <TableCell className="text-gray-300">{user.tracksSubmitted}</TableCell>
                        <TableCell className="text-gray-300">{user.tracksPlaced}</TableCell>
                        <TableCell className="text-gray-300">{user.lastActive}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Platform Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Users</span>
                    <span className="text-white font-bold">{users.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active This Month</span>
                    <span className="text-white font-bold">
                      {users.filter((u) => u.lastActive.includes("2024-01")).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-green-400 font-bold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Track "Urban Dreams" placed in Apple TV+ Commercial</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">New user "Producer X" joined</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Track "Big Tank Energy" pending review</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Track Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Music className="w-5 h-5 mr-2 text-purple-400" />
              Track Review: {selectedTrack?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Review and provide feedback for this track submission
            </DialogDescription>
          </DialogHeader>

          {selectedTrack && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Artist</Label>
                  <p className="text-white">{selectedTrack.artist}</p>
                </div>
                <div>
                  <Label className="text-gray-300">Genre</Label>
                  <p className="text-white">{selectedTrack.genre}</p>
                </div>
                <div>
                  <Label className="text-gray-300">Duration</Label>
                  <p className="text-white">{selectedTrack.duration}</p>
                </div>
                <div>
                  <Label className="text-gray-300">Status</Label>
                  {getStatusBadge(selectedTrack.status)}
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Rating</Label>
                <div className="mt-2">{getRatingStars(selectedTrack.rating)}</div>
              </div>

              <div>
                <Label htmlFor="feedback" className="text-gray-300">
                  Feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Provide detailed feedback for the artist..."
                  className="mt-2 bg-gray-800 border-gray-700 text-white"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10 bg-transparent">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Request Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
