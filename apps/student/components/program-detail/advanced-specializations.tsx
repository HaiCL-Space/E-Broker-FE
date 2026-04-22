import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import { BookOpen, Lock, Brain, TrendingUp, Building, Factory, Cpu, LineChart, type LucideIcon } from "lucide-react"

interface AdvancedSpecializationsProps {
  specializations: Specialization[]
  programId: string
}

// Map icon cho các chuyên đề nâng cao
const getAdvancedIcon = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    TrendingUp,    // Đầu tư
    Building,       // Phát triển dự án
    LineChart,      // M&A
    Factory,        // Bất động sản công nghiệp
    Cpu,            // PropTech
    Brain,          // Mặc định
  ]
  return icons[index % icons.length] ?? Brain
}

// Component hiển thị các chuyên đề nâng cao (bị khóa)
export function AdvancedSpecializations({
  specializations,
  programId,
}: AdvancedSpecializationsProps) {
  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0040a1]">
            Chuyên Đề Nâng Cao
          </h2>
          <p className="text-[#424654] text-sm font-medium">
            Các khóa học chuyên sâu để hoàn thiện kỹ năng và nhận chứng chỉ
          </p>
        </div>
        <div className="text-[11px] font-bold text-[#737785] bg-[#e7e8e9] px-4 py-2 rounded-full flex items-center gap-2">
          <Lock className="w-3 h-3" />
          {specializations.length} KHÓA
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {specializations.map((specialization, index) => {
          const IconComponent = getAdvancedIcon(index)

          return (
            <div
              key={specialization.id}
              className="relative overflow-hidden bg-[#f3f4f5]/50 p-8 rounded-2xl border-2 border-dashed border-[#c3c6d6]/30 group"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-20 h-20 bg-[#e7e8e9] rounded-2xl flex items-center justify-center grayscale opacity-40">
                  <IconComponent className="w-10 h-10" />
                </div>
                <div className="flex-1 opacity-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#e1e3e4] text-[10px] font-bold px-2 py-0.5 rounded text-[#737785] uppercase tracking-widest">
                      Đã Khóa
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {specialization.title}
                  </h3>
                  <p className="text-sm text-[#424654] mb-6 leading-relaxed">
                    {specialization.description}
                  </p>
                  <div className="flex items-center gap-6 text-xs font-bold text-[#737785] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {specialization.lessons.length} Bài Học
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-[#0040a1] text-sm">
                  <Lock className="w-5 h-5" />
                  Hoàn thành các chuyên đề trước để mở khóa
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
