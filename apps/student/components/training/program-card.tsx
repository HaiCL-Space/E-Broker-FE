import Link from "next/link"
import { Program } from "@/lib/training-types"

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link
      href={`/training/program/${program.id}`}
      className="group bg-white rounded-xl p-2 transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,64,161,0.06)]"
    >
      <div className="relative h-48 overflow-hidden rounded-md mb-6">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={program.title}
          src={program.thumbnail}
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider">
          Core
        </div>
      </div>
      <div className="px-6 pb-6 space-y-4">
        <h3 className="text-lg font-bold group-hover:text-[#0040a1] transition-colors">
          {program.title}
        </h3>
        <p className="text-sm text-[#424654] line-clamp-2">
          {program.description}
        </p>
        <div className="flex items-center gap-4 text-[11px] font-bold text-[#737785] uppercase tracking-widest pt-2">
          <span>{program.totalSpecializations} Chuyên Đề</span>
          <span className="w-1 h-1 bg-[#c3c6d6] rounded-full"></span>
          <span>120+ Giờ</span>
        </div>
      </div>
    </Link>
  )
}
