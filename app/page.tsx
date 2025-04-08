"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrackingInput } from "@/components/ui/tracking-input"
import { AnimatedPulseLine } from "@/components/ui/animated-pulse-line"
import { ServiceCard } from "@/components/ui/service-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { AnimatedMap } from "@/components/ui/animated-map"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { PromotionalBanner } from "@/components/ui/promotional-banner"
import {
  Package2,
  Truck,
  Globe,
  BarChart3,
  Clock,
  Shield,
  Warehouse,
  Plane,
  Ship,
  ArrowRight,
  MessageSquare,
  CheckCircle,
} from "lucide-react"
import { sendQuoteRequest } from "@/lib/actions"

// Function to format the current date and time in the desired format
function formatCurrentDateTime() {
  const now = new Date()

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get date components
  const month = months[now.getMonth()]
  const day = now.getDate()
  const year = now.getFullYear()

  // Get time components
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "PM" : "AM"

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // Format the date and time string
  return `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`
}

export default function HomePage() {
  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [serviceType, setServiceType] = useState("Express Delivery")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Validate form
      if (!firstName || !lastName || !email) {
        throw new Error("Please fill in all required fields")
      }

      // Send the form data
      await sendQuoteRequest({
        firstName,
        lastName,
        email,
        serviceType,
      })

      // Show success message
      setIsSuccess(true)

      // Reset form
      setFirstName("")
      setLastName("")
      setEmail("")
      setServiceType("Express Delivery")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />

      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/80 z-10" />
          <div className="relative w-full h-full">
            <Image
              src="/images/logistics-aerial.png"
              alt="Logistics network"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_70%)]" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              The <span className="text-cyan-400">Heartbeat</span> of Modern Logistics
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              Real-time tracking, precision delivery, and seamless logistics solutions for businesses and individuals
              worldwide.
            </p>

            <div className="mb-8 md:mb-12">
              <TrackingInput variant="hero" buttonText="Track Your Shipment" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Delivery Services Banner */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6">
            <PromotionalBanner
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20111236-w08lyxtzTQSefxSCjxSlj2g0GWSTtQ.png"
              href="/services"
              buttonText="Learn More"
              buttonVariant="secondary"
            />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-8 md:py-12 border-y border-gray-100">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-lg font-medium text-gray-500">Trusted by leading companies worldwide</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-center">
            {/* DHL Express */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/dhl-express-logo.png"
                  alt="DHL Express"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>

            {/* FedEx */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/fedex-logo.jpeg"
                  alt="FedEx"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>

            {/* UPS */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/ups-logo.png"
                  alt="UPS (United Parcel Service)"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>

            {/* USPS */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/usps-logo.png"
                  alt="USPS (United States Postal Service)"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>

            {/* Aramex */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/aramex-logo.png"
                  alt="Aramex"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>

            {/* 17Track */}
            <div className="rounded-lg p-2 md:p-3 flex items-center justify-center h-16 md:h-20 border border-gray-100 transition-all duration-300 hover:shadow-md">
              <div className="image-container h-full w-full flex items-center justify-center">
                <Image
                  src="/images/17track-logo.png"
                  alt="17Track"
                  width={100}
                  height={35}
                  className="object-contain max-h-full max-w-[80%]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 md:mb-4">
              Comprehensive Logistics Solutions
            </h2>
            <p className="text-gray-600">
              From express delivery to specialized logistics, we offer a complete range of services to meet your
              shipping needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ServiceCard
              icon={<Truck className="h-6 w-6 text-cyan-600" />}
              title="Express Delivery"
              description="Same-day and next-day delivery options for urgent shipments with real-time tracking."
              href="/services"
              variant="featured"
            />
            <ServiceCard
              icon={<Globe className="h-6 w-6 text-cyan-600" />}
              title="International Shipping"
              description="Reliable worldwide shipping with customs clearance and documentation support."
              href="/services"
            />
            <ServiceCard
              icon={<Plane className="h-6 w-6 text-cyan-600" />}
              title="Air Freight"
              description="Fast and efficient air freight services for time-sensitive shipments."
              href="/services"
            />
            <ServiceCard
              icon={<Ship className="h-6 w-6 text-cyan-600" />}
              title="Ocean Freight"
              description="Cost-effective ocean freight solutions for large shipments worldwide."
              href="/services"
            />
            <ServiceCard
              icon={<Warehouse className="h-6 w-6 text-cyan-600" />}
              title="Warehousing"
              description="Secure storage and inventory management with flexible space options."
              href="/services"
            />
            <ServiceCard
              icon={<Shield className="h-6 w-6 text-cyan-600" />}
              title="Specialized Logistics"
              description="Custom solutions for fragile, hazardous, or temperature-controlled items."
              href="/services"
            />
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Button asChild className="bg-navy-800 hover:bg-navy-900">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Delivery Options Banners */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <PromotionalBanner
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20111103-Hx8cJXSSexdkv5TFBwOwue4CskDAMH.png"
              href="/services"
              buttonVariant="secondary"
            />
            <PromotionalBanner
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20111125-e3Q2rrdUxtFWAYKjeWEE844DJpuUDe.png"
              href="/services"
              buttonVariant="secondary"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <PromotionalBanner
              imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20111035-jYam4N1SdfkdbQJgK5jvrQXe6n2Gca.png"
              href="/services"
              buttonText="View Rates"
              buttonVariant="primary"
            />
          </div>
        </div>
      </section>

      {/* Live Tracking Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <AnimatedMap />
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 md:mb-6">
                Real-Time Tracking with <span className="gradient-text">GrantFlow Express</span>
              </h2>
              <p className="text-gray-600 mb-4 md:mb-6">
                Our advanced tracking system provides real-time updates on your shipments, giving you complete
                visibility and control over your logistics.
              </p>

              <div className="space-y-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-50 p-2 rounded-lg mt-1">
                    <BarChart3 className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy-900">Live Status Updates</h3>
                    <p className="text-gray-600 text-sm">
                      Get instant notifications and status changes as your package moves through our network.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-cyan-50 p-2 rounded-lg mt-1">
                    <Clock className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy-900">Precise Delivery Windows</h3>
                    <p className="text-gray-600 text-sm">
                      Know exactly when your package will arrive with accurate delivery time estimates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-cyan-50 p-2 rounded-lg mt-1">
                    <Shield className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy-900">Secure Monitoring</h3>
                    <p className="text-gray-600 text-sm">
                      End-to-end security with encrypted tracking and authentication for your shipments.
                    </p>
                  </div>
                </div>
              </div>

              <Button asChild className="bg-navy-800 hover:bg-navy-900">
                <Link href="/tracking">
                  Track Your Package
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
              <div className="text-center mb-4 md:mb-6">
                <h3 className="text-xl font-semibold text-navy-900">Live Shipment Tracking</h3>
                <p className="text-gray-500 text-sm">Enter your tracking number to see real-time status</p>
              </div>

              <TrackingInput variant="default" />

              <div className="mt-6 md:mt-8 border-t border-gray-100 pt-4 md:pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium text-navy-900">Shipment Progress</div>
                  <div className="text-sm text-cyan-600">GFX1234567</div>
                </div>

                <div className="mb-4 md:mb-6">
                  <AnimatedPulseLine color="#06b6d4" height={40} />
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="text-navy-900 font-medium">
                    <div className="bg-cyan-500 h-2 w-2 rounded-full mx-auto mb-1"></div>
                    Processing
                  </div>
                  <div className="text-navy-900 font-medium">
                    <div className="bg-cyan-500 h-2 w-2 rounded-full mx-auto mb-1"></div>
                    Dispatched
                  </div>
                  <div className="text-gray-500">
                    <div className="bg-gray-300 h-2 w-2 rounded-full mx-auto mb-1"></div>
                    Out for Delivery
                  </div>
                  <div className="text-gray-500">
                    <div className="bg-gray-300 h-2 w-2 rounded-full mx-auto mb-1"></div>
                    Delivered
                  </div>
                </div>

                <div className="mt-4 md:mt-6 bg-cyan-50 rounded-lg p-3 md:p-4 border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-500 text-white p-1.5 rounded-full">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-navy-900">Package Dispatched</div>
                      <div className="text-xs text-gray-500">{formatCurrentDateTime()}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Your package has left our sorting facility and is on its way.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse Workers Banner */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container px-4 sm:px-6">
          <PromotionalBanner
            imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-05%20111203-DsQtpYrgzcUsTwW8w8JSbxoQ47yhWI.png"
            href="/about"
            buttonText="About Our Team"
            buttonVariant="secondary"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.2)_0,transparent_60%)]" />

        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Why Choose GrantFlow Express?</h2>
            <p className="text-gray-300">
              We combine cutting-edge technology with logistics expertise to deliver an unmatched shipping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">Time-Efficient Delivery</h3>
              <p className="text-gray-300">
                Our optimized routes and dedicated fleet ensure your packages arrive on time, every time.
              </p>
            </div>

            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">Global Network</h3>
              <p className="text-gray-300">
                With partners in over 150 countries, we can deliver your packages anywhere in the world.
              </p>
            </div>

            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">Secure Handling</h3>
              <p className="text-gray-300">
                Advanced security measures and careful handling protect your valuable shipments.
              </p>
            </div>

            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">Data-Driven Logistics</h3>
              <p className="text-gray-300">
                We use advanced analytics to optimize routes and predict potential delays before they happen.
              </p>
            </div>

            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">24/7 Support</h3>
              <p className="text-gray-300">
                Our customer service team is available around the clock to assist with any questions or concerns.
              </p>
            </div>

            <div className="bg-navy-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-navy-700/50">
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 md:mb-3">Custom Solutions</h3>
              <p className="text-gray-300">
                Tailored logistics solutions designed to meet your specific business requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 md:mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">
              Don't just take our word for it. Here's what businesses and individuals have to say about GrantFlow
              Express.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="GrantFlow Express has transformed our logistics operations. Their real-time tracking and reliable delivery have significantly improved our customer satisfaction."
              author="Sarah Johnson"
              role="Operations Manager"
              company="TechGlobal Inc."
              rating={5}
            />

            <TestimonialCard
              quote="As an e-commerce business, reliable shipping is crucial. GrantFlow Express delivers consistently and their customer service is exceptional."
              author="Michael Chen"
              role="Founder"
              company="EcoShop Online"
              rating={5}
            />

            <TestimonialCard
              quote="The specialized handling for our fragile medical equipment has been flawless. We can trust GrantFlow Express with our most sensitive shipments."
              author="Dr. Emily Rodriguez"
              role="Procurement Director"
              company="HealthFirst Medical"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Ready to Experience the GrantFlow Express Difference?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                Join thousands of satisfied customers who trust us with their shipping needs. Get started today and feel
                the pulse of modern logistics.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl" />

              <div
                className="bg-navy-800 rounded-xl p-6 md:p-8 border border-navy-700 relative z-10"
                id="request-quote"
              >
                {isSuccess ? (
                  <div className="text-center py-6 md:py-8">
                    <div className="bg-green-500/20 p-4 rounded-full w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 flex items-center justify-center">
                      <CheckCircle className="h-8 md:h-10 w-8 md:w-10 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 md:mb-4">Quote Request Sent!</h3>
                    <p className="text-gray-300 mb-4 md:mb-6">
                      Thank you for your interest. Our team will get back to you with a customized shipping quote within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-3 md:mb-4">Request a Quote</h3>
                    <p className="text-gray-300 mb-4 md:mb-6">
                      Fill out the form below and our team will get back to you with a customized shipping quote.
                    </p>

                    {errorMessage && (
                      <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-3 rounded-md mb-4">
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-300 mb-1 block">First Name*</label>
                          <Input
                            className="bg-navy-700 border-navy-600 text-white"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-300 mb-1 block">Last Name*</label>
                          <Input
                            className="bg-navy-700 border-navy-600 text-white"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Email*</label>
                        <Input
                          className="bg-navy-700 border-navy-600 text-white"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-300 mb-1 block">Service Type</label>
                        <select
                          className="w-full rounded-md bg-navy-700 border-navy-600 text-white py-2 px-3"
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                        >
                          <option>Express Delivery</option>
                          <option>International Shipping</option>
                          <option>Freight Solutions</option>
                          <option>Specialized Logistics</option>
                        </select>
                      </div>

                      <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                            Sending...
                          </div>
                        ) : (
                          "Request Quote"
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
