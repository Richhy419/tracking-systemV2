import Image from "next/image"
import { cn } from "@/lib/utils"

interface PartnerLogoProps {
  src: string
  alt: string
  className?: string
}

export function PartnerLogo({ src, alt, className }: PartnerLogoProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 flex items-center justify-center h-20 border border-gray-100 transition-all duration-300 hover:shadow-md grayscale hover:grayscale-0",
        className,
      )}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={120}
        height={40}
        className="max-h-10 w-auto object-contain"
      />
    </div>
  )
}
