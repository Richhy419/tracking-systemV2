import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Update the generateTrackingNumber function to create more unique tracking numbers
export function generateTrackingNumber(): string {
  // Create a base tracking number with GFX prefix
  const prefix = "GFX"

  // Generate a timestamp component (current timestamp)
  const timestamp = Date.now().toString().slice(-10, -5)

  // Generate random digits for uniqueness
  const randomDigits = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")

  // Combine components to create a tracking number with embedded data
  return `${prefix}${timestamp}${randomDigits}`
}

// Function to check if a tracking number is valid
export function isValidTrackingNumber(trackingNumber: string): boolean {
  // Basic validation: starts with GFX and has the right length
  return trackingNumber.startsWith("GFX") && trackingNumber.length === 13
}

// Extract timestamp from tracking number (for sorting/ordering)
export function extractTimestampFromTracking(trackingNumber: string): number {
  if (!isValidTrackingNumber(trackingNumber)) return 0

  // Extract the timestamp portion (positions 3-8)
  const timestampPart = trackingNumber.substring(3, 8)
  return Number.parseInt(timestampPart, 10)
}
