import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  rating?: number
  imageSrc?: string
}

export function TestimonialCard({ quote, author, role, company, rating = 5, imageSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-6">"{quote}"</blockquote>

      {/* Author info */}
      <div className="flex items-center">
        {imageSrc ? (
          <div className="mr-3 rounded-full overflow-hidden h-12 w-12 flex-shrink-0 border border-gray-100">
            <Image src={imageSrc || "/placeholder.svg"} alt={author} width={48} height={48} className="object-cover" />
          </div>
        ) : (
          <div className="mr-3 rounded-full bg-navy-100 h-12 w-12 flex items-center justify-center flex-shrink-0">
            <span className="text-navy-700 font-medium text-lg">{author.charAt(0)}</span>
          </div>
        )}

        <div>
          <div className="font-medium text-navy-900">{author}</div>
          <div className="text-sm text-gray-500">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  )
}
