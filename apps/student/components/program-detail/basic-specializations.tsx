import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import {
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Gavel,
  TrendingUp,
  Handshake,
  Map,
  FileText,
  Calculator,
  Wallet,
  MessageSquare,
  Megaphone,
  Receipt,
  type LucideIcon,
} from "lucide-react"

interface BasicSpecializationsProps {
  specializations: Specialization[]
  programId: string
}

// Map icon theo thứ tự hoặc loại chuyên đề
const getIconForSpecialization = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    Gavel,           // Luật
    Map,             // Quy hoạch
    TrendingUp,      // Thị trường
    Calculator,      // Định giá
    Wallet,          // Tài chính
    Handshake,       // Giao dịch
    Megaphone,        // Marketing
    Receipt,         // Thuế
    FileText,        // Đầu tư (nâng cao)
    MessageSquare,   // Phát triển dự án (nâng cao)
  ]
  return icons[index % icons.length] ?? Gavel
}

// Component hiển thị các chuyên đề nền tảng
export function BasicSpecializations({
  specializations,
  programId,
}: BasicSpecializationsProps) {
  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0040a1]">
            Chuyên Đề Nền Tảng
          </h2>
          <p className="text-[#424654] text-sm font-medium">
            Kiến thức cốt lõi cho môi giới bất động sản chuyên nghiệp
          </p>
        </div>
        <div className="text-[11px] font-bold text-[#0040a1] bg-[#dae2ff] px-4 py-2 rounded-full">
          {specializations.length} CHUYÊN ĐỀ
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specializations.map((specialization, index) => {
          const isCompleted = specialization.progress === 100
          const isInProgress =
            specialization.progress > 0 && specialization.progress < 100
          const isPending = specialization.progress === 0
          const IconComponent = getIconForSpecialization(index)

          return (
            <Link
              key={specialization.id}
              href={`/training/program/${programId}/specialization/${specialization.id}`}
              className="group relative bg-white p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,64,161,0.06)]"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-[#dae2ff] rounded-xl flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-[#0040a1]" />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${isCompleted
                      ? "text-[#0040a1]"
                      : isInProgress
                        ? "text-[#8b5000]"
                        : "text-[#737785]"
                    }`}
                >
                  {isCompleted && (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Hoàn Thành
                    </>
                  )}
                  {isInProgress && (
                    <>
                      <RefreshCw className="w-3 h-3" />
                      Đang Học
                    </>
                  )}
                  {isPending && "Chưa Học"}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 leading-snug">
                {specialization.title}
              </h3>
              <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-[#424654]">
                <BookOpen className="w-4 h-4" />
                {specialization.lessons.length} Bài Học
              </div>
              <div className="h-1.5 w-full bg-[#e1e3e4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0040a1] to-[#0056d2] rounded-full transition-all duration-500"
                  style={{ width: `${specialization.progress}%` }}
                ></div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
