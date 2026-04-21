import { Specialization } from "@/lib/training-types"
import { Lock, BookOpen } from "lucide-react"

interface SpecializationSectionProps {
  title: string
  description: string
  specializations: Specialization[]
  programId: string
  variant: "basic" | "advanced"
}

// Section header component
function SectionHeader({
  title,
  description,
  count,
  variant,
}: {
  title: string
  description: string
  count: number
  variant: "basic" | "advanced"
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#0040a1]">
          {title}
        </h2>
        <p className="text-[#424654] text-sm font-medium">
          {description}
        </p>
      </div>
      <div className={`text-[11px] font-bold px-4 py-2 rounded-full flex items-center gap-2 ${
        variant === "basic"
          ? "text-[#0040a1] bg-[#dae2ff]"
          : "text-[#737785] bg-[#e7e8e9]"
      }`}>
        {variant === "advanced" && <Lock className="w-3 h-3" />}
        {count} CHUYÊN ĐỀ
      </div>
    </div>
  )
}

export function SpecializationSection({
  title,
  description,
  specializations,
  programId,
  variant,
}: SpecializationSectionProps) {
  return (
    <section className="mb-12">
      <SectionHeader
        title={title}
        description={description}
        count={specializations.length}
        variant={variant}
      />
      {/* Content sẽ được render bởi parent component */}
      <div className="space-y-4">
        {specializations.map((spec, index) => (
          <div key={spec.id} className="bg-white rounded-2xl p-5 border border-[#e7e8e9]/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#dae2ff] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#0040a1]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#1a1d23]">{spec.title}</h3>
                <p className="text-sm text-[#737785]">{spec.lessons.length} bài học</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
