"use client"

import Link from "next/link"
import { Lock, CheckCircle2, PlayCircle, BookOpen } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Specialization } from "@/lib/training-types"

interface TopicsViewProps {
  specializations: Specialization[]
  programId: string
}

export function TopicsView({ specializations, programId }: TopicsViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          Chuyên đề của bạn
        </h2>
        <span className="text-sm text-slate-500">
          {specializations.filter(s => s.isCompleted).length}/{specializations.length} hoàn thành
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {specializations.map((spec, index) => (
          <TopicCard
            key={spec.id}
            specialization={spec}
            index={index}
            programId={programId}
          />
        ))}
      </div>
    </div>
  )
}

interface TopicCardProps {
  specialization: Specialization
  index: number
  programId: string
}

function TopicCard({ specialization, index, programId }: TopicCardProps) {
  const isLocked = specialization.isLocked
  const isCompleted = specialization.isCompleted
  const isInProgress = !isLocked && !isCompleted

  return (
    <div
      className={cn(
        "group relative bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden transition-all",
        isLocked && "opacity-70"
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        {isCompleted ? (
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
          </div>
        ) : isLocked ? (
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
          </div>
        ) : (
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Icon & Number */}
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className={cn(
            "h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center",
            isCompleted
              ? "bg-green-100 dark:bg-green-900/30"
              : isLocked
              ? "bg-slate-100 dark:bg-slate-800"
              : "bg-primary/10"
          )}>
            <BookOpen className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              isCompleted
                ? "text-green-600 dark:text-green-400"
                : isLocked
                ? "text-slate-400"
                : "text-primary"
            )} />
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Chuyên đề {index + 1}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mb-1.5 sm:mb-2 line-clamp-1">
          {specialization.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3 sm:mb-4">
          {specialization.description}
        </p>

        {/* Progress */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">
              {specialization.lessons.filter(l => l.isCompleted).length}/{specialization.lessons.length} bài học
            </span>
            <span className={cn(
              "font-medium",
              isCompleted && "text-green-600 dark:text-green-400",
              isInProgress && "text-primary"
            )}>
              {specialization.progress}%
            </span>
          </div>
          <div className="h-1.5 sm:h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isCompleted ? "bg-green-500" : "bg-primary"
              )}
              style={{ width: `${specialization.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action */}
      {!isLocked && (
        <Link
          href={`/training/program/${programId}`}
          className="block px-4 sm:px-6 py-3 sm:py-4 border-t border-outline-variant/15 text-center text-xs sm:text-sm font-medium text-primary hover:bg-surface-container transition-colors"
        >
          {isCompleted ? "Xem lại" : "Tiếp tục học"} →
        </Link>
      )}
    </div>
  )
}
