"use client"

import Link from "next/link"
import { Package2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b bg-navy-900 text-white">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <Package2 className="h-6 w-6 text-cyan-400" />
          </div>
          <span className="text-xl font-semibold">
            Grant<span className="text-cyan-400">Flow Express</span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors">
            Services
          </Link>
          <Link href="/tracking" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors">
            Tracking
          </Link>
          <Link href="/services" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors">
            About
          </Link>
        </div>

        <Button asChild className="hidden md:flex bg-cyan-600 hover:bg-cyan-700 text-white">
          <Link href="/quote">Request a Quote</Link>
        </Button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-navy-900 z-50 md:hidden border-b border-navy-800">
            <div className="flex flex-col p-4 space-y-3">
              <Link
                href="/"
                className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/tracking"
                className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tracking
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700 text-white mt-2">
                <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                  Request a Quote
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
