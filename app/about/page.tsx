"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Award, Music, Users, TrendingUp, Play, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Grammy Nominations", value: "15+", icon: Award },
    { label: "Platinum Records", value: "50+", icon: Star },
    { label: "Artists Developed", value: "1000+", icon: Users },
    { label: "Years Experience", value: "25+", icon: TrendingUp },
  ]

  const founders = [
    {
      name: "BIG Tank",
      title: "Grammy-Nominated Producer & Co-Founder",
      image: "/images/big-tank.jpg",
      bio: "BIG Tank is a Grammy-nominated producer and songwriter who has worked with some of the biggest names in hip-hop and R&B. With over 15 years in the industry, he's produced tracks for Eminem, 50 Cent, and countless other platinum-selling artists. His signature sound blends hard-hitting drums with melodic elements that have defined modern hip-hop production.",
      achievements: [
        "Grammy nomination for Best Rap Album",
        "Over 20 million records sold worldwide",
        "Produced 5 Billboard #1 hits",
        "Worked with Eminem, 50 Cent, Dr. Dre",
      ],
      specialties: ["Hip-Hop Production", "Artist Development", "Mixing & Mastering", "A&R Services"],
      stats: { tracks: "500+", artists: "200+", years: "15+" },
    },
    {
      name: "DJ Rockwilder",
      title: "East Coast Hip-Hop Legend & Co-Founder",
      image: "/images/rockwilder.jpg",
      bio: "DJ Rockwilder is a legendary producer who helped define the sound of East Coast hip-hop in the late 90s and 2000s. Known for his work with Method Man & Redman, Jay-Z, and Christina Aguilera, his production style combines gritty street sounds with commercial appeal. He's been instrumental in launching careers and creating timeless hip-hop classics.",
      achievements: [
        "Produced Method Man & Redman's biggest hits",
        "Multi-platinum producer with Jay-Z collaborations",
        "Over 25 years of industry experience",
        "Pioneered the East Coast comeback sound",
      ],
      specialties: ["East Coast Hip-Hop", "Commercial Production", "Artist Branding", "Label Relations"],
      stats: { tracks: "800+", artists: "150+", years: "25+" },
    },
    {
      name: "Mr. Porter",
      title: "D12 Member & Detroit Hip-Hop Expert",
      image: "/images/mr-porter.png",
      bio: "Mr. Porter, a founding member of D12 and longtime collaborator with Eminem, brings authentic Detroit hip-hop expertise to MBM. His deep understanding of the industry from both artist and producer perspectives makes him invaluable for artist development. He's toured globally and understands what it takes to succeed in today's music landscape.",
      achievements: [
        "Founding member of platinum-selling group D12",
        "Extensive touring with Eminem and D12",
        "A&R experience with major labels",
        "Mentored dozens of emerging artists",
      ],
      specialties: ["Detroit Hip-Hop", "Performance Coaching", "A&R Services", "Industry Navigation"],
      stats: { tracks: "300+", artists: "100+", years: "20+" },
    },
  ]

  const timeline = [
    {
      year: "2019",
      title: "The Vision",
      description: "Three industry veterans recognize the gap between underground talent and elite opportunities",
    },
    {
      year: "2020",
      title: "Platform Development",
      description: "Building the technology to connect artists directly with music supervisors and A&Rs",
    },
    {
      year: "2021",
      title: "Beta Launch",
      description: "Invite-only beta with select artists and industry professionals",
    },
    {
      year: "2022",
      title: "First Major Placements",
      description: "Artists secure placements in Netflix originals and HBO productions",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      description: "MBM becomes the go-to platform for sync licensing professionals",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanding to serve artists and supervisors worldwide",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30">
              <Music className="w-4 h-4 mr-2" />
              About MBM
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Where Music Meets Opportunity
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              MBM connects independent artists with Grammy-nominated producers and industry professionals. Our platform
              provides the feedback, connections, and opportunities you need to take your music career to the next
              level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/signup")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-3 text-lg blue-glow"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/how-it-works")}
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg glass bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                How It Works
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
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

          {/* Our Story */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-300">The Vision</h3>
                  <p className="text-gray-300 mb-6">
                    MBM was founded on the belief that talented artists deserve direct access to industry professionals
                    who can help them succeed. Too many great artists never get heard because they lack the right
                    connections.
                  </p>
                  <p className="text-gray-300">
                    Our platform bridges that gap by connecting independent artists with Grammy-nominated producers, A&R
                    professionals, and industry veterans who provide real feedback and genuine opportunities.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                      <div className="text-2xl font-bold">95%</div>
                      <div className="text-sm text-gray-300">Artist Satisfaction</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
                    <CardContent className="p-4 text-center">
                      <Music className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <div className="text-2xl font-bold">10K+</div>
                      <div className="text-sm text-gray-300">Tracks Reviewed</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">From vision to reality - the evolution of MBM</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>

                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                      <Card className="glass border-gray-700">
                        <CardContent className="p-6">
                          <div className="text-2xl font-bold text-purple-400 mb-2">{item.year}</div>
                          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative z-10"></div>
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founder Profiles */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Founders</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Industry legends with decades of experience and countless platinum records
              </p>
            </div>

            <div className="space-y-16">
              {founders.map((founder, index) => (
                <div
                  key={founder.name}
                  className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
                >
                  {/* Founder Image */}
                  <div className="lg:w-1/3">
                    <div className="relative">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1">
                        <Image
                          src={founder.image || "/placeholder.svg"}
                          alt={founder.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Founder Info */}
                  <div className="lg:w-2/3 space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{founder.name}</h3>
                      <p className="text-purple-300 text-lg mb-4">{founder.title}</p>
                      <p className="text-gray-300 leading-relaxed">{founder.bio}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{founder.stats.tracks}</div>
                        <div className="text-sm text-gray-400">Tracks Produced</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">{founder.stats.artists}</div>
                        <div className="text-sm text-gray-400">Artists Worked With</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{founder.stats.years}</div>
                        <div className="text-sm text-gray-400">Years Experience</div>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-white">Key Achievements</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {founder.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-white">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {founder.specialties.map((specialty, i) => (
                          <Badge key={i} className="bg-gray-800 text-gray-300 border-gray-600">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="glass border-gray-700 bg-gradient-to-r from-gray-900/50 to-black/50">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Your Music Heard?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of artists who have already connected with industry professionals and taken their music
                  careers to the next level.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => (window.location.href = "/signup")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 px-8 py-3 text-lg blue-glow"
                  >
                    Start Your Journey
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
