import Link from "next/link"
import { Program } from "@/lib/training-types"

interface FeaturedProgramCardProps {
  program: Program
}

export function FeaturedProgramCard({ program }: FeaturedProgramCardProps) {
  return (
    <Link
      href={`/training/program/${program.id}`}
      className="lg:col-span-8 group relative overflow-hidden bg-white rounded-xl shadow-[0_20px_40px_rgba(0,64,161,0.06)] transition-transform duration-300 hover:scale-[1.01]"
    >
      <div className="relative h-96 overflow-hidden rounded-t-xl">
        <img
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={program.thumbnail}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff9800] text-[#653900] rounded-full text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-sm">bolt</span>
            ĐANG HỌC
          </span>
          <h2 className="text-4xl font-bold text-white mb-2 leading-tight">
            {program.title}
          </h2>
          <div className="flex items-center gap-6 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffe16d]">
                category
              </span>
              {program.totalSpecializations} Chuyên Đề
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffe16d]">
                menu_book
              </span>
              120+ Bài Học
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-[#0040a1] uppercase">
              Tiến Độ Học Tập
            </span>
            <span className="text-xl font-bold text-[#191c1d]">
              {program.progress}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-[#e1e3e4] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0040a1] to-[#0056d2] rounded-full"
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
          <p className="text-[#424654] text-sm">
            Tiếp theo:{" "}
            <span className="font-semibold text-[#191c1d]">
              {program.specializations[0]?.title}
            </span>
          </p>
        </div>
        <button className="w-full md:w-auto px-9 py-3.5 bg-[#0040a1] text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
          Tiếp Tục Học
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </Link>
  )
}
