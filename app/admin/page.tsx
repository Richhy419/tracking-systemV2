"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package2, Lock, User, ArrowRight } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // In a real app, you would validate credentials against a database
    // For demo purposes, we'll use a simple check with a simulated delay
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        router.push("/admin/dashboard")
      } else {
        setError("Invalid credentials. Try admin/password")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex-1 flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/80 z-10" />
          <Image
            src="/images/logistics-aerial-view.png"
            alt="Logistics network"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_70%)]" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Admin <span className="text-cyan-400">Portal</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Secure access to manage shipments, track deliveries, and oversee logistics operations.
              </p>

              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-cyan-500 p-3 rounded-full">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">Secure Admin Access</h3>
                      <p className="text-gray-300 text-sm">Protected with enterprise-grade security</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 p-3 rounded-full">
                      <Package2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">Complete Management</h3>
                      <p className="text-gray-300 text-sm">Full control over all shipments and operations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                  <div className="flex justify-center mb-2">
                    <div className="bg-navy-800 text-white h-16 w-16 rounded-2xl flex items-center justify-center">
                      <Package2 className="h-8 w-8 text-cyan-400" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-center text-navy-900">Admin Login</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access the admin dashboard
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-navy-800">
                        Username
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="h-5 w-5" />
                        </div>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-cyan-500"
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password" className="text-navy-800">
                          Password
                        </Label>
                        <Link href="#" className="text-sm text-cyan-600 hover:text-cyan-700">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Lock className="h-5 w-5" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-cyan-500"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full py-6 text-lg bg-navy-800 hover:bg-navy-900 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <>
                          Login to Dashboard
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>

                <div className="px-6 pb-6 text-center">
                  <p className="text-sm text-gray-500">Demo credentials: admin / password</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="bg-navy-100 p-3 rounded-lg">
                <Lock className="h-6 w-6 text-navy-800" />
              </div>
              <div>
                <h3 className="font-medium text-navy-900 mb-1">Secure Access</h3>
                <p className="text-gray-600 text-sm">
                  Enterprise-grade security with role-based permissions and audit logs.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                <Package2 className="h-6 w-6 text-cyan-800" />
              </div>
              <div>
                <h3 className="font-medium text-navy-900 mb-1">Shipment Management</h3>
                <p className="text-gray-600 text-sm">
                  Create, track, and manage all shipments from a centralized dashboard.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <ArrowRight className="h-6 w-6 text-orange-800" />
              </div>
              <div>
                <h3 className="font-medium text-navy-900 mb-1">Real-time Updates</h3>
                <p className="text-gray-600 text-sm">
                  Instantly update shipment status and notify customers automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
