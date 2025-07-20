"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Navigation } from "@/components/navigation"
import {
  Play,
  Pause,
  Download,
  Star,
  Search,
  MoreHorizontal,
  MessageSquare,
  Settings,
  Users,
  Music,
  Youtube,
  RefreshCw,
  Volume2,
  X,
  Crown,
  Shield,
  UserPlus,
  UserMinus,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  genre: string
  mood: string[]
  status: "Pending" | "Ranked" | "Finalized"
  rating: number
  submissionDate: string
  duration: string
  adminNotes: string
  ratedBy?: string
  audioUrl?: string
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "master_dev"
  joinDate: string
  lastActive: string
  totalSubmissions: number
}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Midnight Vibes",
    artist: "Jordan Davis",
    genre: "Hip-Hop",
    mood: ["Love", "Chill"],
    status: "Ranked",
    rating: 4,
    submissionDate: "2024-01-15",
    duration: "3:24",
    adminNotes: "Great production quality, commercial potential",
    ratedBy: "BIG Tank",
    audioUrl: "/audio/sample1.mp3",
  },
  {
    id: "2",
    title: "City Lights",
    artist: "Sarah Martinez",
    genre: "R&B",
    mood: ["Action", "Urban"],
    status: "Pending",
    rating: 0,
    submissionDate: "2024-01-20",
    duration: "4:12",
    adminNotes: "",
  },
  {
    id: "3",
    title: "Summer Dreams",
    artist: "Mike Thompson",
    genre: "Pop",
    mood: ["Love", "Happy"],
    status: "Finalized",
    rating: 5,
    submissionDate: "2024-01-10",
    duration: "3:45",
    adminNotes: "Perfect for sync placement - approved for shortlist",
    ratedBy: "Rockwilder",
  },
  {
    id: "4",
    title: "Underground Flow",
    artist: "Alex Rivera",
    genre: "Hip-Hop",
    mood: ["Action", "Intense"],
    status: "Ranked",
    rating: 3,
    submissionDate: "2024-01-18",
    duration: "2:58",
    adminNotes: "Good energy, needs mixing improvements",
    ratedBy: "Mr. Porter",
  },
  {
    id: "5",
    title: "Afro Fusion",
    artist: "Kemi Okafor",
    genre: "Afrobeat",
    mood: ["Dance", "Cultural"],
    status: "Pending",
    rating: 0,
    submissionDate: "2024-01-22",
    duration: "4:33",
    adminNotes: "",
  },
]

const mockUsers: AdminUser[] = [
  {
    id: "1",
    name: "Jordan Davis",
    email: "jordan@example.com",
    role: "user",
    joinDate: "2024-01-01",
    lastActive: "2024-01-22",
    totalSubmissions: 3,
  },
  {
    id: "2",
    name: "Sarah Martinez",
    email: "sarah@example.com",
    role: "admin",
    joinDate: "2023-12-15",
    lastActive: "2024-01-21",
    totalSubmissions: 8,
  },
  {
    id: "3",
    name: "Mike Thompson",
    email: "mike@example.com",
    role: "user",
    joinDate: "2024-01-10",
    lastActive: "2024-01-20",
    totalSubmissions: 1,
  },
]

