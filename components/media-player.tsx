"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

interface MediaPlayerProps {
  title: string
  artist: string
  rating?: number
  mood?: string
  status?: "Pending" | "Ranked" | "Finalized"
  audioSrc?: string
}

export function MediaPlayer({ title, artist, rating, mood, status = "Pending", audioSrc }: MediaPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setIsSpinning(false)
    })

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsSpinning(false)
    } else {
      audio.play()
      setIsSpinning(true)
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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

  return (
    <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {/* Holographic Record Player */}
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-full transition-transform duration-1000 ${
                isSpinning ? "animate-spin" : ""
              }`}
              style={{ animationDuration: "3s" }}
            >
              <img
                src="/images/holographic.png"
                alt="Holographic Record"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute inset-0 w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold truncate">{title}</h3>
              <div className="flex items-center space-x-2">
                {rating && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 rounded-full ${i < rating ? "bg-yellow-400" : "bg-gray-600"}`} />
                    ))}
                  </div>
                )}
                <Badge className={getStatusColor(status)}>{status}</Badge>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-2">{artist}</p>

            {mood && (
              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                {mood}
              </Badge>
            )}

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}
      </CardContent>
    </Card>
  )
}
