import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PromotionalBannerProps {
  imageSrc: string
  href: string
  className?: string
  buttonText?: string
  buttonVariant?: "primary" | "secondary" | "outline" | "link"
}

export function PromotionalBanner({
  imageSrc,
  href,
  className,
  buttonText = "Learn More",
  buttonVariant = "primary",
}: PromotionalBannerProps) {
  const buttonStyles = {
    primary: "bg-cyan-600 hover:bg-cyan-700 text-white",
    secondary: "bg-orange-500 hover:bg-orange-600 text-white",
    outline: "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20",
    link: "text-white underline hover:text-cyan-300 p-0",
  }

  const isExternalUrl = imageSrc.startsWith("http")

  return (
    <div className={cn("relative overflow-hidden rounded-xl w-full", className)}>
      {/* Responsive container with different aspect ratios for different screen sizes */}
      <div className="relative w-full">
        {/* Mobile aspect ratio (shorter to ensure full visibility) */}
        <div className="md:hidden relative aspect-[3/2] w-full rounded-md overflow-hidden">
          {isExternalUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              className="w-full h-full object-contain"
            />
          ) : (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              fill
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Tablet aspect ratio */}
        <div className="hidden md:block lg:hidden relative aspect-[16/9] w-full rounded-md overflow-hidden">
          {isExternalUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              fill
              className="object-cover object-center"
              priority
            />
          )}
        </div>

        {/* Desktop aspect ratio (wider) */}
        <div className="hidden lg:block relative aspect-[21/9] w-full rounded-md overflow-hidden">
          {isExternalUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Promotional banner"
              fill
              className="object-cover object-center"
              priority
            />
          )}
        </div>
      </div>

      {/* Button positioned at the bottom right */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
        <Button asChild className={buttonStyles[buttonVariant]}>
          <Link href={href}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
