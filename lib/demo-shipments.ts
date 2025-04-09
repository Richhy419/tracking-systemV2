// Create a true cross-device tracking system using URL-based persistence

export interface Shipment {
  id: string
  trackingNumber: string
  senderName: string
  customerName: string
  address: string
  state: string
  status: "pending" | "dispatched" | "out-for-delivery" | "on-hold" | "delivered"
  description: string
  images: string[]
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
}

// Instead of using localStorage, we'll use a global variable to simulate a database
// This will be reset on page refresh, but we'll persist it in the URL for the tracking page
let GLOBAL_SHIPMENTS: Shipment[] = []

// Initialize with some demo data if empty
const initializeDemoData = () => {
  if (GLOBAL_SHIPMENTS.length === 0) {
    // Add a demo shipment
    GLOBAL_SHIPMENTS.push({
      id: "demo1",
      trackingNumber: "GFX12345678",
      senderName: "GrantFlow Express",
      customerName: "John Doe",
      address: "123 Main St, Anytown, USA",
      state: "California",
      status: "dispatched",
      description: "Package containing electronics and books",
      images: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    })
  }
}

// Initialize demo data
initializeDemoData()

// Modify the createShipment function to handle image size limits and prevent quota exceeded errors
export const createShipment = (shipment: Shipment): void => {
  try {
    // Check if this tracking number already exists
    const existingIndex = GLOBAL_SHIPMENTS.findIndex((s) => s.trackingNumber === shipment.trackingNumber)

    // Process images to reduce storage size if needed
    let processedImages = [...shipment.images]

    // If images exceed a certain size, limit them
    if (processedImages.length > 3) {
      processedImages = processedImages.slice(0, 3) // Limit to 3 images max
    }

    // Check total size of all images to prevent quota issues
    let totalSize = 0
    processedImages.forEach((img) => {
      // Rough estimate of base64 string size
      totalSize += img.length * 0.75 // base64 is ~4/3 the size of the actual data
    })

    // If total size exceeds 1MB (arbitrary limit), reduce quality or remove images
    const ONE_MB = 1024 * 1024
    if (totalSize > ONE_MB) {
      // Simple approach: just keep the first image if total size is too large
      processedImages = processedImages.length > 0 ? [processedImages[0]] : []
    }

    const shipmentToSave = {
      ...shipment,
      images: processedImages,
      updatedAt: new Date(),
      isDeleted: false,
    }

    if (existingIndex >= 0) {
      // Update existing shipment
      GLOBAL_SHIPMENTS[existingIndex] = shipmentToSave
    } else {
      // Add new shipment
      GLOBAL_SHIPMENTS.push(shipmentToSave)
    }
  } catch (error) {
    console.error("Error creating shipment:", error)
    throw new Error("Failed to create shipment. Storage quota may be exceeded.")
  }
}

// Find a shipment by tracking number
export const findShipmentByTracking = (trackingNumber: string): Shipment | null => {
  const shipment = GLOBAL_SHIPMENTS.find((s) => s.trackingNumber === trackingNumber && !s.isDeleted)
  return shipment || null
}

// Update a shipment's status
export const updateShipmentStatus = (trackingNumber: string, newStatus: Shipment["status"]): void => {
  const shipmentIndex = GLOBAL_SHIPMENTS.findIndex((s) => s.trackingNumber === trackingNumber && !s.isDeleted)

  if (shipmentIndex >= 0) {
    GLOBAL_SHIPMENTS[shipmentIndex].status = newStatus
    GLOBAL_SHIPMENTS[shipmentIndex].updatedAt = new Date()
  }
}

// Fix the deleteShipment function to properly delete shipments
export const deleteShipment = (trackingNumber: string): void => {
  const shipmentIndex = GLOBAL_SHIPMENTS.findIndex((s) => s.trackingNumber === trackingNumber)

  if (shipmentIndex >= 0) {
    // Mark as deleted and update timestamp
    GLOBAL_SHIPMENTS[shipmentIndex].isDeleted = true
    GLOBAL_SHIPMENTS[shipmentIndex].updatedAt = new Date()
    console.log(`Shipment ${trackingNumber} marked as deleted successfully`)
  } else {
    console.warn(`Attempted to delete shipment ${trackingNumber} that doesn't exist`)
  }
}

// Also improve getActiveShipments to ensure it only returns non-deleted shipments
export const getActiveShipments = (): Shipment[] => {
  const active = GLOBAL_SHIPMENTS.filter((s) => s.isDeleted !== true)
  console.log(`Found ${active.length} active shipments out of ${GLOBAL_SHIPMENTS.length} total`)
  return active
}

// Clear all shipments (for admin use)
export const clearAllShipments = (): void => {
  GLOBAL_SHIPMENTS = []
  initializeDemoData()
}

// Export the shipments for direct access (for demo purposes)
export const getAllShipments = (): Shipment[] => {
  return [...GLOBAL_SHIPMENTS]
}

// Import shipments (for demo purposes)
export const importShipments = (shipments: Shipment[]): void => {
  GLOBAL_SHIPMENTS = [...shipments]
}

// Fix the URL encoding/decoding functions to be more reliable

// Encode shipments to a string for URL sharing
export const encodeShipmentsToString = (): string => {
  try {
    // Convert dates to strings before encoding
    const shipmentsToEncode = GLOBAL_SHIPMENTS.map((shipment) => ({
      ...shipment,
      createdAt: shipment.createdAt.toISOString(),
      updatedAt: shipment.updatedAt.toISOString(),
    }))

    const shipmentsJson = JSON.stringify(shipmentsToEncode)
    // Use encodeURIComponent instead of btoa for better compatibility
    return encodeURIComponent(shipmentsJson)
  } catch (error) {
    console.error("Error encoding shipments:", error)
    return ""
  }
}

// Decode shipments from a string
export const decodeShipmentsFromString = (encoded: string): Shipment[] => {
  try {
    // Use decodeURIComponent instead of atob for better compatibility
    const shipmentsJson = decodeURIComponent(encoded)
    const shipments = JSON.parse(shipmentsJson)

    // Convert string dates back to Date objects
    return shipments.map((s: any) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
    }))
  } catch (error) {
    console.error("Error decoding shipments:", error)
    return []
  }
}

// Get a shareable admin URL with all shipments encoded
export const getShareableAdminUrl = (): string => {
  if (typeof window === "undefined") return ""

  const encoded = encodeShipmentsToString()
  // Make sure the URL is properly formatted
  const baseUrl = window.location.origin
  const path = "/admin/dashboard"
  const url = `${baseUrl}${path}?data=${encoded}`

  // Log the URL length to help debug if it's too long
  console.log("Shareable URL length:", url.length)

  return url
}

// Check if a shipment exists
export const shipmentExists = (trackingNumber: string): boolean => {
  return findShipmentByTracking(trackingNumber) !== null
}

// Get shipment count
export const getShipmentCount = (): number => {
  return getActiveShipments().length
}

// Get shipments by status
export const getShipmentsByStatus = (status: Shipment["status"]): Shipment[] => {
  const allShipments = getActiveShipments()
  return allShipments.filter((s) => s.status === status)
}