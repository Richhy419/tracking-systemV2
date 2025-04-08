import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  className?: string
  variant?: "default" | "featured"
}

export function ServiceCard({ icon, title, description, href, className, variant = "default" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        variant === "featured"
          ? "bg-gradient-to-br from-navy-800 to-navy-950 text-white p-6 hover:shadow-xl hover:-translate-y-1"
          : "bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-cyan-100",
        className,
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full transition-transform duration-500 group-hover:scale-150" />

      <div className="relative z-10">
        <div
          className={cn(
            "mb-4 inline-flex items-center justify-center rounded-lg p-2",
            variant === "featured" ? "bg-white/10" : "bg-cyan-50",
          )}
        >
          {icon}
        </div>

        <h3 className={cn("text-xl font-semibold mb-2", variant === "featured" ? "text-white" : "text-navy-900")}>
          {title}
        </h3>

        <p className={cn("mb-4 text-sm", variant === "featured" ? "text-white/80" : "text-gray-600")}>{description}</p>

        <div
          className={cn(
            "flex items-center text-sm font-medium",
            variant === "featured" ? "text-cyan-300" : "text-cyan-600",
          )}
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
