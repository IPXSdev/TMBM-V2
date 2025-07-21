"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"
import { Music, Menu, X, User, Settings, LogOut, Shield, Wrench, Crown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, logout } = useAuth()

  const handleAuthSuccess = () => {
    setShowAuthDialog(false)
  }

  const isAdmin = user?.role === "admin" || user?.role === "master_admin"
  const isMasterAdmin = user?.role === "master_admin"

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">MBM</span>
                <div className="text-xs text-gray-400">The Man Behind The Music</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/artists" className="text-gray-300 hover:text-white transition-colors">
                Artists
              </Link>
              {user && (
                <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Dashboard
                </Link>
              )}
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-white/10">
                        <User className="w-4 h-4" />
                        <span>{user.name}</span>
                        {isMasterAdmin && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 text-xs">
                            <Crown className="w-3 h-3 mr-1" />
                            Master
                          </Badge>
                        )}
                        {isAdmin && !isMasterAdmin && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                            Admin
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass border-gray-700">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2 text-white hover:bg-white/10">
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center space-x-2 text-white hover:bg-white/10">
                          <Settings className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem asChild>
                            <Link
                              href="/admin-portal"
                              className="flex items-center space-x-2 text-purple-300 hover:bg-white/10"
                            >
                              <Shield className="w-4 h-4" />
                              <span>Admin Portal</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      {isMasterAdmin && (
                        <DropdownMenuItem asChild>
                          <Link
                            href="/admin-portal/system"
                            className="flex items-center space-x-2 text-yellow-300 hover:bg-white/10"
                          >
                            <Wrench className="w-4 h-4" />
                            <span>System Admin</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        onClick={logout}
                        className="flex items-center space-x-2 text-red-300 hover:bg-white/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowAuthDialog(true)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowAuthDialog(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 blue-glow"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/artists"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Artists
                </Link>
                {user && (
                  <Link
                    href="/dashboard"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="pt-4 border-t border-gray-800">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{user.name}</span>
                        {isMasterAdmin && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 text-xs">
                            Master
                          </Badge>
                        )}
                        {isAdmin && !isMasterAdmin && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin-portal"
                          className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Portal</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center space-x-2 text-red-300 hover:text-red-200 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAuthDialog(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          setShowAuthDialog(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} onSuccess={handleAuthSuccess} />
    </>
  )
}