export default function AdminPortal() {
  const [currentUser, setCurrentUser] = useState<{
    name: string
    email: string
    role: "user" | "admin" | "master_dev"
  } | null>(null)
  const [tracks, setTracks] = useState<Track[]>(mockTracks)
  const [users, setUsers] = useState<AdminUser[]>(mockUsers)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false)
  const [isPrivilegesDialogOpen, setIsPrivilegesDialogOpen] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null)
  const [privilegeAction, setPrivilegeAction] = useState<"grant" | "revoke">("grant")
  const [privilegeTarget, setPrivilegeTarget] = useState("")
  const [privilegeLoading, setPrivilegeLoading] = useState(false)
  const [privilegeMessage, setPrivilegeMessage] = useState("")
  const [privilegeError, setPrivilegeError] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Check authentication and admin access
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }

    const userData = {
      name: localStorage.getItem("userName") || "User",
      email: localStorage.getItem("userEmail") || "",
      role: (localStorage.getItem("userRole") as "user" | "admin" | "master_dev") || "user",
    }

    // Check for Master Developer status
    if (userData.email === "2668harris@gmail.com" || userData.email === "ipxsdev@gmail.com") {
      userData.role = "master_dev"
      localStorage.setItem("userRole", "master_dev")
    }

    // Check admin access
    if (userData.role !== "admin" && userData.role !== "master_dev") {
      alert("Access denied. Admin privileges required.")
      window.location.href = "/dashboard"
      return
    }

    setCurrentUser(userData)
  }, [])

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" ||
      (filter === "ranked" && track.rating > 0) ||
      (filter === "unranked" && track.rating === 0) ||
      (filter === "my-ranked" && track.ratedBy === "Current Admin")
    const matchesStatus = statusFilter === "all" || track.status.toLowerCase() === statusFilter

    return matchesSearch && matchesFilter && matchesStatus
  })

  const togglePlay = (trackId: string) => {
    if (isPlaying === trackId) {
      setIsPlaying(null)
    } else {
      setIsPlaying(trackId)
    }
  }

  const openReviewPanel = (track: Track) => {
    setSelectedTrack(track)
    setIsReviewPanelOpen(true)
  }

  const updateTrackRating = (trackId: string, rating: number) => {
    setTracks((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? { ...track, rating, ratedBy: "Current Admin", status: rating > 0 ? "Ranked" : "Pending" }
          : track,
      ),
    )
  }

  const updateTrackStatus = (trackId: string, status: "Pending" | "Ranked" | "Finalized") => {
    setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, status } : track)))
  }

  const updateTrackNotes = (trackId: string, notes: string) => {
    setTracks((prev) => prev.map((track) => (track.id === trackId ? { ...track, adminNotes: notes } : track)))
  }

  const handlePrivilegeAction = async () => {
    if (!privilegeTarget.trim()) {
      setPrivilegeError("Please enter an email or full name")
      return
    }

    setPrivilegeLoading(true)
    setPrivilegeError("")
    setPrivilegeMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Find user by email or name
      const targetUser = users.find(
        (user) =>
          user.email.toLowerCase() === privilegeTarget.toLowerCase() ||
          user.name.toLowerCase() === privilegeTarget.toLowerCase(),
      )

      if (!targetUser) {
        setPrivilegeError("User not found")
        return
      }

      // Check if trying to modify Master Developer
      if (
        targetUser.role === "master_dev" ||
        targetUser.email === "2668harris@gmail.com" ||
        targetUser.email === "ipxsdev@gmail.com"
      ) {
        setPrivilegeError("Cannot modify Master Developer privileges")
        return
      }

      // Update user role
      const newRole = privilegeAction === "grant" ? "admin" : "user"
      setUsers((prev) => prev.map((user) => (user.id === targetUser.id ? { ...user, role: newRole } : user)))

      setPrivilegeMessage(
        `Successfully ${privilegeAction === "grant" ? "granted" : "revoked"} admin privileges for ${targetUser.name}`,
      )
      setPrivilegeTarget("")

      setTimeout(() => {
        setPrivilegeMessage("")
      }, 3000)
    } catch (error) {
      setPrivilegeError("Failed to update privileges. Please try again.")
    } finally {
      setPrivilegeLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ranked":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Finalized":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master_dev":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Master Dev
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
            <Users className="w-3 h-3 mr-1" />
            User
          </Badge>
        )
    }
  }

  const syncYouTubeContent = async () => {
    // Simulate YouTube API sync
    console.log("Syncing YouTube content...")
    // In real implementation, this would fetch from YouTube API
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin portal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Header */}
      <div className="pt-20 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MBM Admin Portal
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleBadge(currentUser.role)}
                <span className="text-gray-300">Welcome, {currentUser.name}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Master Developer Privileges Console */}
              {currentUser.role === "master_dev" && (
                <Dialog open={isPrivilegesDialogOpen} onOpenChange={setIsPrivilegesDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                      <Crown className="w-4 h-4 mr-2" />
                      Admin Privileges Console
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white flex items-center">
                        <Crown className="w-5 h-5 mr-2 text-purple-400" />
                        Admin Privileges Console
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Grant or revoke admin privileges for users. Master Developer accounts cannot be modified.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Success/Error Messages */}
                      {privilegeMessage && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <p className="text-green-300 text-sm">{privilegeMessage}</p>
                        </div>
                      )}

                      {privilegeError && (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-300 text-sm">{privilegeError}</p>
                        </div>
                      )}

                      {/* Action Selection */}
                      <div>
                        <Label className="text-white mb-3 block">Action</Label>
                        <div className="flex space-x-3">
                          <Button
                            variant={privilegeAction === "grant" ? "default" : "outline"}
                            onClick={() => setPrivilegeAction("grant")}
                            className={
                              privilegeAction === "grant"
                                ? "bg-green-600 hover:bg-green-700"
                                : "border-gray-600 text-gray-300 bg-transparent"
                            }
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Grant Admin Access
                          </Button>
                          <Button
                            variant={privilegeAction === "revoke" ? "default" : "outline"}
                            onClick={() => setPrivilegeAction("revoke")}
                            className={
                              privilegeAction === "revoke"
                                ? "bg-red-600 hover:bg-red-700"
                                : "border-gray-600 text-gray-300 bg-transparent"
                            }
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            Revoke Admin Access
                          </Button>
                        </div>
                      </div>

                      {/* Target User Input */}
                      <div>
                        <Label htmlFor="privilege-target" className="text-white">
                          User Email or Full Name
                        </Label>
                        <Input
                          id="privilege-target"
                          placeholder="Enter email address or full name..."
                          value={privilegeTarget}
                          onChange={(e) => {
                            setPrivilegeTarget(e.target.value)
                            setPrivilegeError("")
                          }}
                          className="bg-gray-800 border-gray-600 text-white mt-2"
                        />
                      </div>

                      {/* Current Users List */}
                      <div>
                        <Label className="text-white mb-3 block">Current Users</Label>
                        <div className="bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                          <div className="space-y-2">
                            {users.map((user) => (
                              <div
                                key={user.id}
                                className="flex items-center justify-between p-2 bg-gray-700/50 rounded hover:bg-gray-700 transition-colors"
                              >
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-sm">{user.email}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getRoleBadge(user.role)}
                                  {(user.email === "2668harris@gmail.com" || user.email === "ipxsdev@gmail.com") && (
                                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                                      Protected
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsPrivilegesDialogOpen(false)}
                          className="border-gray-600 text-gray-300"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handlePrivilegeAction}
                          disabled={privilegeLoading || !privilegeTarget.trim()}
                          className={
                            privilegeAction === "grant"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }
                        >
                          {privilegeLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              {privilegeAction === "grant" ? (
                                <UserPlus className="w-4 h-4 mr-2" />
                              ) : (
                                <UserMinus className="w-4 h-4 mr-2" />
                              )}
                              {privilegeAction === "grant" ? "Grant Access" : "Revoke Access"}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Media Management
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Media Management</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Sync content from YouTube and manage media assets
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3">YouTube Channel Sync</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Youtube className="w-5 h-5 text-red-500" />
                            <span className="text-gray-300">@Themanbehindthemusicpodcast</span>
                          </div>
                          <Button size="sm" onClick={syncYouTubeContent} className="bg-red-600 hover:bg-red-700">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Sync
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-400">
                          <p>Latest Episodes:</p>
                          <ul className="space-y-1 ml-4">
                            <li>• Ep 1: https://www.youtube.com/watch?v=s_fqfPiJmb0&t=4s</li>
                            <li>• Ep 2: https://www.youtube.com/watch?v=VLeqmbdnAUs&t=3s</li>
                            <li>• Ep 3: https://www.youtube.com/watch?v=VjXv6SHHkEo</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="youtube-url" className="text-white">
                        Manual YouTube URL
                      </Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          id="youtube-url"
                          placeholder="Paste YouTube URL here..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Add</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                User Management
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tracks or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Tracks</SelectItem>
                <SelectItem value="ranked">Ranked</SelectItem>
                <SelectItem value="unranked">Unranked</SelectItem>
                <SelectItem value="my-ranked">My Ranked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="ranked">Ranked</SelectItem>
                <SelectItem value="finalized">Finalized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* iTunes-Style Track Table */}
        <Card className="bg-gray-900/30 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium w-12"></TableHead>
                  <TableHead className="text-gray-400 font-medium">Song</TableHead>
                  <TableHead className="text-gray-400 font-medium">Artist</TableHead>
                  <TableHead className="text-gray-400 font-medium">Genre</TableHead>
                  <TableHead className="text-gray-400 font-medium">Mood</TableHead>
                  <TableHead className="text-gray-400 font-medium">Status</TableHead>
                  <TableHead className="text-gray-400 font-medium">Rating</TableHead>
                  <TableHead className="text-gray-400 font-medium">Duration</TableHead>
                  <TableHead className="text-gray-400 font-medium w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTracks.map((track) => (
                  <TableRow
                    key={track.id}
                    className={`border-gray-700/50 hover:bg-gray-800/30 transition-all duration-200 cursor-pointer ${
                      hoveredTrack === track.id ? "transform translate-y-[-2px] shadow-lg" : ""
                    }`}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                    onClick={() => openReviewPanel(track)}
                  >
                    <TableCell className="p-3">
                      <div className="relative group">
                        <div
                          className={`w-12 h-12 rounded-lg overflow-hidden transition-transform duration-200 ${
                            hoveredTrack === track.id ? "transform scale-105 shadow-xl" : ""
                          }`}
                        >
                          <img
                            src="/images/holographic.png"
                            alt={track.title}
                            className={`w-full h-full object-cover transition-transform duration-1000 ${
                              isPlaying === track.id ? "animate-spin" : ""
                            }`}
                            style={{ animationDuration: "3s" }}
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute inset-0 w-12 h-12 rounded-lg bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation()
                            togglePlay(track.id)
                          }}
                        >
                          {isPlaying === track.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="p-3">
                      <div className="font-medium text-white">{track.title}</div>
                      <div className="text-sm text-gray-400">{track.submissionDate}</div>
                    </TableCell>

                    <TableCell className="p-3 text-gray-300">{track.artist}</TableCell>

                    <TableCell className="p-3 text-gray-300">{track.genre}</TableCell>

                    <TableCell className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {track.mood.map((mood, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                            {mood}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    <TableCell className="p-3">
                      <Badge className={getStatusColor(track.status)}>{track.status}</Badge>
                    </TableCell>

                    <TableCell className="p-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < track.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                    </TableCell>

                    <TableCell className="p-3 text-gray-300">{track.duration}</TableCell>

                    <TableCell className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Download functionality
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            // More options
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
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

      {/* Review Panel Dialog */}
      <Dialog open={isReviewPanelOpen} onOpenChange={setIsReviewPanelOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTrack && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-white text-2xl">{selectedTrack.title}</DialogTitle>
                    <DialogDescription className="text-gray-400 text-lg">by {selectedTrack.artist}</DialogDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReviewPanelOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Waveform Placeholder */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src="/images/holographic.png"
                        alt={selectedTrack.title}
                        className={`w-full h-full object-cover transition-transform duration-1000 ${
                          isPlaying === selectedTrack.id ? "animate-spin" : ""
                        }`}
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <Button
                          onClick={() => togglePlay(selectedTrack.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                          {isPlaying === selectedTrack.id ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Volume
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      {/* Waveform visualization placeholder */}
                      <div className="w-full h-16 bg-gray-700 rounded flex items-center justify-center">
                        <div className="flex items-end space-x-1">
                          {[...Array(50)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-sm"
                              style={{
                                height: `${Math.random() * 40 + 10}px`,
                                width: "3px",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating and Status Controls */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white mb-3 block">Rating</Label>
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="sm"
                          onClick={() => updateTrackRating(selectedTrack.id, i + 1)}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              i < selectedTrack.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600 hover:text-yellow-400"
                            }`}
                          />
                        </Button>
                      ))}
                      <span className="text-gray-400 ml-2">
                        {selectedTrack.rating > 0 ? `${selectedTrack.rating}/5` : "Not rated"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white mb-3 block">Status</Label>
                    <Select
                      value={selectedTrack.status}
                      onValueChange={(value: "Pending" | "Ranked" | "Finalized") =>
                        updateTrackStatus(selectedTrack.id, value)
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Ranked">Ranked</SelectItem>
                        <SelectItem value="Finalized">Finalized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <Label htmlFor="admin-notes" className="text-white mb-3 block">
                    Admin Notes
                  </Label>
                  <Textarea
                    id="admin-notes"
                    value={selectedTrack.adminNotes}
                    onChange={(e) => updateTrackNotes(selectedTrack.id, e.target.value)}
                    placeholder="Add your feedback and notes here..."
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                {/* Track Details */}
                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                  <div>
                    <Label className="text-gray-400 text-sm">Submission Date</Label>
                    <p className="text-white">{selectedTrack.submissionDate}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Duration</Label>
                    <p className="text-white">{selectedTrack.duration}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Rated By</Label>
                    <p className="text-white">{selectedTrack.ratedBy || "Not rated"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-700">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Artist
                  </Button>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsReviewPanelOpen(false)}
                      className="border-gray-600 text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
