"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Play,
  Music,
  Search,
  Filter,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  MapPin,
  Calendar,
  Headphones,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const featuredArtists = [
    {
      id: 1,
      name: "DJ Rockwilder",
      genre: "Hip-Hop",
      location: "New York, NY",
      image: "/images/rockwilder.jpg",
      rating: 4.9,
      tracks: 15,
      placements: 8,
      joinDate: "2022",
      bio: "East Coast hip-hop legend with over 25 years of industry experience",
      recentPlacement: "Netflix Original Series",
      verified: true,
      featured: true,
    },
    {
      id: 2,
      name: "Big Tank",
      genre: "Trap",
      location: "Atlanta, GA",
      image: "/images/big-tank.jpg",
      rating: 4.8,
      tracks: 22,
      placements: 12,
      joinDate: "2021",
      bio: "Grammy-nominated producer specializing in modern trap and hip-hop",
      recentPlacement: "HBO Max Documentary",
      verified: true,
      featured: true,
    },
    {
      id: 3,
      name: "Mr. Porter",
      genre: "R&B",
      location: "Detroit, MI",
      image: "/images/mr-porter.png",
      rating: 4.7,
      tracks: 18,
      placements: 6,
      joinDate: "2022",
      bio: "D12 member bringing authentic Detroit sound to sync placements",
      recentPlacement: "Apple TV+ Commercial",
      verified: true,
      featured: true,
    },
  ]

  const allArtists = [
    ...featuredArtists,
    {
      id: 4,
      name: "Luna Waves",
      genre: "Electronic",
      location: "Los Angeles, CA",
      image: "/placeholder.svg",
      rating: 4.6,
      tracks: 12,
      placements: 4,
      joinDate: "2023",
      bio: "Atmospheric electronic music perfect for cinematic moments",
      recentPlacement: "Indie Film Score",
      verified: false,
      featured: false,
    },
    {
      id: 5,
      name: "Urban Pulse",
      genre: "Hip-Hop",
      location: "Chicago, IL",
      image: "/placeholder.svg",
      rating: 4.5,
      tracks: 9,
      placements: 3,
      joinDate: "2023",
      bio: "Fresh Chicago sound with commercial appeal",
      recentPlacement: "Brand Commercial",
      verified: false,
      featured: false,
    },
    {
      id: 6,
      name: "Midnight Strings",
      genre: "Indie",
      location: "Nashville, TN",
      image: "/placeholder.svg",
      rating: 4.4,
      tracks: 14,
      placements: 5,
      joinDate: "2022",
      bio: "Indie folk with cinematic storytelling",
      recentPlacement: "Documentary Series",
      verified: false,
      featured: false,
    },
  ]

  const genres = ["all", "Hip-Hop", "R&B", "Electronic", "Indie", "Pop", "Rock", "Jazz", "Classical"]
  const locations = [
    "all",
    "New York, NY",
    "Los Angeles, CA",
    "Atlanta, GA",
    "Chicago, IL",
    "Nashville, TN",
    "Detroit, MI",
  ]

  const filteredArtists = allArtists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "all" || artist.genre === selectedGenre
    const matchesLocation = selectedLocation === "all" || artist.location === selectedLocation

    return matchesSearch && matchesGenre && matchesLocation
  })

  const stats = [
    { label: "Active Artists", value: "1,200+", icon: Users },
    { label: "Total Placements", value: "2,847", icon: Award },
    { label: "Avg Rating", value: "4.7", icon: Star },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Users className="w-4 h-4 mr-2" />
              Artist Showcase
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Discover Amazing Artists
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Explore our community of talented artists who are creating music for sync placements in film, TV, and
              digital content
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="glass border-gray-700 text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Artists */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Featured Artists</h2>
                <p className="text-gray-400">Industry professionals and top-rated artists</p>
              </div>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredArtists.map((artist, index) => (
                <Card
                  key={artist.id}
                  className="glass border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        {artist.verified && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Verified</Badge>
                        )}
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {artist.recentPlacement}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Music className="w-3 h-3 mr-1" />
                              {artist.genre}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {artist.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{artist.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{artist.bio}</p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{artist.tracks}</div>
                          <div className="text-xs text-gray-400">Tracks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{artist.placements}</div>
                          <div className="text-xs text-gray-400">Placements</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{artist.joinDate}</div>
                          <div className="text-xs text-gray-400">Joined</div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                        <Headphones className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <Card className="glass border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search artists by name or genre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="All Genres" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre === "all" ? "All Genres" : genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location === "all" ? "All Locations" : location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Artists Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">All Artists</h2>
                <p className="text-gray-400">
                  {filteredArtists.length} artist{filteredArtists.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 glass bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtists.map((artist) => (
                <Card
                  key={artist.id}
                  className="glass border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-white truncate">{artist.name}</h3>
                          {artist.verified && (
                            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-400 mb-2">
                          <span>{artist.genre}</span>
                          <span>•</span>
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{artist.rating}</span>
                          <span className="text-gray-400 text-sm">({artist.tracks} tracks)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{artist.bio}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">
                          <Award className="w-3 h-3 inline mr-1" />
                          {artist.placements} placements
                        </span>
                        <span className="text-gray-400">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Since {artist.joinDate}
                        </span>
                      </div>
                    </div>

                    {artist.recentPlacement && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4 text-xs">
                        Latest: {artist.recentPlacement}
                      </Badge>
                    )}

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                      >
                        View Profile
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No artists found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedGenre("all")
                    setSelectedLocation("all")
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 glass bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="glass border-gray-700 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Join Our Artist Community</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Ready to showcase your music and connect with industry professionals? Join thousands of artists who
                  are already building their careers through MBM.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8 py-3 text-lg blue-glow"
                  >
                    Become an Artist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/how-it-works")}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg glass bg-transparent"
                  >
                    Learn How It Works
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
