import { mockPrograms } from "@/lib/training-mock-data"
import {
  TrainingHeader,
  FeaturedProgramCard,
  AchievementCard,
  StreakCard,
  ProgramCard,
  NewsletterSection,
} from "@/components/training"

export default function TrainingPage() {
  const featuredProgram = mockPrograms[0]!
  const otherPrograms = mockPrograms.slice(1)

  return (
    <div className="bg-[#f8f9fa]">
      <main className="mx-auto max-w-7xl px-6 py-12 space-y-16">
        <TrainingHeader />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <FeaturedProgramCard program={featuredProgram} />

          <div className="lg:col-span-4 space-y-8">
            <AchievementCard />
            <StreakCard />
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between border-b border-[#e1e3e4] pb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Chương Trình Đào Tạo
              </h2>
              <p className="text-[#424654]">
                Được đề xuất dựa trên mục tiêu nghề nghiệp của bạn
              </p>
            </div>
            <a
              className="text-[#0040a1] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              href="#"
            >
              Xem Tất Cả
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
