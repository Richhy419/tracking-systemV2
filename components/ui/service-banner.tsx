import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServiceBannerProps {
  title: string
  description?: string
  imageSrc: string
  href: string
  className?: string
  position?: "left" | "right"
  buttonText?: string
}

export function ServiceBanner({
  title,
  description,
  imageSrc,
  href,
  className,
  position = "left",
  buttonText = "Learn More",
}: ServiceBannerProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div className="absolute inset-0 z-0">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>

      <div
        className={cn(
          "relative z-10 flex items-center h-full",
          position === "left"
            ? "bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-transparent"
            : "bg-gradient-to-l from-purple-900/90 via-purple-800/80 to-transparent",
        )}
      >
        <div className={cn("p-8 md:p-12 max-w-md", position === "right" && "ml-auto")}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
          {description && <p className="text-white/90 mb-6">{description}</p>}
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href={href}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
