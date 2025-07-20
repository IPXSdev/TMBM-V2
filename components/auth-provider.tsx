"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  plan: string
  role: "user" | "admin" | "master_dev"
  credits: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("mbm_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        console.log("Restored user from localStorage:", userData)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("mbm_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", { email })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for Master Dev credentials (private)
      if (email === "2668harris@gmail.com" && password === "masterdev123") {
        const userData: User = {
          id: "user_harris_2668",
          email: "2668harris@gmail.com",
          name: "Will Harris",
          plan: "Master Developer",
          role: "master_dev",
          credits: 999999,
        }
        console.log("Master Dev login successful:", userData)
        setUser(userData)
        localStorage.setItem("mbm_user", JSON.stringify(userData))
        return true
      }

      // Demo mode - all other accounts start as Creator (free)
      if (email && password) {
        const userData: User = {
          id: `user_${Date.now()}`,
          email,
          name: email.split("@")[0],
          plan: "Creator",
          role: "user",
          credits: 0,
        }
        console.log("Demo login successful (Creator account):", userData)
        setUser(userData)
        localStorage.setItem("mbm_user", JSON.stringify(userData))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (email: string, password: string, name?: string) => {
    console.log("Signup attempt:", { email, name })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // All new accounts start as Creator (free)
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        name: name || email.split("@")[0],
        plan: "Creator",
        role: "user",
        credits: 0,
      }
      console.log("Signup successful (Creator account):", userData)
      setUser(userData)
      localStorage.setItem("mbm_user", JSON.stringify(userData))
    } catch (error) {
      console.error("Signup error:", error)
      throw new Error("Signup failed. Please try again.")
    }
  }

  const logout = () => {
    console.log("User logged out")
    setUser(null)
    localStorage.removeItem("mbm_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
