"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthDialog } from "@/components/auth-dialog"
import { useAuth } from "@/components/auth-provider"
import { Menu, X, Crown, Settings, Shield, LogOut } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const isMasterDev = user?.role === "master_dev" || user?.email === "2668harris@gmail.com"

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-bold text-xl">MBM</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/podcast" className="text-gray-300 hover:text-white transition-colors">
                Podcast
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>

                  {isMasterDev && (
                    <>
                      <Link
                        href="/admin-portal"
                        className="text-purple-300 hover:text-purple-200 transition-colors flex items-center"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Admin Portal
                      </Link>
                      <Link
                        href="/admin-portal/dev-tools"
                        className="text-pink-300 hover:text-pink-200 transition-colors flex items-center"
                      >
                        <Crown className="w-4 h-4 mr-1" />
                        Dev Tools
                      </Link>
                    </>
                  )}

                  <Link href="/profile" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <Settings className="w-4 h-4 mr-1" />
                    Profile
                  </Link>

                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{user.name}</span>
                    {isMasterDev && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Master Dev
                      </Badge>
                    )}
                  </div>

                  <Button onClick={handleLogout} variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="sm" className="text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/podcast" className="block text-gray-300 hover:text-white transition-colors">
                Podcast
              </Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>

              {user ? (
                <div className="space-y-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{user.name}</span>
                    {isMasterDev && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        <Crown className="w-3 h-3 mr-1" />
                        Master Dev
                      </Badge>
                    )}
                  </div>

                  <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors">
                    Dashboard
                  </Link>

                  {isMasterDev && (
                    <>
                      <Link
                        href="/admin-portal"
                        className="block text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        <Shield className="w-4 h-4 mr-1 inline" />
                        Admin Portal
                      </Link>
                      <Link
                        href="/admin-portal/dev-tools"
                        className="block text-pink-300 hover:text-pink-200 transition-colors"
                      >
                        <Crown className="w-4 h-4 mr-1 inline" />
                        Dev Tools
                      </Link>
                    </>
                  )}

                  <Link href="/profile" className="block text-gray-300 hover:text-white transition-colors">
                    <Settings className="w-4 h-4 mr-1 inline" />
                    Profile
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700">
                  <Button
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthDialog isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}
