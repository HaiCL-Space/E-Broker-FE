import { Program } from "@/lib/training-types"
import { GraduationCap, Clock } from "lucide-react"

interface ProgramHeroProps {
  program: Program
}

// Component Hero Header cho trang chi tiết chương trình đào tạo
export function ProgramHero({ program }: ProgramHeroProps) {
  return (
    <header className="mb-12 relative overflow-hidden bg-[#0056d2] rounded-[2rem] p-10 text-white">
      <div className="relative z-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ff9800] text-[#653900] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Lộ Trình Chứng Chỉ
          </span>
          <span className="text-white/80 text-sm font-medium">
            Bất Động Sản & Tài Chính
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 leading-tight">
          {program.title}
        </h1>
        <p className="text-lg text-white/90 mb-8 max-w-2xl font-medium">
          {program.description}
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                Hoàn Thành
              </div>
              <div className="text-xl font-bold">{program.progress}% Tổng</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-white/60">
                Chuyên Đề
              </div>
              <div className="text-xl font-bold">
                {program.completedSpecializations}/{program.totalSpecializations}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-900/50 to-transparent"></div>
      <img
        className="absolute right-[-10%] top-0 h-full w-1/2 object-cover mix-blend-overlay opacity-40"
        alt={program.title}
        src={program.thumbnail}
      />
    </header>
  )
}
