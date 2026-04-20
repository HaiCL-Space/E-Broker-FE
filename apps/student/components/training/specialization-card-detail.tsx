import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import {
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Gavel,
  TrendingUp,
  Handshake,
} from "lucide-react"

interface SpecializationCardProps {
  specialization: Specialization
  programId: string
  index: number
}

export function SpecializationCard({
  specialization,
  programId,
  index,
}: SpecializationCardProps) {
  const isCompleted = specialization.progress === 100
  const isInProgress =
    specialization.progress > 0 && specialization.progress < 100
  const isPending = specialization.progress === 0

  const getIcon = () => {
    if (index === 0) return <Gavel className="w-5 h-5 text-[#0040a1]" />
    if (index === 1) return <TrendingUp className="w-5 h-5 text-[#0040a1]" />
    if (index === 2) return <Handshake className="w-5 h-5 text-[#0040a1]" />
    return <BookOpen className="w-5 h-5 text-[#0040a1]" />
  }

  return (
    <Link
      href={`/training/program/${programId}/specialization/${specialization.id}`}
      className="group relative bg-white p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,64,161,0.06)]"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-[#dae2ff] rounded-xl flex items-center justify-center">
          {getIcon()}
        </div>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${
            isCompleted
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
          className="h-full bg-gradient-to-r from-[#0040a1] to-[#0056d2] rounded-full"
          style={{ width: `${specialization.progress}%` }}
        ></div>
      </div>
    </Link>
  )
}
