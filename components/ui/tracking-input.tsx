"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Package2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TrackingInputProps {
  variant?: "default" | "hero" | "minimal"
  placeholder?: string
  buttonText?: string
  showIcon?: boolean
}

export function TrackingInput({
  variant = "default",
  placeholder = "Enter your tracking number",
  buttonText = "Track",
  showIcon = true,
}: TrackingInputProps) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      try {
        router.push(`/tracking?trackingNumber=${trackingNumber.trim()}`)
      } catch (error) {
        alert("Your browser storage is full. Some features may not work correctly.")
        console.error("Storage error:", error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        relative w-full transition-all duration-300 group
        ${variant === "hero" ? "max-w-full md:max-w-2xl" : "max-w-md"}
        ${isFocused ? "scale-[1.02]" : "scale-100"}
      `}
    >
      <div
        className={`
        flex items-center gap-2 rounded-xl overflow-hidden
        ${
          variant === "hero"
            ? "bg-white/90 backdrop-blur-md shadow-lg p-1.5"
            : variant === "minimal"
              ? "bg-white border border-gray-200"
              : "bg-white border border-gray-200 shadow-sm p-1"
        }
      `}
      >
        {showIcon && (
          <div className="flex-shrink-0 pl-3">
            <Package2
              className={`
              ${variant === "hero" ? "h-5 w-5 md:h-6 md:w-6 text-navy-600" : "h-5 w-5 text-gray-400"}
            `}
            />
          </div>
        )}

        <Input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0
            ${variant === "hero" ? "text-base md:text-lg py-4 md:py-6" : ""}
          `}
          placeholder={placeholder}
          type="text"
        />

        <Button
          type="submit"
          className={`
            flex-shrink-0 transition-all duration-300
            ${
              variant === "hero"
                ? "bg-navy-800 hover:bg-navy-900 text-white py-4 md:py-6 px-4 md:px-8 text-sm md:text-base font-medium rounded-lg"
                : variant === "minimal"
                  ? "bg-navy-800 hover:bg-navy-900 text-white rounded-lg"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
            }
            ${trackingNumber.trim() ? "opacity-100" : "opacity-90"}
          `}
        >
          {variant === "hero" ? (
            <>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>

      {variant === "hero" && (
        <div className="absolute -bottom-6 left-0 w-full flex justify-center">
          <div className="text-xs text-gray-300 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            Enter a tracking number (e.g., GFX1234567) to track your shipment
          </div>
        </div>
      )}
    </form>
  )
}
