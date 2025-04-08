"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Package2,
  ArrowLeft,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedPulseLine } from "@/components/ui/animated-pulse-line"
import { MainNav } from "@/components/main-nav"
import { type Shipment, findShipmentByTracking } from "@/lib/demo-shipments"
import { isValidTrackingNumber } from "@/lib/utils"

export default function TrackingPage() {
  const searchParams = useSearchParams()
  const trackingParam = searchParams.get("trackingNumber")

  const [trackingNumber, setTrackingNumber] = useState(trackingParam || "")
  const [shipment, setShipment] = useState<Shipment | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState("tracking")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Search for shipment when component mounts if tracking number is in URL
  useEffect(() => {
    if (trackingParam) {
      handleSearch(trackingParam)
    }
  }, [trackingParam])

  // Update the handleSearch function to work better across devices
  const handleSearch = (tracking: string) => {
    setIsSearching(true)
    setNotFound(false)

    // Simulate network request
    setTimeout(() => {
      // Use the findShipmentByTracking function which works across devices
      const found = findShipmentByTracking(tracking)

      if (found) {
        setShipment(found)
      } else {
        // Check if it's a valid tracking number format
        if (isValidTrackingNumber(tracking)) {
          // It's a valid tracking number format but not found
          setNotFound(true)
          setShipment(null)
        } else {
          // Invalid tracking number format
          setNotFound(true)
          setShipment(null)
        }
      }

      setIsSearching(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber) {
      handleSearch(trackingNumber)
    }
  }

  // Function to share tracking link
  const handleShareTracking = () => {
    if (!shipment) return

    // Create a shareable URL
    const shareUrl = `${window.location.origin}/tracking?trackingNumber=${shipment.trackingNumber}`

    // Try to use the Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `Track shipment ${shipment.trackingNumber}`,
          text: `Track your shipment from ${shipment.senderName}`,
          url: shareUrl,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
          copyToClipboard(shareUrl)
        })
    } else {
      // Fallback to clipboard
      copyToClipboard(shareUrl)
    }
  }

  // Helper to copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      })
      .catch((err) => {
        console.error("Failed to copy:", err)
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand("copy")
          setShareSuccess(true)
          setTimeout(() => setShareSuccess(false), 3000)
        } catch (err) {
          console.error("Failed to copy with execCommand:", err)
        }
        document.body.removeChild(textArea)
      })
  }

  const getStatusIcon = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-6 w-6 text-blue-500" />
      case "dispatched":
        return <Truck className="h-6 w-6 text-orange-500" />
      case "out-for-delivery":
        return <MapPin className="h-6 w-6 text-purple-500" />
      case "on-hold":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />
    }
  }

  const getStatusText = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return "Processing"
      case "dispatched":
        return "Dispatched"
      case "out-for-delivery":
        return "Out for delivery"
      case "on-hold":
        return "On Hold"
      case "delivered":
        return "Delivered"
    }
  }

  const getStatusDescription = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return "Your package is being processed and prepared for shipping."
      case "dispatched":
        return "Your package has been dispatched from our facility."
      case "out-for-delivery":
        return "Your package is out for delivery to your address."
      case "on-hold":
        return "Your package is currently on hold. Contact support to fix your package issues."
      case "delivered":
        return "Your package has been delivered successfully."
    }
  }

  // Get progress percentage based on status
  const getProgressPercentage = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return "w-1/4"
      case "dispatched":
        return "w-2/4"
      case "out-for-delivery":
        return "w-3/4"
      case "on-hold":
        return "w-1/2"
      case "delivered":
        return "w-full"
    }
  }

  // Get progress color based on status
  const getProgressColor = (status: Shipment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-blue-500"
      case "dispatched":
        return "bg-orange-500"
      case "out-for-delivery":
        return "bg-purple-500"
      case "on-hold":
        return "bg-red-500"
      case "delivered":
        return "bg-green-500"
    }
  }

  // Image navigation
  const nextImage = () => {
    if (shipment && shipment.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === shipment.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (shipment && shipment.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? shipment.images.length - 1 : prevIndex - 1))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
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
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Track Your <span className="text-cyan-400">Shipment</span> in Real-Time
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Enter your tracking number below to get instant updates on your package's journey.
            </p>

            <div className="mb-12">
              <form onSubmit={handleSubmit} className="relative w-full transition-all duration-300 group max-w-2xl">
                <div className="flex items-center gap-2 rounded-xl overflow-hidden bg-white/90 backdrop-blur-md shadow-lg p-1.5">
                  <div className="flex-shrink-0 pl-3">
                    <Package2 className="h-6 w-6 text-navy-600" />
                  </div>

                  <Input
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg py-6"
                    placeholder="Enter your tracking number"
                    type="text"
                  />

                  <Button
                    type="submit"
                    disabled={isSearching}
                    className="flex-shrink-0 transition-all duration-300 bg-navy-800 hover:bg-navy-900 text-white py-6 px-8 text-base font-medium rounded-lg"
                  >
                    {isSearching ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <>
                        Track Shipment
                        <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="absolute -bottom-6 left-0 w-full flex justify-center">
                  <div className="text-xs text-gray-300 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    Example: Enter any GFX tracking number (e.g., GFX12345678)
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          {shipment && (
            <div className="mb-12">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-8">
                  <TabsList className="bg-white border border-gray-200">
                    <TabsTrigger
                      value="tracking"
                      className="data-[state=active]:bg-navy-800 data-[state=active]:text-white"
                    >
                      Tracking Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-navy-800 data-[state=active]:text-white"
                    >
                      Shipment History
                    </TabsTrigger>
                    <TabsTrigger
                      value="info"
                      className="data-[state=active]:bg-navy-800 data-[state=active]:text-white"
                    >
                      Package Information
                    </TabsTrigger>
                  </TabsList>

                  {/* Share Button */}
                  <Button onClick={handleShareTracking} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    <Share2 className="mr-2 h-4 w-4" />
                    {shareSuccess ? "Link Copied!" : "Share Tracking"}
                  </Button>
                </div>

                <TabsContent value="tracking">
                  <Card className="border-none shadow-lg">
                    <CardHeader className="bg-navy-800 text-white rounded-t-xl">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <CardTitle className="text-2xl">Tracking Number: {shipment.trackingNumber}</CardTitle>
                          <CardDescription className="text-gray-300 mt-1">
                            Shipped by: {shipment.senderName}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                          {getStatusIcon(shipment.status)}
                          <span className="font-medium">{getStatusText(shipment.status)}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                      <div className="mb-8">
                        <h3 className="text-lg font-medium text-navy-900 mb-4">Shipment Progress</h3>

                        <div className="mb-6">
                          <AnimatedPulseLine color="#06b6d4" height={40} />
                        </div>

                        {shipment.status === "on-hold" ? (
                          // On Hold Timeline
                          <div className="relative">
                            <div className="h-2 bg-gray-200 rounded-full mb-6">
                              <div className="h-2 rounded-full w-1/2 bg-red-500"></div>
                            </div>

                            <div className="flex justify-between mb-2">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                                  <Clock className="h-4 w-4" />
                                </div>
                                <span className="text-xs mt-1 font-medium">Processing</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white">
                                  <AlertCircle className="h-4 w-4" />
                                </div>
                                <span className="text-xs mt-1 font-medium">On Hold</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300">
                                  <CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-xs mt-1 text-gray-500">Delivered</span>
                              </div>
                            </div>

                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                              <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium text-red-700">Your package is currently on hold</p>
                                  <p className="text-sm text-red-600 mt-1">
                                    Contact our support team to resolve any issues with your shipment.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Normal Timeline
                          <div className="relative">
                            <div className="h-2 bg-gray-200 rounded-full mb-6">
                              <div
                                className={`h-2 rounded-full ${getProgressPercentage(shipment.status)} ${getProgressColor(shipment.status)}`}
                              ></div>
                            </div>

                            <div className="flex justify-between mb-2">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                    shipment.status === "pending" ||
                                    shipment.status === "dispatched" ||
                                    shipment.status === "out-for-delivery" ||
                                    shipment.status === "delivered"
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-300 text-white"
                                  }`}
                                >
                                  <Clock className="h-4 w-4" />
                                </div>
                                <span
                                  className={`text-xs mt-1 ${
                                    shipment.status === "pending" ||
                                    shipment.status === "dispatched" ||
                                    shipment.status === "out-for-delivery" ||
                                    shipment.status === "delivered"
                                      ? "font-medium"
                                      : "text-gray-500"
                                  }`}
                                >
                                  Processing
                                </span>
                              </div>

                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                    shipment.status === "dispatched" ||
                                    shipment.status === "out-for-delivery" ||
                                    shipment.status === "delivered"
                                      ? "bg-orange-500 text-white"
                                      : "bg-gray-300 text-white"
                                  }`}
                                >
                                  <Truck className="h-4 w-4" />
                                </div>
                                <span
                                  className={`text-xs mt-1 ${
                                    shipment.status === "dispatched" ||
                                    shipment.status === "out-for-delivery" ||
                                    shipment.status === "delivered"
                                      ? "font-medium"
                                      : "text-gray-500"
                                  }`}
                                >
                                  Dispatched
                                </span>
                              </div>

                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                    shipment.status === "out-for-delivery" || shipment.status === "delivered"
                                      ? "bg-purple-500 text-white"
                                      : "bg-gray-300 text-white"
                                  }`}
                                >
                                  <MapPin className="h-4 w-4" />
                                </div>
                                <span
                                  className={`text-xs mt-1 ${
                                    shipment.status === "out-for-delivery" || shipment.status === "delivered"
                                      ? "font-medium"
                                      : "text-gray-500"
                                  }`}
                                >
                                  Out for delivery
                                </span>
                              </div>

                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                    shipment.status === "delivered"
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-300 text-white"
                                  }`}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </div>
                                <span
                                  className={`text-xs mt-1 ${
                                    shipment.status === "delivered" ? "font-medium" : "text-gray-500"
                                  }`}
                                >
                                  Delivered
                                </span>
                              </div>
                            </div>

                            <div className="mt-6 p-4 bg-cyan-50 border border-cyan-100 rounded-lg">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`p-2 rounded-full ${
                                    shipment.status === "pending"
                                      ? "bg-blue-500"
                                      : shipment.status === "dispatched"
                                        ? "bg-orange-500"
                                        : shipment.status === "out-for-delivery"
                                          ? "bg-purple-500"
                                          : shipment.status === "delivered"
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                  } text-white`}
                                >
                                  {getStatusIcon(shipment.status)}
                                </div>
                                <div>
                                  <p className="font-medium text-navy-900">{getStatusText(shipment.status)}</p>
                                  <p className="text-sm text-gray-600 mt-1">{getStatusDescription(shipment.status)}</p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    Last updated: {new Date(shipment.updatedAt).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">RECIPIENT</h4>
                          <p className="font-medium text-navy-900">{shipment.customerName}</p>
                          <p className="text-gray-700 mt-1">{shipment.address}</p>
                          <p className="text-gray-700">{shipment.state}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <h4 className="text-sm font-medium text-gray-500 mb-2">SHIPMENT DETAILS</h4>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-700">
                              Created: {new Date(shipment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <p className="text-gray-700">Drop-off Location: {shipment.state}</p>
                          </div>
                        </div>
                      </div>

                      {/* Package Image Showcase - Only show if there are images - MOVED BELOW DELIVERY INFO */}
                      {shipment.images.length > 0 && (
                        <div className="mt-8">
                          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="p-4 bg-navy-800 text-white">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium flex items-center">
                                  <Camera className="mr-2 h-5 w-5" />
                                  Package Images
                                </h3>
                                <div className="text-sm text-gray-300">
                                  {currentImageIndex + 1} of {shipment.images.length}
                                </div>
                              </div>
                            </div>

                            {/* Improved image display for all devices */}
                            <div className="relative aspect-video md:aspect-[16/9] bg-gray-100 w-full">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={shipment.images[currentImageIndex] || "/placeholder.svg"}
                                alt={`Package image ${currentImageIndex + 1}`}
                                className="w-full h-full object-contain"
                                style={{ display: "block", maxHeight: "100%", maxWidth: "100%" }}
                              />

                              {shipment.images.length > 1 && (
                                <>
                                  <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                                    aria-label="Previous image"
                                  >
                                    <ChevronLeft className="h-5 w-5 text-navy-800" />
                                  </button>
                                  <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10"
                                    aria-label="Next image"
                                  >
                                    <ChevronRight className="h-5 w-5 text-navy-800" />
                                  </button>
                                </>
                              )}
                            </div>

                            {shipment.images.length > 1 && (
                              <div className="p-4 border-t border-gray-100 flex justify-center gap-2">
                                {shipment.images.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-3 h-3 rounded-full ${
                                      index === currentImageIndex ? "bg-navy-800" : "bg-gray-300"
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        \
