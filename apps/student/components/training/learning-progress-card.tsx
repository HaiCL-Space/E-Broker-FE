"use client"

import Link from "next/link"
import { Play, Clock, BookOpen, ChevronRight, Target, Award } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Program } from "@/lib/training-types"

interface LearningProgressCardProps {
  program: Program
}

export function LearningProgressCard({ program }: LearningProgressCardProps) {
  const nextLesson = program.specializations[0]?.lessons[0]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Thumbnail Section */}
        <div className="relative lg:w-[320px] xl:w-[400px] flex-shrink-0">
          <div className="relative h-48 lg:h-full min-h-[200px] overflow-hidden">
            <img
              src={program.thumbnail}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:bg-gradient-to-t lg:from-black/70 lg:via-black/20 lg:to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-semibold shadow-lg">
                <Clock className="h-3.5 w-3.5" />
                Đang học
              </span>
            </div>

            {/* Title on mobile overlay */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                {program.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            {/* Title - hidden on mobile */}
            <h2 className="hidden lg:block text-xl xl:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {program.title}
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{program.progress}%</p>
                  <p className="text-xs text-slate-500">Tiến độ</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{program.totalSpecializations}</p>
                  <p className="text-xs text-slate-500">Chuyên đề</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{program.completedSpecializations}</p>
                  <p className="text-xs text-slate-500">Hoàn thành</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Tiến độ học tập
                </span>
                <span className="text-sm font-semibold text-primary">
                  {program.completedSpecializations}/{program.totalSpecializations} chuyên đề
                </span>
              </div>
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                  style={{ width: `${program.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Next Lesson & Action */}
          {nextLesson && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Play className="h-5 w-5 text-primary ml-0.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">Bài học tiếp theo</p>
                  <p className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
                    {nextLesson.title}
                  </p>
                </div>
              </div>
              <Link href={`/training/program/${program.id}`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-xl gap-2 px-6">
                  <span>Học tiếp</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
