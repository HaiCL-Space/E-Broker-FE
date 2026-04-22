"use client"

import { useState } from "react"
import { 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Clock, 
  BookOpen, 
  ChevronRight,
  ChevronDown,
  Trophy,
  Star,
  GraduationCap
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Program, Specialization } from "@/lib/training-types"

interface RoadmapViewProps {
  program: Program
}

export function RoadmapView({ program }: RoadmapViewProps) {
  const completedCount = program.specializations.filter(s => s.isCompleted).length
  const inProgressCount = program.specializations.filter(s => !s.isLocked && !s.isCompleted).length
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Overview */}
      <div className="mb-8 p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Lộ trình học tập</h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Hoàn thành các chuyên đề để nhận chứng chỉ
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">{completedCount}</p>
              <p className="text-xs sm:text-sm text-slate-400">Hoàn thành</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-amber-400">{inProgressCount}</p>
              <p className="text-xs sm:text-sm text-slate-400">Đang học</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold">{program.totalSpecializations}</p>
              <p className="text-xs sm:text-sm text-slate-400">Tổng số</p>
            </div>
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tiến độ tổng thể</span>
            <span className="text-sm font-bold text-primary">{program.progress}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-1000"
              style={{ width: `${program.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {program.specializations.map((spec, index) => (
          <RoadmapCard
            key={spec.id}
            specialization={spec}
            index={index}
          />
        ))}
      </div>

      {/* Certificate Preview */}
      <div className="mt-8 sm:mt-12 p-6 sm:p-10 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/50 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full" />
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/50 dark:to-orange-800/50 flex items-center justify-center shadow-lg">
            <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
          Chứng chỉ hoàn thành
        </h3>
        <p className="text-sm sm:text-base text-amber-700 dark:text-amber-300 mb-4 max-w-md mx-auto">
          Hoàn thành tất cả {program.totalSpecializations} chuyên đề để nhận chứng chỉ {program.title}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400 shadow-sm">
          <Star className="h-4 w-4 text-amber-500" />
          <span>Còn {program.totalSpecializations - completedCount} chuyên đề nữa</span>
        </div>
      </div>
    </div>
  )
}

interface RoadmapCardProps {
  specialization: Specialization
  index: number
}

function RoadmapCard({ specialization, index }: RoadmapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isCompleted = specialization.isCompleted
  const isLocked = specialization.isLocked
  const isInProgress = !isLocked && !isCompleted
  const progressPercent = Math.round((specialization.lessons.filter(l => l.isCompleted).length / specialization.lessons.length) * 100)

  return (
    <div className={cn(
      "group relative rounded-2xl border-2 transition-all duration-300 overflow-hidden",
      isCompleted 
        ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30 hover:border-emerald-300 dark:hover:border-emerald-700"
        : isInProgress
        ? "bg-white dark:bg-slate-900 border-primary/30 dark:border-primary/20 hover:border-primary/50 shadow-sm hover:shadow-md"
        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 opacity-75"
    )}>
      {/* Step Number Badge */}
      <div className={cn(
        "absolute top-4 left-4 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold z-10",
        isCompleted 
          ? "bg-emerald-500 text-white"
          : isInProgress
          ? "bg-primary text-white"
          : "bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400"
      )}>
        {isCompleted ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          index + 1
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 pt-14">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold",
                isCompleted
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : isInProgress
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
              )}>
                {isCompleted ? (
                  <><CheckCircle2 className="h-3 w-3" /> Hoàn thành</>
                ) : isInProgress ? (
                  <><PlayCircle className="h-3 w-3" /> Đang học</>
                ) : (
                  <><Lock className="h-3 w-3" /> Chưa mở</>
                )}
              </span>
              {specialization.type === 'advanced' && (
                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] sm:text-xs font-medium">
                  Nâng cao
                </span>
              )}
            </div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1 truncate">
              {specialization.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
              {specialization.description}
            </p>
          </div>
          
          {/* Progress Ring */}
          {!isLocked && (
            <div className="relative flex-shrink-0">
              <svg className="h-14 w-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - progressPercent / 100)}`}
                  className={cn(
                    "transition-all duration-1000",
                    isCompleted ? "text-emerald-500" : "text-primary"
                  )}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn(
                  "text-xs font-bold",
                  isCompleted ? "text-emerald-600" : "text-primary"
                )}>
                  {progressPercent}%
                </span>
              </div>
            </div>
          )}
          
          {isLocked && (
            <div className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-slate-400" />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
            <BookOpen className="h-4 w-4" />
            <span>{specialization.lessons.length} bài học</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>{Math.ceil(specialization.lessons.length * 15)} phút</span>
          </div>
        </div>

        {/* Progress Bar */}
        {!isLocked && (
          <div className="mb-4">
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isCompleted ? "bg-emerald-500" : "bg-primary"
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!isLocked ? (
            <Button 
              variant={isInProgress ? "default" : "outline"}
              size="sm" 
              className="flex-1 gap-2 rounded-xl"
            >
              {isCompleted ? (
                <>Xem lại <ChevronRight className="h-4 w-4" /></>
              ) : (
                <>Tiếp tục <ChevronRight className="h-4 w-4" /></>
              )}
            </Button>
          ) : (
            <Button 
              variant="outline"
              size="sm" 
              disabled
              className="flex-1 gap-2 rounded-xl"
            >
              <Lock className="h-4 w-4" />
              Mở khóa sau
            </Button>
          )}
          
          {!isLocked && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-1 rounded-xl"
            >
              {isExpanded ? (
                <><ChevronDown className="h-4 w-4" /> Thu gọn</>
              ) : (
                <><ChevronRight className="h-4 w-4" /> Chi tiết</>
              )}
            </Button>
          )}
        </div>

        {/* Expanded Lessons */}
        {isExpanded && !isLocked && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2">
            <p className="text-xs font-medium text-slate-500 mb-3">Danh sách bài học</p>
            <div className="space-y-2">
              {specialization.lessons.map((lesson, i) => (
                <div 
                  key={lesson.id}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl text-sm",
                    lesson.isCompleted 
                      ? "bg-emerald-50 dark:bg-emerald-900/20" 
                      : "bg-slate-50 dark:bg-slate-800"
                  )}
                >
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                    lesson.isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-300 dark:bg-slate-600 text-white"
                  )}>
                    {lesson.isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={cn(
                    "flex-1 truncate",
                    lesson.isCompleted ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"
                  )}>
                    {lesson.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
