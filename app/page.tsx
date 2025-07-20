"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/components/auth-provider"
import {
  Play,
  Star,
  Users,
  TrendingUp,
  Music,
  Headphones,
  Award,
  ArrowRight,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])

  const toggleMute = () => {
    setIsVideoMuted(!isVideoMuted)
  }

  const handleWatchPodcast = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  const handleGetStarted = () => {
    if (user) {
      window.location.href = "/dashboard"
    } else {
      window.location.href = "/signup"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Woody%20McClain%20GHOST%20-xWJ8TxkihVIvG3beofU9JWRYmufQbg.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <Badge className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
            <Star className="w-4 h-4 mr-2" />
            Grammy-Nominated Producers
          </Badge>

          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Get Your Music Heard by Industry Legends
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Submit your tracks to Grammy-nominated producers like{" "}
            <span className="text-yellow-400 font-semibold">BIG Tank</span>,{" "}
            <span className="text-blue-400 font-semibold">Rockwilder</span>, and{" "}
            <span className="text-purple-400 font-semibold">Mr. Porter</span>. Get professional feedback and sync
            placement opportunities.
          </p>

          {/* Hero Buttons - Only Two Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              onClick={handleWatchPodcast}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-8 py-6 shadow-2xl"
            >
              <Play className="w-6 h-6 mr-3" />
              Watch Podcast
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>

            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-2xl"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>

          {/* Video Controls - Only Mute Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="bg-black/50 border-white/20 text-white hover:bg-white/10"
            >
              {isVideoMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
              {isVideoMuted ? "Unmute" : "Mute"}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-300">Artists Placed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">50M+</div>
              <div className="text-gray-300">Streams Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-400">100+</div>
              <div className="text-gray-300">TV/Film Placements</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-400">15+</div>
              <div className="text-gray-300">Grammy Nominations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Producers */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30">
              <Award className="w-4 h-4 mr-2" />
              Industry Legends
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Meet Our Producers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get your music reviewed by the same producers who've worked with Eminem, 50 Cent, Jay-Z, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* BIG Tank */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img src="/images/big-tank.jpg" alt="BIG Tank" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">BIG Tank</h3>
                <p className="text-blue-400 mb-4">Grammy-Nominated Producer</p>
                <p className="text-gray-300 mb-6">
                  Worked with Eminem, 50 Cent, and countless other hip-hop legends. Known for his signature sound and
                  industry expertise.
                </p>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1" />
                  Grammy Nominated
                </Badge>
              </CardContent>
            </Card>

            {/* Rockwilder */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img src="/images/rockwilder.jpg" alt="Rockwilder" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Rockwilder</h3>
                <p className="text-purple-400 mb-4">Legendary Producer</p>
                <p className="text-gray-300 mb-6">
                  Multi-platinum producer behind hits for Jay-Z, Method Man, and Redman. A true pioneer in hip-hop
                  production.
                </p>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Award className="w-3 h-3 mr-1" />
                  Multi-Platinum
                </Badge>
              </CardContent>
            </Card>

            {/* Mr. Porter */}
            <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img src="/images/mr-porter.png" alt="Mr. Porter" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mr. Porter</h3>
                <p className="text-green-400 mb-4">D12 Producer</p>
                <p className="text-gray-300 mb-6">
                  Member of D12 and longtime collaborator with Eminem. Brings decades of industry experience and
                  insight.
                </p>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Users className="w-3 h-3 mr-1" />
                  D12 Member
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get your music in front of industry professionals in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1. Submit Your Track</h3>
              <p className="text-gray-300">
                Upload your best work with track details and any specific requests for feedback or placement
                opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2. Professional Review</h3>
              <p className="text-gray-300">
                Our Grammy-nominated producers listen to your track and provide detailed feedback on production,
                arrangement, and commercial potential.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3. Get Placed</h3>
              <p className="text-gray-300">
                Top-rated tracks get featured for sync opportunities in TV, film, commercials, and streaming playlists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 border-red-500/30">
                  <Play className="w-4 h-4 mr-2" />
                  Weekly Podcast
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Behind the Beats</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join our producers every week as they break down hit records, share industry insights, and review
                  submitted tracks live on air.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Live track reviews and feedback</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Industry stories and behind-the-scenes content</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Guest appearances from major artists</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={handleWatchPodcast}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Latest Episode
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="relative">
                <img src="/images/podcast-coming-soon.png" alt="Podcast Studio" className="rounded-2xl shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Get Your Music Heard?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of artists who have already discovered new opportunities through MBM. Start your journey
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6"
            >
              {user ? "Go to Dashboard" : "Get Started Free"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = "/pricing")}
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
