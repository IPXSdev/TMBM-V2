"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Music, Menu, X, LogOut, Shield, Crown, Settings } from "lucide-react"
import { useAuth } from "./auth-provider"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Podcast", href: "/podcast" },
    { name: "Placements", href: "/placements" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master_dev":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <Crown className="w-3 h-3 mr-1" />
            Master Dev
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge
            className={`${
              user?.plan === "Pro"
                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                : user?.plan === "Creator"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  : "bg-gray-500/20 text-gray-300 border-gray-500/30"
            }`}
          >
            {user?.plan}
          </Badge>
        )
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Music className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            MBM
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-300 hover:text-white transition-colors">
              {item.name}
            </a>
          ))}

          {user ? (
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>

              {/* Admin Portal Link for Admins and Master Devs */}
              {(user.role === "admin" || user.role === "master_dev") && (
                <a href="/admin-portal" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Admin Portal
                </a>
              )}

              {/* Dev Tools Link for Master Devs Only */}
              {user.role === "master_dev" && (
                <a
                  href="/admin-portal/dev-tools"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Dev Tools
                </a>
              )}

              <a href="/profile" className="text-gray-300 hover:text-white transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-1" />
                Profile
              </a>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Menu className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{user.fullName}</span>
                </div>
                {getRoleBadge(user.role)}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {user ? (
              <>
                <a
                  href="/dashboard"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </a>

                {/* Admin Portal Link for Mobile */}
                {(user.role === "admin" || user.role === "master_dev") && (
                  <a
                    href="/admin-portal"
                    className="block text-gray-300 hover:text-white transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Portal
                  </a>
                )}

                {/* Dev Tools Link for Mobile */}
                {user.role === "master_dev" && (
                  <a
                    href="/admin-portal/dev-tools"
                    className="block text-gray-300 hover:text-white transition-colors py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Dev Tools
                  </a>
                )}

                <a
                  href="/profile"
                  className="block text-gray-300 hover:text-white transition-colors py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </a>

                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2 mb-3">
                    <Menu className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{user.fullName}</span>
                    {getRoleBadge(user.role)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
