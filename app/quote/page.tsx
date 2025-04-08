import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

export default function QuotePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />

      <main className="flex-1 bg-gradient-to-br from-navy-900 to-navy-950 text-white">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Button
                asChild
                variant="outline"
                className="mb-8 bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back Home
                </Link>
              </Button>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Experience the ParcelPulse Difference?
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of satisfied customers who trust us with their shipping needs. Get started today and feel
                the pulse of modern logistics.
              </p>

              {/* Benefits Section */}
              <div className="space-y-4 mt-8 bg-navy-800/50 p-6 rounded-xl border border-navy-700/50 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Why Request a Quote?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-600 p-1 rounded-full mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Customized Pricing</h4>
                      <p className="text-sm text-gray-300">Get rates tailored to your specific shipping needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-600 p-1 rounded-full mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Quick Response</h4>
                      <p className="text-sm text-gray-300">Our team will get back to you within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-cyan-600 p-1 rounded-full mt-1">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">No Obligation</h4>
                      <p className="text-sm text-gray-300">Request a quote with no commitment required</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl" />

              <div className="bg-navy-800 rounded-xl p-8 border border-navy-700 relative z-10">
                <h2 className="text-2xl font-semibold mb-4">Request a Quote</h2>
                <p className="text-gray-300 mb-6">
                  Fill out the form below and our team will get back to you with a customized shipping quote.
                </p>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">First Name</label>
                      <Input className="bg-navy-700 border-navy-600 text-white" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-1 block">Last Name</label>
                      <Input className="bg-navy-700 border-navy-600 text-white" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Email</label>
                    <Input className="bg-navy-700 border-navy-600 text-white" type="email" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Service Type</label>
                    <select className="w-full rounded-md bg-navy-700 border-navy-600 text-white py-2 px-3">
                      <option>Express Delivery</option>
                      <option>International Shipping</option>
                      <option>Freight Solutions</option>
                      <option>Specialized Logistics</option>
                    </select>
                  </div>

                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Request Quote</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
