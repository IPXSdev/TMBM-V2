"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"
import { Play, Pause, Music, Star, ArrowRight, Upload, Search, TrendingUp, Headphones, Mic, Radio } from "lucide-react"

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

  const howItWorksSteps = [
    {
      step: "01",
      title: "Submit Your Music",
      description: "Upload your best tracks with mood tags and context",
      icon: Upload,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      title: "Get Reviewed",
      description: "Industry professionals rate and provide feedback",
      icon: Search,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "03",
      title: "Get Discovered",
      description: "Top tracks get sync placement opportunities",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
    },
  ]

  const testimonials = [
    {
      quote: "MBM connected me with opportunities I never thought possible. My track is now in a Netflix series.",
      artist: "DJ Rockwilder",
      genre: "Hip-Hop Producer",
      avatar: "/images/rockwilder.jpg",
    },
    {
      quote: "The feedback from industry professionals helped me elevate my sound to the next level.",
      artist: "Big Tank",
      genre: "Trap Artist",
      avatar: "/images/big-tank.jpg",
    },
    {
      quote: "Professional platform with real industry connections. This is the future of music discovery.",
      artist: "Mr. Porter",
      genre: "R&B Producer",
      avatar: "/images/mr-porter.png",
    },
  ]

  const pricingTiers = [
    {
      name: "Basic",
      price: "Free",
      submissions: "1/month",
      features: ["1 submission per month", "Basic feedback", "Community access", "Track status updates"],
      cta: "Get Started Free",
      popular: false,
      color: "border-gray-700",
    },
    {
      name: "Creator",
      price: "$19.99",
      submissions: "3/month",
      features: [
        "3 submissions per month",
        "Detailed feedback",
        "Priority review queue",
        "Sync opportunity alerts",
        "Direct messaging",
      ],
      cta: "Start Creating",
      popular: true,
      color: "border-blue-500",
    },
    {
      name: "Pro",
      price: "$24.99",
      submissions: "5/month",
      features: [
        "5 submissions per month",
        "Premium feedback",
        "Priority sync consideration",
        "A&R direct contact",
        "Advanced analytics",
        "Exclusive opportunities",
      ],
      cta: "Go Pro",
      popular: false,
      color: "border-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          muted
          loop
          playsInline
          autoPlay
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Woody%20McClain%20GHOST%20-xWJ8TxkihVIvG3beofU9JWRYmufQbg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Animated waveform background */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="waveform-bar bg-gradient-to-t from-blue-500 to-purple-500 w-2"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${Math.random() * 100 + 20}px`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 text-lg px-6 py-2">
            Where Sound Meets Opportunity
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            The Man Behind
            <br />
            The Music
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Elite music submission platform connecting underground talent to sync placement opportunities in film, TV,
            and digital content.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {!user ? (
              <>
                <Button
                  onClick={() => setIsAuthOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg blue-glow"
                >
                  Submit Your Music
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg glass bg-transparent"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  View Pricing
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
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
            className="text-white/70 hover:text-white hover:bg-white/10 glass"
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? "Pause" : "Play"} Studio Sessions
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to get your music heard by industry professionals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div
                    className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Artist Success Stories</h2>
            <p className="text-xl text-gray-400">Hear from artists who've elevated their careers through MBM</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="glass border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.artist}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.artist}</h4>
                      <p className="text-gray-400">{testimonial.genre}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-300 text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select the perfect plan to accelerate your music career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`glass ${tier.color} relative ${tier.popular ? "scale-105" : ""}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    {tier.price !== "Free" && <span className="text-gray-400">/month</span>}
                  </div>
                  <p className="text-blue-400 mb-6 text-lg">{tier.submissions}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" : "bg-gray-700 hover:bg-gray-600"} text-white`}
                    onClick={() => (!user ? setIsAuthOpen(true) : (window.location.href = "/pricing"))}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submission Packs */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">Need Extra Submissions?</h3>
              <p className="text-gray-400">One-time submission packs for additional uploads</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Silver", price: "$4.99", submissions: "+1", color: "from-gray-400 to-gray-600" },
                {
                  name: "Gold",
                  price: "$9.99",
                  submissions: "+2",
                  color: "from-yellow-400 to-orange-500",
                  popular: true,
                },
                { name: "Platinum", price: "$14.99", submissions: "+4", color: "from-purple-400 to-pink-500" },
              ].map((pack, index) => (
                <Card key={index} className={`glass border-gray-700 ${pack.popular ? "border-yellow-500" : ""}`}>
                  {pack.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gold-gradient text-black">
                      Best Value
                    </Badge>
                  )}
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${pack.color} flex items-center justify-center mb-4`}
                    >
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{pack.name} Pack</h4>
                    <div className="text-2xl font-bold text-white mb-2">{pack.price}</div>
                    <p className="text-gray-400 mb-4">{pack.submissions} submissions</p>
                    <Button
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                      onClick={() => (!user ? setIsAuthOpen(true) : (window.location.href = "/pricing"))}
                    >
                      Buy {pack.name} Pack
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Meet The Founders</h2>
            <p className="text-xl text-gray-400">Industry legends behind the platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Big Tank",
                role: "Co-Founder & A&R",
                bio: "Grammy-nominated producer with over 20 years in the industry",
                image: "/images/big-tank.jpg",
                icon: Mic,
              },
              {
                name: "Mr. Porter",
                role: "Co-Founder & Music Supervisor",
                bio: "Award-winning music supervisor for major film and TV productions",
                image: "/images/mr-porter.png",
                icon: Headphones,
              },
              {
                name: "DJ Rockwilder",
                role: "Co-Founder & Creative Director",
                bio: "Legendary hip-hop producer and industry tastemaker",
                image: "/images/rockwilder.jpg",
                icon: Radio,
              },
            ].map((founder, index) => (
              <Card
                key={index}
                className="glass border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={founder.image || "/placeholder.svg"}
                      alt={founder.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <founder.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{founder.name}</h3>
                  <p className="text-blue-400 mb-4">{founder.role}</p>
                  <p className="text-gray-400 leading-relaxed">{founder.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Get Discovered?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of artists who trust MBM to connect them with elite sync placement opportunities
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => setIsAuthOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg blue-glow"
              >
                Submit Your Music Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg glass bg-transparent"
                onClick={() => setIsAuthOpen(true)}
              >
                Sign Up Free
              </Button>
            </div>
          )}
        </div>
      </section>

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  )
}
