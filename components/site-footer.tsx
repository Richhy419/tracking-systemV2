import Link from "next/link"
import { Package2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8 w-full overflow-hidden">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Package2 className="h-6 w-6 text-cyan-400" />
              </div>
              <span className="font-bold text-xl">
                Grant<span className="text-cyan-400">Flow Express</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Delivering your packages with precision and care. The heartbeat of modern logistics.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Logistics Way, Shipping District, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 369-Flow</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300">contact@grantflowexpress.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Track Your Package
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Express Delivery
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  International Shipping
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Ocean Freight
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-cyan-400 transition-colors">
                  Specialized Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="sm:rounded-r-none bg-navy-900 border-navy-800 text-white"
                />
                <Button className="sm:rounded-l-none bg-cyan-600 hover:bg-cyan-700">Subscribe</Button>
              </div>
              <div className="flex gap-3 mt-6">
                <Link href="/" className="bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="/" className="bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="/" className="bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="/" className="bg-navy-800 hover:bg-navy-700 p-2 rounded-full transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GrantFlow Express. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm justify-center">
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
