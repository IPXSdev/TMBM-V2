"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import {
  User,
  Globe,
  Instagram,
  Twitter,
  Music,
  Crown,
  Shield,
  UserPlus,
  UserMinus,
  Settings,
  Save,
  Eye,
  EyeOff,
} from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  plan: string
  credits: number
  role: "user" | "admin" | "master_dev"
  artistName?: string
  genre?: string
  bio?: string
  location?: string
  website?: string
  instagram?: string
  twitter?: string
  spotify?: string
  soundcloud?: string
  joinDate: string
  totalSubmissions: number
  totalCreditsUsed: number
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "master_dev"
  grantedBy: string
  grantedDate: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [grantEmail, setGrantEmail] = useState("")
  const [grantName, setGrantName] = useState("")
  const [revokeTarget, setRevokeTarget] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check authentication and load user data
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      window.location.href = "/login"
      return
    }

    const userData: UserProfile = {
      id: localStorage.getItem("userId") || "1",
      name: localStorage.getItem("userName") || "User",
      email: localStorage.getItem("userEmail") || "",
      plan: localStorage.getItem("userPlan") || "Basic",
      credits: Number.parseInt(localStorage.getItem("userCredits") || "1"),
      role: (localStorage.getItem("userRole") as "user" | "admin" | "master_dev") || "user",
      artistName: localStorage.getItem("userArtistName") || "",
      genre: localStorage.getItem("userGenre") || "",
      bio: localStorage.getItem("userBio") || "",
      location: localStorage.getItem("userLocation") || "",
      website: localStorage.getItem("userWebsite") || "",
      instagram: localStorage.getItem("userInstagram") || "",
      twitter: localStorage.getItem("userTwitter") || "",
      spotify: localStorage.getItem("userSpotify") || "",
      soundcloud: localStorage.getItem("userSoundcloud") || "",
      joinDate: localStorage.getItem("userJoinDate") || "2024-01-01",
      totalSubmissions: Number.parseInt(localStorage.getItem("userTotalSubmissions") || "0"),
      totalCreditsUsed: Number.parseInt(localStorage.getItem("userTotalCreditsUsed") || "0"),
    }

    // Check for Master Developer status
    if (userData.email === "2668harris@gmail.com" || userData.email === "ipxsdev@gmail.com") {
      userData.role = "master_dev"
      localStorage.setItem("userRole", "master_dev")
    }

    setUser(userData)

    // Load mock admin users for Master Developers
    if (userData.role === "master_dev") {
      setAdminUsers([
        {
          id: "admin1",
          name: "Admin User",
          email: "admin@mbm.com",
          role: "admin",
          grantedBy: "Master Developer",
          grantedDate: "2024-01-15",
        },
        {
          id: "admin2",
          name: "Content Reviewer",
          email: "reviewer@mbm.com",
          role: "admin",
          grantedBy: "2668harris@gmail.com",
          grantedDate: "2024-02-01",
        },
      ])
    }
  }, [])

  const handleSaveProfile = () => {
    if (!user) return

    // Save to localStorage
    localStorage.setItem("userName", user.name)
    localStorage.setItem("userArtistName", user.artistName || "")
    localStorage.setItem("userGenre", user.genre || "")
    localStorage.setItem("userBio", user.bio || "")
    localStorage.setItem("userLocation", user.location || "")
    localStorage.setItem("userWebsite", user.website || "")
    localStorage.setItem("userInstagram", user.instagram || "")
    localStorage.setItem("userTwitter", user.twitter || "")
    localStorage.setItem("userSpotify", user.spotify || "")
    localStorage.setItem("userSoundcloud", user.soundcloud || "")

    setIsEditing(false)
    setMessage("Profile updated successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters!")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    // Mock password change
    setNewPassword("")
    setConfirmPassword("")
    setMessage("Password changed successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleGrantAdmin = async () => {
    if (!grantEmail && !grantName) {
      setMessage("Please enter an email or full name!")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    setIsProcessing(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAdmin: AdminUser = {
        id: `admin_${Date.now()}`,
        name: grantName || "New Admin",
        email: grantEmail || "newadmin@mbm.com",
        role: "admin",
        grantedBy: user?.email || "Master Developer",
        grantedDate: new Date().toISOString().split("T")[0],
      }

      setAdminUsers([...adminUsers, newAdmin])
      setGrantEmail("")
      setGrantName("")
      setMessage(`Admin privileges granted to ${newAdmin.email}!`)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to grant admin privileges!")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRevokeAdmin = async () => {
    if (!revokeTarget) {
      setMessage("Please enter an email or name to revoke!")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    // Check if trying to revoke Master Developer
    if (revokeTarget === "2668harris@gmail.com" || revokeTarget === "ipxsdev@gmail.com") {
      setMessage("Cannot revoke Master Developer privileges!")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    setIsProcessing(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAdminUsers(adminUsers.filter((admin) => admin.email !== revokeTarget && admin.name !== revokeTarget))
      setRevokeTarget("")
      setMessage(`Admin privileges revoked from ${revokeTarget}!`)
      setTimeout(() => setMessage(""), 3000)
    } catch (error) {
      setMessage("Failed to revoke admin privileges!")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setIsProcessing(false)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master_dev":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Master Developer
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
            <User className="w-3 h-3 mr-1" />
            User
          </Badge>
        )
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                {getRoleBadge(user.role)}
              </div>
              <p className="text-xl text-gray-300">Manage your account and preferences</p>
            </div>

            {/* Message */}
            {message && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
                {message}
              </div>
            )}

            {/* Master Developer Privileges Panel */}
            {user.role === "master_dev" && (
              <Card className="mb-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Crown className="w-5 h-5 mr-2 text-purple-400" />
                    Master Developer Privileges Access Panel
                  </CardTitle>
                  <CardDescription className="text-purple-200">
                    Manage admin privileges for other users. Master Developer accounts cannot be revoked.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Admin Users */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Current Admin Users</h3>
                    <div className="space-y-3">
                      {adminUsers.map((admin) => (
                        <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-medium">{admin.name}</span>
                              {getRoleBadge(admin.role)}
                            </div>
                            <div className="text-sm text-gray-400">
                              {admin.email} • Granted by {admin.grantedBy} on {admin.grantedDate}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-purple-500/30" />

                  {/* Grant Admin Access */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Grant Admin Access</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="grant-email" className="text-purple-200">
                          Email Address
                        </Label>
                        <Input
                          id="grant-email"
                          type="email"
                          placeholder="user@example.com"
                          value={grantEmail}
                          onChange={(e) => setGrantEmail(e.target.value)}
                          className="bg-gray-800 border-purple-500/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="grant-name" className="text-purple-200">
                          Full Name
                        </Label>
                        <Input
                          id="grant-name"
                          placeholder="John Doe"
                          value={grantName}
                          onChange={(e) => setGrantName(e.target.value)}
                          className="bg-gray-800 border-purple-500/30 text-white"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleGrantAdmin}
                      disabled={isProcessing}
                      className="mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isProcessing ? "Granting..." : "Grant Admin Access"}
                    </Button>
                  </div>

                  <Separator className="bg-purple-500/30" />

                  {/* Revoke Admin Access */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Revoke Admin Access</h3>
                    <div>
                      <Label htmlFor="revoke-target" className="text-purple-200">
                        Email or Full Name
                      </Label>
                      <Input
                        id="revoke-target"
                        placeholder="user@example.com or John Doe"
                        value={revokeTarget}
                        onChange={(e) => setRevokeTarget(e.target.value)}
                        className="bg-gray-800 border-purple-500/30 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleRevokeAdmin}
                      disabled={isProcessing}
                      variant="outline"
                      className="mt-4 border-red-500/50 text-red-300 hover:bg-red-500/10 bg-transparent"
                    >
                      <UserMinus className="w-4 h-4 mr-2" />
                      {isProcessing ? "Revoking..." : "Revoke Admin Access"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Information */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Basic Information
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="border-gray-600 text-gray-300"
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      value={user.email}
                      disabled
                      className="bg-gray-800 border-gray-600 text-white opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="artist-name" className="text-gray-300">
                      Artist Name
                    </Label>
                    <Input
                      id="artist-name"
                      value={user.artistName || ""}
                      onChange={(e) => setUser({ ...user, artistName: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Your stage name"
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="genre" className="text-gray-300">
                      Primary Genre
                    </Label>
                    <Input
                      id="genre"
                      value={user.genre || ""}
                      onChange={(e) => setUser({ ...user, genre: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Hip-Hop, R&B, Pop, etc."
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={user.location || ""}
                      onChange={(e) => setUser({ ...user, location: e.target.value })}
                      disabled={!isEditing}
                      placeholder="City, State/Country"
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-gray-300">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={user.bio || ""}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself and your music..."
                      className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      rows={4}
                    />
                  </div>

                  {isEditing && (
                    <Button onClick={handleSaveProfile} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Account Details & Social Links */}
              <div className="space-y-8">
                {/* Account Details */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <Badge
                        className={`${
                          user.plan === "Pro"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : user.plan === "Creator"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                        }`}
                      >
                        {user.plan}
                      </Badge>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      {getRoleBadge(user.role)}
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits:</span>
                      <span className="text-green-400 font-semibold">{user.credits}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Member Since:</span>
                      <span className="text-white">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Submissions:</span>
                      <span className="text-white">{user.totalSubmissions}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits Used:</span>
                      <span className="text-white">{user.totalCreditsUsed}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Social Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="website" className="text-gray-300 flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={user.website || ""}
                        onChange={(e) => setUser({ ...user, website: e.target.value })}
                        disabled={!isEditing}
                        placeholder="https://yourwebsite.com"
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="instagram" className="text-gray-300 flex items-center">
                        <Instagram className="w-4 h-4 mr-1" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram"
                        value={user.instagram || ""}
                        onChange={(e) => setUser({ ...user, instagram: e.target.value })}
                        disabled={!isEditing}
                        placeholder="@yourusername"
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="twitter" className="text-gray-300 flex items-center">
                        <Twitter className="w-4 h-4 mr-1" />
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        value={user.twitter || ""}
                        onChange={(e) => setUser({ ...user, twitter: e.target.value })}
                        disabled={!isEditing}
                        placeholder="@yourusername"
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="spotify" className="text-gray-300 flex items-center">
                        <Music className="w-4 h-4 mr-1" />
                        Spotify
                      </Label>
                      <Input
                        id="spotify"
                        value={user.spotify || ""}
                        onChange={(e) => setUser({ ...user, spotify: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Spotify artist URL"
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="soundcloud" className="text-gray-300 flex items-center">
                        <Music className="w-4 h-4 mr-1" />
                        SoundCloud
                      </Label>
                      <Input
                        id="soundcloud"
                        value={user.soundcloud || ""}
                        onChange={(e) => setUser({ ...user, soundcloud: e.target.value })}
                        disabled={!isEditing}
                        placeholder="SoundCloud profile URL"
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-50"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Password Change */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="new-password" className="text-gray-300">
                        New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="bg-gray-800 border-gray-600 text-white pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirm-password" className="text-gray-300">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      disabled={!newPassword || !confirmPassword}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      Change Password
                    </Button>
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
