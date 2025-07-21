"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Upload,
  Search,
  TrendingUp,
  ArrowRight,
  Music,
  Star,
  MessageSquare,
  Award,
  CheckCircle,
  Film,
  Tv,
  Radio,
} from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      title: "Submit Your Music",
      description: "Upload your best tracks with detailed mood tags and context",
      icon: Upload,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Upload high-quality audio files (WAV, MP3, AIFF)",
        "Add mood tags (Uplifting, Action, Love, Urban, etc.)",
        "Provide track context and description",
        "Choose submission tier based on your plan",
      ],
      image: "/images/submit-music.jpg",
    },
    {
      step: "02",
      title: "Professional Review",
      description: "Industry professionals rate and provide detailed feedback",
      icon: Search,
      color: "from-purple-500 to-pink-500",
      details: [
        "Grammy-nominated producers review your tracks",
        "Detailed feedback on production, arrangement, and commercial appeal",
        "1-5 star rating system with written comments",
        "Sync placement potential assessment",
      ],
      image: "/images/review-process.jpg",
    },
    {
      step: "03",
      title: "Get Discovered",
      description: "Top-rated tracks get sync placement opportunities",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      details: [
        "High-rated tracks enter sync placement database",
        "Direct contact from music supervisors and A&Rs",
        "Placement opportunities in film, TV, and digital content",
        "Ongoing royalty and licensing opportunities",
      ],
      image: "/images/get-discovered.jpg",
    },
  ]

  const processFlow = [
    { title: "Artist Uploads Track", icon: Upload, color: "text-blue-400" },
    { title: "Quality Check", icon: CheckCircle, color: "text-green-400" },
    { title: "Professional Review", icon: Star, color: "text-yellow-400" },
    { title: "Feedback Delivered", icon: MessageSquare, color: "text-purple-400" },
    { title: "Sync Consideration", icon: Award, color: "text-orange-400" },
    { title: "Placement Success", icon: TrendingUp, color: "text-pink-400" },
  ]

  const placementTypes = [
    {
      title: "Film & TV",
      description: "Major motion pictures and television series",
      icon: Film,
      examples: ["Netflix Originals", "HBO Productions", "Disney+ Series", "Amazon Prime Content"],
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Commercials",
      description: "Brand campaigns and advertising content",
      icon: Tv,
      examples: ["Nike Campaigns", "Apple Commercials", "Coca-Cola Ads", "Automotive Spots"],
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Digital Content",
      description: "Streaming platforms and online media",
      icon: Radio,
      examples: ["YouTube Originals", "Podcast Intros", "Social Media Campaigns", "Gaming Content"],
      color: "from-green-500 to-cyan-500",
    },
  ]

  const successStories = [
    {
      artist: "DJ Rockwilder",
      track: "Summer Vibes",
      placement: "Netflix Original Series",
      rating: 4.8,
      quote: "MBM connected me with opportunities I never thought possible.",
    },
    {
      artist: "Big Tank",
      track: "Urban Dreams",
      placement: "HBO Max Documentary",
      rating: 4.9,
      quote: "The feedback helped me understand what supervisors are looking for.",
    },
    {
      artist: "Mr. Porter",
      track: "Midnight Flow",
      placement: "Apple TV+ Commercial",
      rating: 4.7,
      quote: "Professional platform with real industry connections.",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30">
              <Music className="w-4 h-4 mr-2" />
              How It Works
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Your Path to Success
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Three simple steps to get your music heard by industry professionals and secure sync placement
              opportunities
            </p>
            <Button
              onClick={() => (window.location.href = "/signup")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg blue-glow"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Main Steps */}
          <div className="mb-20">
            <div className="space-y-20">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
                >
                  {/* Step Content */}
                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center relative`}
                      >
                        <step.icon className="w-8 h-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                        <p className="text-gray-400 text-lg">{step.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Visual */}
                  <div className="lg:w-1/2">
                    <Card className="glass border-gray-700 overflow-hidden">
                      <CardContent className="p-0">
                        <div className={`h-64 bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                          <step.icon className="w-24 h-24 text-white opacity-50" />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Step {step.step}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Process Flow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Complete Process Flow</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                From submission to placement - here's exactly what happens to your music
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {processFlow.map((item, index) => (
                  <Card key={index} className="glass border-gray-700 relative">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      {index < processFlow.length - 1 && (
                        <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                          <ArrowRight className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Types */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Placement Opportunities</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Your music could be featured across various media platforms and campaigns
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {placementTypes.map((type, index) => (
                <Card
                  key={index}
                  className="glass border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}
                    >
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                    <p className="text-gray-400 mb-6">{type.description}</p>

                    <div className="space-y-2">
                      {type.examples.map((example, i) => (
                        <div key={i} className="flex items-center justify-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Real artists, real placements, real success through MBM</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="glass border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold">{story.track}</h3>
                        <p className="text-gray-400 text-sm">by {story.artist}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{story.rating}</span>
                      </div>
                    </div>

                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-4">{story.placement}</Badge>

                    <blockquote className="text-gray-300 italic">"{story.quote}"</blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "How long does the review process take?",
                  answer:
                    "Most tracks are reviewed within 5-7 business days. Pro plan members receive priority review within 2-3 business days.",
                },
                {
                  question: "What file formats do you accept?",
                  answer:
                    "We accept high-quality audio files including WAV, AIFF, and MP3 (320kbps minimum). WAV files are preferred for best quality assessment.",
                },
                {
                  question: "Do I retain ownership of my music?",
                  answer:
                    "Absolutely. You retain 100% ownership of your music. MBM only facilitates connections and placements - you keep all rights and royalties.",
                },
                {
                  question: "What happens if my track gets placed?",
                  answer:
                    "We'll connect you directly with the music supervisor or client. You'll negotiate terms directly and receive all placement fees and royalties.",
                },
                {
                  question: "Can I resubmit tracks that were previously reviewed?",
                  answer:
                    "Yes, if you've made significant improvements to a track, you can resubmit it. Each resubmission counts toward your monthly quota.",
                },
              ].map((faq, index) => (
                <Card key={index} className="glass border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="glass border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of artists who have already taken their music careers to the next level through MBM
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 text-lg blue-glow"
                  >
                    Submit Your Music
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/pricing")}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg glass bg-transparent"
                  >
                    View Pricing Plans
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
