"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"
import { Play, Pause, Music, TrendingUp, Users, Award, ArrowRight, Star } from "lucide-react"

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { user } = useAuth()

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      video.addEventListener("play", handlePlay)
      video.addEventListener("pause", handlePause)

      return () => {
        video.removeEventListener("play", handlePlay)
        video.removeEventListener("pause", handlePause)
      }
    }
  }, [])

  const stats = [
    { icon: Music, label: "Tracks Placed", value: "2,847" },
    { icon: TrendingUp, label: "Success Rate", value: "94%" },
    { icon: Users, label: "Active Artists", value: "1,200+" },
    { icon: Award, label: "Industry Awards", value: "15" },
  ]

  const recentPlacements = [
    {
      title: "Summer Vibes",
      artist: "DJ Rockwilder",
      placement: "Netflix Original Series",
      genre: "Hip-Hop",
      status: "Confirmed",
    },
    {
      title: "Big Tank Energy",
      artist: "Big Tank",
      placement: "HBO Max Documentary",
      genre: "Trap",
      status: "In Review",
    },
    {
      title: "Urban Dreams",
      artist: "Mr. Porter",
      placement: "Apple TV+ Commercial",
      genre: "R&B",
      status: "Confirmed",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-40" muted loop playsInline>
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Woody%20McClain%20GHOST%20-xWJ8TxkihVIvG3beofU9JWRYmufQbg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30">
            Premium Music Placement Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            The Music Behind the Music
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect your tracks with premium placements in film, TV, commercials, and digital content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {!user ? (
              <>
                <Button
                  onClick={() => setIsAuthOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
                  onClick={() => (window.location.href = "/about")}
                >
                  Learn More
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>

          <Button
            onClick={toggleVideo}
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"} Video
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Placements */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recent Success Stories</h2>
            <p className="text-gray-400 text-lg">Latest tracks placed in premium content</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPlacements.map((placement, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{placement.title}</h3>
                      <p className="text-gray-400">{placement.artist}</p>
                    </div>
                    <Badge
                      className={
                        placement.status === "Confirmed"
                          ? "bg-green-600/20 text-green-300 border-green-500/30"
                          : "bg-yellow-600/20 text-yellow-300 border-yellow-500/30"
                      }
                    >
                      {placement.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-gray-300">{placement.placement}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Music className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-gray-300">{placement.genre}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Place Your Music?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Join thousands of artists who trust TMBM for premium music placements
          </p>
          {!user && (
            <Button
              onClick={() => setIsAuthOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </section>

      <AuthDialog isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
