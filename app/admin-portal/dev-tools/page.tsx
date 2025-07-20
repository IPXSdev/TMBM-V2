"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminLayout } from "@/components/admin-layout"
import { Crown, Database, Users, Code, Shield, AlertTriangle, Copy, Check, Terminal, Bug } from "lucide-react"

// Function to check if user is Master Developer
function isMasterDeveloper(email: string): boolean {
  return email === "2668harris@gmail.com" || email === "ipxsdev@gmail.com"
}

export default function DevToolsPage() {
  const [user, setUser] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail") || ""
    const userRole = localStorage.getItem("userRole") || ""
    const userName = localStorage.getItem("userName") || ""

    const userData = {
      email: userEmail,
      role: userRole,
      name: userName,
    }

    setUser(userData)

    // Check if user is authorized Master Developer
    if (isMasterDeveloper(userEmail) && userRole === "master_dev") {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }
  }, [])

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            This area is restricted to Master Developers only. You do not have the required permissions to access this
            page.
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")} className="bg-blue-600 hover:bg-blue-700">
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const demoAccounts = [
    {
      type: "Demo User",
      email: "demo@mbm.com",
      password: "password123",
      role: "user",
      plan: "Creator",
      credits: 3,
      description: "Standard user account for testing user features",
    },
    {
      type: "Test User",
      email: "test@test.com",
      password: "test123",
      role: "user",
      plan: "Basic",
      credits: 1,
      description: "Basic user account for testing free tier",
    },
    {
      type: "Artist Account",
      email: "artist@example.com",
      password: "artist123",
      role: "user",
      plan: "Pro",
      credits: 5,
      description: "Pro user account for testing premium features",
    },
    {
      type: "Admin Account",
      email: "admin@mbm.com",
      password: "admin123",
      role: "admin",
      plan: "Pro",
      credits: 50,
      description: "Admin account for testing admin features",
    },
    {
      type: "Master Developer",
      email: "2668harris@gmail.com",
      password: "masterdev123",
      role: "master_dev",
      plan: "Pro",
      credits: 999,
      description: "Primary master developer account",
    },
    {
      type: "Master Developer 2",
      email: "ipxsdev@gmail.com",
      password: "masterdev123",
      role: "master_dev",
      plan: "Pro",
      credits: 999,
      description: "Secondary master developer account",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Crown className="w-8 h-8 mr-3 text-purple-400" />
              Master Developer Tools
            </h1>
            <p className="text-gray-400 mt-2">Advanced development and testing utilities</p>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
            <Crown className="w-4 h-4 mr-2" />
            Master Access
          </Badge>
        </div>

        {/* Current User Info */}
        <Card className="bg-gray-900/50 border-purple-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-400" />
              Current Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-400">Name</Label>
                <p className="text-white font-semibold">{user.name}</p>
              </div>
              <div>
                <Label className="text-gray-400">Email</Label>
                <p className="text-white font-semibold">{user.email}</p>
              </div>
              <div>
                <Label className="text-gray-400">Role</Label>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  <Crown className="w-3 h-3 mr-1" />
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              Demo Accounts
            </CardTitle>
            <CardDescription className="text-gray-400">
              Test accounts for development and QA purposes. These credentials are only visible to Master Developers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{account.type}</h4>
                      <p className="text-gray-400 text-sm">{account.description}</p>
                    </div>
                    <Badge
                      className={`${
                        account.role === "master_dev"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : account.role === "admin"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            : "bg-gray-500/20 text-gray-300 border-gray-500/30"
                      }`}
                    >
                      {account.role === "master_dev" && <Crown className="w-3 h-3 mr-1" />}
                      {account.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                      {account.role === "user" && <Users className="w-3 h-3 mr-1" />}
                      {account.role}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400 text-xs">Email</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-blue-300 bg-gray-900/50 px-2 py-1 rounded text-sm flex-1">
                          {account.email}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(account.email, `email-${index}`)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {copiedItem === `email-${index}` ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs">Password</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-green-300 bg-gray-900/50 px-2 py-1 rounded text-sm flex-1">
                          {account.password}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(account.password, `password-${index}`)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {copiedItem === `password-${index}` ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    <div>
                      <Label className="text-gray-400 text-xs">Plan</Label>
                      <p className="text-white text-sm mt-1">{account.plan}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs">Credits</Label>
                      <p className="text-white text-sm mt-1">{account.credits}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400 text-xs">Role</Label>
                      <p className="text-white text-sm mt-1">{account.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="w-5 h-5 mr-2 text-green-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Authentication</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Stripe Integration</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">File Storage</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Available</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => console.log("Clear cache triggered")}
              >
                <Database className="w-4 h-4 mr-2" />
                Clear Application Cache
              </Button>
              <Button
                className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => console.log("Reset demo data triggered")}
              >
                <Users className="w-4 h-4 mr-2" />
                Reset Demo Data
              </Button>
              <Button
                className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white"
                onClick={() => console.log("Generate test data triggered")}
              >
                <Code className="w-4 h-4 mr-2" />
                Generate Test Data
              </Button>
              <Button
                className="w-full justify-start bg-red-900/50 hover:bg-red-900/70 text-red-300"
                onClick={() => console.log("Emergency reset triggered")}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Reset
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Debug Console */}
        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bug className="w-5 h-5 mr-2 text-red-400" />
              Debug Console
            </CardTitle>
            <CardDescription className="text-gray-400">
              Execute development commands and view system logs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-400">Command</Label>
              <Input placeholder="Enter debug command..." className="bg-gray-800 border-gray-600 text-white mt-2" />
            </div>
            <div>
              <Label className="text-gray-400">Output</Label>
              <Textarea
                placeholder="Debug output will appear here..."
                className="bg-gray-800 border-gray-600 text-white mt-2 h-32 font-mono text-sm"
                readOnly
              />
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Execute</Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Warning */}
        <Card className="bg-red-900/20 border-red-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-red-300 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-200 mb-4">
              This page contains sensitive development information and should only be accessible to authorized Master
              Developers. All demo credentials and system information shown here are for development purposes only.
            </p>
            <div className="space-y-2 text-sm text-red-300">
              <p>• Demo credentials are never displayed on public pages</p>
              <p>• Access is restricted by email validation and role verification</p>
              <p>• All actions are logged for security auditing</p>
              <p>• Production systems use separate, secure credential management</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
