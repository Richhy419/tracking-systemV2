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

// Create a new shipment
export const createShipment = (shipment: Shipment): void => {
  // Check if this tracking number already exists
  const existingIndex = GLOBAL_SHIPMENTS.findIndex((s) => s.trackingNumber === shipment.trackingNumber)

  if (existingIndex >= 0) {
    // Update existing shipment
    GLOBAL_SHIPMENTS[existingIndex] = {
      ...shipment,
      updatedAt: new Date(),
    }
  } else {
    // Add new shipment
    GLOBAL_SHIPMENTS.push({
      ...shipment,
      updatedAt: new Date(),
      isDeleted: false,
    })
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

// Mark a shipment as deleted
export const deleteShipment = (trackingNumber: string): void => {
  const shipmentIndex = GLOBAL_SHIPMENTS.findIndex((s) => s.trackingNumber === trackingNumber)

  if (shipmentIndex >= 0) {
    // Instead of actually removing it, mark it as deleted
    GLOBAL_SHIPMENTS[shipmentIndex].isDeleted = true
    GLOBAL_SHIPMENTS[shipmentIndex].updatedAt = new Date()
  }
}

// Get all active (non-deleted) shipments
export const getActiveShipments = (): Shipment[] => {
  return GLOBAL_SHIPMENTS.filter((s) => !s.isDeleted)
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
