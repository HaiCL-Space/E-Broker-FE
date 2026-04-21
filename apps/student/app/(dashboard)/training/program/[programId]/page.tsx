import { getProgramById } from "@/lib/training-data"
import { Specialization } from "@/lib/training-types"
import { notFound } from "next/navigation"
import { ProgramHero } from "@/components/program-detail"
import { SpecializationAccordion } from "@/components/program-detail"

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ programId: string }>
}) {
  const { programId } = await params
  const program = getProgramById(programId)

  if (!program) {
    notFound()
  }

  const basicSpecializations = program.specializations.filter(
    (s: Specialization) => s.type === "basic"
  )
  const advancedSpecializations = program.specializations.filter(
    (s: Specialization) => s.type === "advanced"
  )

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-32">
      <main className="pt-8 px-6 max-w-7xl mx-auto">
        <ProgramHero program={program} />

        {/* Chuyên đề nền tảng với accordion */}
        <section className="mb-12">
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
              {basicSpecializations.length} CHUYÊN ĐỀ
            </div>
          </div>
          <SpecializationAccordion
            specializations={basicSpecializations}
            programId={program.id}
            variant="basic"
          />
        </section>

        {/* Chuyên đề nâng cao với accordion */}
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
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {advancedSpecializations.length} KHÓA
            </div>
          </div>
          <SpecializationAccordion
            specializations={advancedSpecializations}
            programId={program.id}
            variant="advanced"
          />
        </section>
      </main>
    </div>
  )
}
