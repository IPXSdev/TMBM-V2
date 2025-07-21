"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  artistName?: string
  genre?: string
  plan: "basic" | "creator" | "pro"
  role: "user" | "admin" | "master_admin"
  submissions: number
  submissionsUsed: number
  avatar?: string
  bio?: string
  socialLinks?: {
    soundcloud?: string
    spotify?: string
    instagram?: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (data: SignupData) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
  isLoading: boolean
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  artistName: string
  genre: string
  inviteCode?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("mbm_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("mbm_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Master admin account
      if (email === "admin@themanbehindthemusic.app" && password === "masteradmin123") {
        const masterUser: User = {
          id: "master_admin_001",
          name: "Master Admin",
          email: "admin@themanbehindthemusic.app",
          plan: "pro",
          role: "master_admin",
          submissions: 999,
          submissionsUsed: 0,
        }
        setUser(masterUser)
        localStorage.setItem("mbm_user", JSON.stringify(masterUser))
        return true
      }

      // Demo admin accounts
      if (email.includes("admin") && password === "admin123") {
        const adminUser: User = {
          id: `admin_${Date.now()}`,
          name: "Admin User",
          email: email,
          plan: "pro",
          role: "admin",
          submissions: 50,
          submissionsUsed: 0,
        }
        setUser(adminUser)
        localStorage.setItem("mbm_user", JSON.stringify(adminUser))
        return true
      }

      // Regular user login - demo mode
      const demoUser: User = {
        id: `user_${Date.now()}`,
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
        plan: "basic",
        role: "user",
        submissions: 1,
        submissionsUsed: 0,
      }

      setUser(demoUser)
      localStorage.setItem("mbm_user", JSON.stringify(demoUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        artistName: data.artistName,
        genre: data.genre,
        plan: "basic",
        role: "user",
        submissions: 1,
        submissionsUsed: 0,
      }

      setUser(newUser)
      localStorage.setItem("mbm_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("mbm_user")
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("mbm_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
