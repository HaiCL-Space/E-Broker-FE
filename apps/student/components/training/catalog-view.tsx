"use client"

import Link from "next/link"
import { Clock, BookOpen, Award, ChevronRight } from "lucide-react"
import { Program } from "@/lib/training-types"

interface CatalogViewProps {
  programs: Program[]
}

export function CatalogView({ programs }: CatalogViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          Tất cả chương trình
        </h2>
        <span className="text-sm text-slate-500">
          {programs.length} chương trình
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {programs.map((program) => (
          <ProgramCatalogCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}

interface ProgramCatalogCardProps {
  program: Program
}

function ProgramCatalogCard({ program }: ProgramCatalogCardProps) {
  return (
    <Link
      href={`/training/program/${program.id}`}
      className="group bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src={program.thumbnail}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 dark:bg-black/70 backdrop-blur rounded-full text-[10px] sm:text-xs font-medium text-slate-900 dark:text-white">
            Chứng chỉ
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3 sm:mb-4">
          {program.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{program.totalSpecializations} chuyên đề</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{program.totalSpecializations * 5} giờ</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3.5 w-3.5" />
            <span>Có chứng chỉ</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-5 py-3 border-t border-outline-variant/15 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-primary">
          Xem chi tiết
        </span>
        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  )
}
