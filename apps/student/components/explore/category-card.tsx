"use client"

import Link from "next/link"
import Image from "next/image"
import { FolderOpen } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  thumbnail: string
  postCount: number
  color?: string
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/explore/${category.slug}`}
      className={cn(
        "group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-outline-variant/15",
        "bg-surface-container-lowest hover:shadow-lg hover:-translate-y-1",
        "transition-all duration-300"
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
        <Image
          src={category.thumbnail}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500">
          <FolderOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
          <span className="truncate">{category.postCount} Bài viết</span>
        </div>
      </div>
    </Link>
  )
}
