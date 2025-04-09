"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package2, Plus, LogOut, Eye, Truck, Clock, AlertCircle, X, Trash2, Search, RefreshCw, Database, Share2, Copy } from 'lucide-react'
import { generateTrackingNumber, isValidTrackingNumber } from "@/lib/utils"
import {
  type Shipment,
  getActiveShipments,
  createShipment,
  findShipmentByTracking,
  updateShipmentStatus,
  deleteShipment,
  clearAllShipments,
  decodeShipmentsFromString,
  importShipments,
  getShareableAdminUrl,
} from "@/lib/demo-shipments"

export default function AdminDashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dataParam = searchParams.get("data")

  const [activeTab, setActiveTab] = useState("shipments")
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [searchTrackingNumber, setSearchTrackingNumber] = useState("")
  const [searchResults, setSearchResults] = useState<Shipment[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const [shareSuccess, setShareSuccess] = useState(false)

  // New shipment form state
  const [newShipment, setNewShipment] = useState({
    senderName: "GrantFlow Express",
    customerName: "",
    address: "",
    state: "",
    status: "pending" as Shipment["status"],
    description: "",
    images: [] as string[],
  })

  // Load shipments on component mount
  useEffect(() => {
    // If there's data in the URL, import it
    if (dataParam) {
      try {
        const importedShipments = decodeShipmentsFromString(dataParam)
        if (importedShipments.length > 0) {
          importShipments(importedShipments)
          console.log("Successfully imported", importedShipments.length, "shipments from URL")
        }
      } catch (error) {
        console.error("Error importing shipments from URL:", error)
        alert("There was an error importing shipments from the URL. Please try again.")
      }
    }

    loadShipments()

    // Generate shareable URL
    setShareUrl(getShareableAdminUrl())
  }, [dataParam])

  // Function to load shipments
  const loadShipments = () => {
    try {
      const activeShipments = getActiveShipments()
      setShipments(activeShipments)

      // Update shareable URL
      setShareUrl(getShareableAdminUrl())
    } catch (error) {
      console.error("Error loading shipments:", error)
    }
  }

  // Manual refresh function
  const handleRefresh = () => {
    setIsRefreshing(true)
    loadShipments()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleLogout = () => {
    router.push("/admin")
  }

  // Function to copy shareable URL
  const copyShareableUrl = () => {
    // Create a more reliable shareable URL
    const shareableUrl = getShareableAdminUrl()
    setShareUrl(shareableUrl)

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        setShareSuccess(true)
        console.log("Copied URL:", shareableUrl)
        alert("URL copied to clipboard! Share this exact URL with others to view the same shipments.")
        setTimeout(() => setShareSuccess(false), 3000)
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err)
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = shareableUrl
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand("copy")
          setShareSuccess(true)
          alert("URL copied to clipboard! Share this exact URL with others to view the same shipments.")
          setTimeout(() => setShareSuccess(false), 3000)
        } catch (err) {
          console.error("Failed to copy with execCommand:", err)
          alert("Could not copy URL automatically. Please copy this URL manually:\n\n" + shareableUrl)
        }
        document.body.removeChild(textArea)
      })
  }

  // Update the handleImageUpload function to resize images before storing them
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Limit to max 3 images
      const maxImages = 3
      const remainingSlots = maxImages - newShipment.images.length

      if (remainingSlots <= 0) {
        alert("Maximum 3 images allowed per shipment")
        return
      }

      const filesToProcess = Array.from(e.target.files).slice(0, remainingSlots)
      const newImages = [...newShipment.images]

      // Process each file with stricter size limits
      filesToProcess.forEach((file) => {
        // Reduce max file size to 300KB (from 500KB)
        if (file.size > 300 * 1024) {
          alert(`Image "${file.name}" is too large. Please use images under 300KB`)
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            // Add the image to our array
            newImages.push(event.target.result as string)
            setNewShipment({
              ...newShipment,
              images: newImages,
            })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  // Also update the handleCreateShipment function to handle potential errors
  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault()

    const trackingNumber = generateTrackingNumber()

    const newShipmentData: Shipment = {
      id: Date.now().toString(),
      trackingNumber,
      senderName: newShipment.senderName || "GrantFlow Express",
      customerName: newShipment.customerName,
      address: newShipment.address,
      state: newShipment.state,
      status: newShipment.status,
      description: newShipment.description,
      images: newShipment.images,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    }

    try {
      // Add to global registry
      createShipment(newShipmentData)

      // Refresh the shipments list
      loadShipments()

      // Reset form
      setNewShipment({
        senderName: "GrantFlow Express",
        customerName: "",
        address: "",
        state: "",
        status: "pending",
        description: "",
        images: [],
      })

      // Switch to shipments tab
      setActiveTab("shipments")

      alert(`Shipment created successfully! Tracking number: ${trackingNumber}`)
    } catch (error) {
      // Improved error handling
      const errorMessage = error instanceof Error ? error.message : "Error creating shipment. Please try again."
      alert(errorMessage)
      console.error("Error:", error)
    }
  }

  // Delete a shipment
  const handleDeleteShipment = (trackingNumber: string) => {
    if (confirm("Are you sure you want to delete this shipment?")) {
      try {
        // Call the delete function
        deleteShipment(trackingNumber)

        // Reload the shipments list to update the UI
        loadShipments()

        // Show success message
        alert(`Shipment ${trackingNumber} deleted successfully`)
      } catch (error) {
        console.error("Error deleting shipment:", error)
        alert("Failed to delete shipment. Please try again.")
      }
    }
  }

  // Clear all shipments
  const handleClearAllShipments = () => {
    if (confirm("Are you sure you want to delete ALL shipment history? This cannot be undone.")) {
      clearAllShipments()
      setShipments([])

      // Update shareable URL
      setShareUrl(getShareableAdminUrl())
    }
  }

  // Update a shipment's status
  const handleStatusChange = (trackingNumber: string, newStatus: Shipment["status"]) => {
    updateShipmentStatus(trackingNumber, newStatus)
    loadShipments()
  }

  // Search for a shipment by tracking number
  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTrackingNumber.trim()) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate network request
    setTimeout(() => {
      if (isValidTrackingNumber(searchTrackingNumber)) {
        const foundShipment = findShipmentByTracking(searchTrackingNumber)
        if (foundShipment) {
          setSearchResults([foundShipment])
        }
      }

      setIsSearching(false)
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-navy-900 text-white">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg">
              <Package2 className="h-6 w-6 text-cyan-400" />
            </div>
            <span className="text-xl font-semibold">GrantFlow Express Admin</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="text-white hover:text-cyan-400">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-8 relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <Image src="/images/logistics-aerial-view.png" alt="Tracking map background" fill className="object-cover" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-navy-900">Shipment Management</h1>
              <div className="ml-4 flex items-center bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm">
                <Database className="h-4 w-4 mr-1" />
                <span>Demo Database</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyShareableUrl} className="bg-navy-800 hover:bg-navy-900 text-white">
                {shareSuccess ? (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    URL Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Admin View
                  </>
                )}
              </Button>
              <Button onClick={handleRefresh} disabled={isRefreshing} className="bg-cyan-600 hover:bg-cyan-700">
                {isRefreshing ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-medium text-amber-800 mb-2">Cross-Device Demo Mode</h3>
            <p className="text-amber-700 text-sm mb-2">
              To simulate cross-device functionality, use the "Share Admin View" button to copy a URL that contains all
              current shipment data. You can paste this URL in another browser or device to see the same shipment data.
            </p>
            <p className="text-amber-700 text-sm">
              Note: In a real application, this would be handled by a database, but for this demo we're using URL-based
              data sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/80 text-sm">Total Shipments</p>
                    <p className="text-3xl font-bold">{shipments.length}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Package2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/80 text-sm">Delivered</p>
                    <p className="text-3xl font-bold">{shipments.filter((s) => s.status === "delivered").length}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Truck className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/80 text-sm">In Transit</p>
                    <p className="text-3xl font-bold">
                      {shipments.filter((s) => s.status === "dispatched" || s.status === "out-for-delivery").length}
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white/80 text-sm">On Hold</p>
                    <p className="text-3xl font-bold">{shipments.filter((s) => s.status === "on-hold").length}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search for tracking numbers */}
          <Card className="mb-6 border-none shadow-lg">
            <CardHeader className="bg-cyan-600 text-white rounded-t-xl">
              <CardTitle>Shipment Search</CardTitle>
              <CardDescription className="text-white/80">
                Search for any tracking number to view or manage shipments
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSearchTracking} className="flex gap-2">
                <Input
                  value={searchTrackingNumber}
                  onChange={(e) => setSearchTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., GFX1234567)"
                  className="flex-1"
                />
                <Button type="submit" className="bg-navy-800 hover:bg-navy-900" disabled={isSearching}>
                  {isSearching ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </form>

              {searchResults.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Search Results</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tracking #</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                            <TableCell>{shipment.customerName}</TableCell>
                            <TableCell>
                              <Select
                                value={shipment.status}
                                onValueChange={(value) =>
                                  handleStatusChange(shipment.trackingNumber, value as Shipment["status"])
                                }
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Processing ⏳</SelectItem>
                                  <SelectItem value="dispatched">Dispatched 🚛</SelectItem>
                                  <SelectItem value="out-for-delivery">Out for delivery 🚚</SelectItem>
                                  <SelectItem value="on-hold">On Hold ⚠️</SelectItem>
                                  <SelectItem value="delivered">Delivered ✅</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                                >
                                  <Link href={`/tracking?trackingNumber=${shipment.trackingNumber}`} target="_blank">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Link>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger
                  value="shipments"
                  className="data-[state=active]:bg-navy-800 data-[state=active]:text-white"
                >
                  Shipments
                </TabsTrigger>
                <TabsTrigger value="create" className="data-[state=active]:bg-navy-800 data-[state=active]:text-white">
                  Create New
                </TabsTrigger>
              </TabsList>

              {/* Clear All Shipments Button */}
              <Button variant="destructive" onClick={handleClearAllShipments} className="bg-red-600 hover:bg-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Shipments
              </Button>
            </div>

            <TabsContent value="shipments">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-navy-800 text-white rounded-t-xl">
                  <CardTitle>All Shipments</CardTitle>
                  <CardDescription className="text-gray-300">
                    <span className="font-medium text-white">Demo shipment database:</span> Share the URL to view these
                    shipments on another device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {shipments.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No shipments yet. Create your first shipment or search for an existing tracking number.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tracking #</TableHead>
                            <TableHead>Sender</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shipments.map((shipment) => (
                            <TableRow key={shipment.id}>
                              <TableCell className="font-medium">{shipment.trackingNumber}</TableCell>
                              <TableCell>{shipment.senderName}</TableCell>
                              <TableCell>{shipment.customerName}</TableCell>
                              <TableCell>{shipment.state}</TableCell>
                              <TableCell>
                                <Select
                                  value={shipment.status}
                                  onValueChange={(value) =>
                                    handleStatusChange(shipment.trackingNumber, value as Shipment["status"])
                                  }
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Processing ⏳</SelectItem>
                                    <SelectItem value="dispatched">Dispatched 🚛</SelectItem>
                                    <SelectItem value="out-for-delivery">Out for delivery 🚚</SelectItem>
                                    <SelectItem value="on-hold">On Hold ⚠️</SelectItem>
                                    <SelectItem value="delivered">Delivered ✅</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>{new Date(shipment.createdAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50"
                                  >
                                    <Link href={`/tracking?trackingNumber=${shipment.trackingNumber}`} target="_blank">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteShipment(shipment.trackingNumber)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-navy-800 text-white rounded-t-xl">
                  <CardTitle>Create New Shipment</CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter the details to create a new tracking number.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateShipment}>
                  <CardContent className="space-y-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Sender Name</Label>
                        <Input
                          id="senderName"
                          value={newShipment.senderName}
                          onChange={(e) => setNewShipment({ ...newShipment, senderName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                          id="customerName"
                          value={newShipment.customerName}
                          onChange={(e) => setNewShipment({ ...newShipment, customerName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Textarea
                        id="address"
                        value={newShipment.address}
                        onChange={(e) => setNewShipment({ ...newShipment, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={newShipment.state}
                        onChange={(e) => setNewShipment({ ...newShipment, state: e.target.value })}
                        placeholder="e.g. Lagos, New York, Ontario"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newShipment.status}
                        onValueChange={(value) =>
                          setNewShipment({
                            ...newShipment,
                            status: value as Shipment["status"],
                          })
                        }
                      >
                        <SelectTrigger id="status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Processing ⏳</SelectItem>
                          <SelectItem value="dispatched">Dispatched 🚛</SelectItem>
                          <SelectItem value="out-for-delivery">Out for delivery 🚚</SelectItem>
                          <SelectItem value="on-hold">On Hold ⚠️</SelectItem>
                          <SelectItem value="delivered">Delivered ✅</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Item Description</Label>
                      <Textarea
                        id="description"
                        value={newShipment.description}
                        onChange={(e) => setNewShipment({ ...newShipment, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="images">Upload Images</Label>
                      <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} />

                      {newShipment.images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                          {newShipment.images.map((image, index) => (
                            <div key={index} className="relative aspect-square">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Shipment & Generate Tracking
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 bg-navy-900 text-white">
        <div className="container px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} GrantFlow Express Admin. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
