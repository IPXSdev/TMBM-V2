"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  fullName: string
  plan: "Creator" | "Indie" | "Pro" | "Silver" | "Gold" | "Platinum"
  credits: number
  role: "user" | "admin" | "master_dev"
  artistName?: string
  genre?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    artistName: string
    genre: string
  }) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        console.log("=== RESTORED USER SESSION ===", userData)

        // Apply master developer privileges
        if (userData.email === "2668harris@gmail.com" || userData.email === "ipxsdev@gmail.com") {
          userData.role = "master_dev"
          userData.credits = 999 // Master developers always have 999 credits
        }

        setUser(userData)
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("=== LOGIN ATTEMPT ===")
    console.log("Email:", email)
    console.log("Password:", password)

    try {
      // Check for Master Developer accounts
      if ((email === "2668harris@gmail.com" || email === "ipxsdev@gmail.com") && password === "masterdev123") {
        const masterUser: User = {
          id: email === "2668harris@gmail.com" ? "will-harris-master" : "ipxs-master",
          email: email,
          fullName: email === "2668harris@gmail.com" ? "Will Harris" : "IPXS Developer",
          plan: "Creator",
          credits: 999, // Master developers always have 999 credits
          role: "master_dev",
          artistName: email === "2668harris@gmail.com" ? "Will Harris" : "IPXS",
          genre: "Hip-Hop",
        }

        console.log("=== MASTER DEV LOGIN SUCCESS ===", masterUser)
        setUser(masterUser)
        localStorage.setItem("user", JSON.stringify(masterUser))
        return true
      }

      // Check registered users from signup
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      console.log("Checking registered users:", registeredUsers)

      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userData: User = {
          id: foundUser.id,
          email: foundUser.email,
          fullName: foundUser.fullName,
          plan: foundUser.plan || "Creator",
          credits: foundUser.credits || 0, // New users start with 0 credits
          role: foundUser.role || "user",
          artistName: foundUser.artistName,
          genre: foundUser.genre,
        }

        console.log("=== REGISTERED USER LOGIN SUCCESS ===", userData)
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }

      console.log("=== LOGIN FAILED - No matching user found ===")
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const signup = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    artistName: string
    genre: string
  }): Promise<boolean> => {
    console.log("=== SIGNUP ATTEMPT ===")
    console.log("User data:", userData)

    try {
      // Check if email already exists
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      if (registeredUsers.some((u: any) => u.email === userData.email)) {
        console.log("=== SIGNUP FAILED - Email already exists ===")
        return false
      }

      // Create new user - all new users start on Creator plan with 0 credits
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        fullName: `${userData.firstName} ${userData.lastName}`,
        plan: "Creator", // Default plan for new users
        credits: 0, // New users start with 0 credits
        role: "user",
        artistName: userData.artistName,
        genre: userData.genre,
        createdAt: new Date().toISOString(),
      }

      // Save to registered users
      registeredUsers.push(newUser)
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      // Auto-login the new user
      const userForState: User = {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        plan: newUser.plan as "Creator",
        credits: newUser.credits,
        role: newUser.role as "user",
        artistName: newUser.artistName,
        genre: newUser.genre,
      }

      console.log("=== SIGNUP SUCCESS ===", userForState)
      setUser(userForState)
      localStorage.setItem("user", JSON.stringify(userForState))
      return true
    } catch (error) {
      console.error("Signup error:", error)
      return false
    }
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }

      // Ensure master developers always have 999 credits
      if (updatedUser.email === "2668harris@gmail.com" || updatedUser.email === "ipxsdev@gmail.com") {
        updatedUser.role = "master_dev"
        updatedUser.credits = 999
      }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      console.log("=== USER UPDATED ===", updatedUser)
    }
  }

  const logout = () => {
    console.log("=== LOGOUT ===")
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
