"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Calendar, Users, Headphones, Star } from "lucide-react"

export default function PodcastPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Episodes" },
    { id: "interviews", name: "Interviews" },
    { id: "industry", name: "Industry Insights" },
    { id: "behind-scenes", name: "Behind the Scenes" },
    { id: "new-artists", name: "New Artists" },
  ]

  const featuredEpisodes = [
    {
      id: 1,
      title: "Big Tank: The Producer Behind the Hits",
      description:
        "An exclusive interview with Grammy-nominated producer Big Tank, discussing his journey from bedroom beats to chart-topping productions.",
      image: "/images/podcast-big-tank.png",
      duration: "45 min",
      date: "Dec 15, 2024",
      category: "interviews",
      featured: true,
      plays: "12.5K",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Breaking Into the Music Industry in 2024",
      description: "Industry veterans share their insights on what it takes to make it in today's music landscape.",
      image: "/images/podcast-coming-soon.png",
      duration: "38 min",
      date: "Dec 8, 2024",
      category: "industry",
      featured: false,
      plays: "8.2K",
      rating: 4.7,
    },
    {
      id: 3,
      title: "The Art of A&R: Finding Tomorrow's Stars",
      description: "A&R executives reveal their secrets for discovering and developing new talent in the digital age.",
      image: "/images/podcast-coming-soon.png",
      duration: "52 min",
      date: "Dec 1, 2024",
      category: "industry",
      featured: false,
      plays: "9.8K",
      rating: 4.8,
    },
  ]

  const upcomingEpisodes = [
    {
      title: "Sync Licensing: Getting Your Music in Film & TV",
      guest: "Top Sync Supervisor",
      date: "Dec 22, 2024",
      description: "Learn the insider secrets of music placement in media.",
    },
    {
      title: "Building Your Brand as an Independent Artist",
      guest: "Marketing Expert",
      date: "Dec 29, 2024",
      description: "Essential strategies for artist branding and fan engagement.",
    },
    {
      title: "The Future of Music Distribution",
      guest: "Industry Pioneer",
      date: "Jan 5, 2025",
      description: "Exploring new platforms and distribution methods.",
    },
  ]

  const filteredEpisodes =
    selectedCategory === "all"
      ? featuredEpisodes
      : featuredEpisodes.filter((episode) => episode.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              The Podcast
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Exclusive conversations with Grammy-nominated producers, A&Rs, and industry insiders. Get the real stories
              behind the music.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Listen Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 bg-transparent"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">50+</div>
              <div className="text-sm text-gray-400">Episodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">100K+</div>
              <div className="text-sm text-gray-400">Listeners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">4.8</div>
              <div className="text-sm text-gray-400">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">Weekly</div>
              <div className="text-sm text-gray-400">New Episodes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Episode</h2>
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <Image
                  src={featuredEpisodes[0].image || "/placeholder.svg"}
                  alt={featuredEpisodes[0].title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button size="lg" className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600">Featured</Badge>
              </div>
              <CardContent className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredEpisodes[0].duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredEpisodes[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {featuredEpisodes[0].plays} plays
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredEpisodes[0].title}</h3>
                <p className="text-gray-300 mb-6">{featuredEpisodes[0].description}</p>
                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Play className="mr-2 h-4 w-4" />
                    Play Episode
                  </Button>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{featuredEpisodes[0].rating}</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Episodes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.slice(1).map((episode) => (
              <Card
                key={episode.id}
                className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors group cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={episode.image || "/placeholder.svg"}
                    alt={episode.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-lg">
                    <Button size="sm" className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {episode.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {episode.plays}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{episode.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{episode.date}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs">{episode.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Episodes */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEpisodes.map((episode, index) => (
              <Card key={index} className="bg-black border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-purple-400">{episode.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{episode.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">with {episode.guest}</p>
                  <p className="text-sm text-gray-300">{episode.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to get notified when new episodes drop. Join thousands of music industry professionals who tune in
            weekly for exclusive insights and behind-the-scenes stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Listen On</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Spotify
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Apple Podcasts
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Google Podcasts
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  YouTube
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Interviews
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Industry Insights
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Behind the Scenes
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  New Artists
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Instagram
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Submit Feedback
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Advertise
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Man Behind The Music. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
