import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, Globe, Plane, Ship, Warehouse, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/80 z-10" />
          <Image src="/images/logistics-aerial.png" alt="Logistics network" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0,transparent_70%)]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our <span className="text-cyan-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive logistics solutions tailored to meet your shipping needs, from express delivery to
              specialized logistics.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Comprehensive Logistics Solutions</h2>
            <p className="text-gray-600">
              From express delivery to specialized logistics, we offer a complete range of services to meet your
              shipping needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Express Delivery */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Truck className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">Express Delivery</h3>

                <p className="mb-4 text-gray-600">
                  Same-day and next-day delivery options for urgent shipments with real-time tracking and guaranteed
                  delivery windows.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link href="/services" className="absolute inset-0" aria-label="Learn more about Express Delivery"></Link>
            </div>

            {/* International Shipping */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Globe className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">International Shipping</h3>

                <p className="mb-4 text-gray-600">
                  Reliable worldwide shipping with customs clearance and documentation support for businesses of all
                  sizes.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link
                href="/services"
                className="absolute inset-0"
                aria-label="Learn more about International Shipping"
              ></Link>
            </div>

            {/* Air Freight */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Plane className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">Air Freight</h3>

                <p className="mb-4 text-gray-600">
                  Fast and efficient air freight services for time-sensitive shipments with global reach and competitive
                  rates.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link href="/services" className="absolute inset-0" aria-label="Learn more about Air Freight"></Link>
            </div>

            {/* Ocean Freight */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Ship className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">Ocean Freight</h3>

                <p className="mb-4 text-gray-600">
                  Cost-effective ocean freight solutions for large shipments worldwide with flexible container options.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link href="/services" className="absolute inset-0" aria-label="Learn more about Ocean Freight"></Link>
            </div>

            {/* Warehousing */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Warehouse className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">Warehousing</h3>

                <p className="mb-4 text-gray-600">
                  Secure storage and inventory management with flexible space options and advanced tracking systems.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link href="/services" className="absolute inset-0" aria-label="Learn more about Warehousing"></Link>
            </div>

            {/* Specialized Logistics */}
            <div className="group relative overflow-hidden rounded-xl transition-all duration-300 bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

              <div className="p-8 relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-cyan-50">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-navy-900">Specialized Logistics</h3>

                <p className="mb-4 text-gray-600">
                  Custom solutions for fragile, hazardous, or temperature-controlled items with specialized handling.
                </p>

                <div className="flex items-center text-sm font-medium text-cyan-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <Link
                href="/services"
                className="absolute inset-0"
                aria-label="Learn more about Specialized Logistics"
              ></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">Additional Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond our core offerings, we provide a range of specialized services to meet your unique logistics needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Supply Chain Solutions</h3>
              <p className="text-gray-600 mb-4">End-to-end supply chain management with visibility and optimization.</p>
              <Link
                href="/services"
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Customs Clearance</h3>
              <p className="text-gray-600 mb-4">Expert handling of customs documentation and regulatory compliance.</p>
              <Link
                href="/services"
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Last Mile Delivery</h3>
              <p className="text-gray-600 mb-4">
                Efficient final delivery services with real-time tracking and notifications.
              </p>
              <Link
                href="/services"
                className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact our team today to discuss your logistics needs and find the perfect solution for your business.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
