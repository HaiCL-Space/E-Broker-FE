"use client"

import { useState } from "react"
import Link from "next/link"
import { Specialization } from "@/lib/training-types"
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  RefreshCw,
  Lock,
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
  Play,
  Clock,
  type LucideIcon,
} from "lucide-react"

interface SpecializationAccordionProps {
  specializations: Specialization[]
  programId: string
  variant: "basic" | "advanced"
}

// Map icon theo index
const getIconForSpecialization = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    Gavel, Map, TrendingUp, Calculator, Wallet,
    Handshake, Megaphone, Receipt, FileText, MessageSquare,
  ]
  return icons[index % icons.length] ?? Gavel
}

const getAdvancedIcon = (index: number): LucideIcon => {
  const icons: LucideIcon[] = [
    TrendingUp, FileText, Calculator, Wallet, MessageSquare,
  ]
  return icons[index % icons.length] ?? TrendingUp
}

// Component Lesson Item
function LessonItem({
  lesson,
  specializationId,
  programId,
  index,
}: {
  lesson: any
  specializationId: string
  programId: string
  index: number
}) {
  const isCompleted = lesson.progress === 100
  const isInProgress = lesson.progress > 0 && lesson.progress < 100

  return (
    <Link
      href={`/training/program/${programId}/specialization/${specializationId}/lesson/${lesson.id}`}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f0f4ff] transition-colors group"
    >
      {/* Số thứ tự */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${isCompleted
          ? "bg-[#0040a1] text-white"
          : isInProgress
            ? "bg-[#ff9800] text-white"
            : "bg-[#e7e8e9] text-[#737785]"
        }`}>
        {index + 1}
      </div>

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#1a1d23] group-hover:text-[#0040a1] transition-colors truncate">
          {lesson.title}
        </h4>
        <div className="flex items-center gap-4 mt-1 text-xs text-[#737785]">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {lesson.games?.length || 0} bài tập
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~15 phút
          </span>
        </div>
      </div>

      {/* Trạng thái */}
      <div className="flex items-center gap-2 shrink-0">
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#0040a1]">
            <CheckCircle2 className="w-4 h-4" />
            Hoàn thành
          </span>
        )}
        {isInProgress && (
          <span className="flex items-center gap-1 text-xs font-semibold text-[#ff9800]">
            <RefreshCw className="w-4 h-4" />
            Đang học
          </span>
        )}
        {!isCompleted && !isInProgress && (
          <Play className="w-5 h-5 text-[#737785] group-hover:text-[#0040a1] transition-colors" />
        )}
      </div>
    </Link>
  )
}

// Component Accordion Item
function AccordionItem({
  specialization,
  programId,
  variant,
  index,
  defaultOpen = false,
}: {
  specialization: Specialization
  programId: string
  variant: "basic" | "advanced"
  index: number
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const IconComponent = variant === "basic"
    ? getIconForSpecialization(index)
    : getAdvancedIcon(index)

  const isCompleted = specialization.progress === 100
  const isInProgress = specialization.progress > 0 && specialization.progress < 100
  const isLocked = specialization.isLocked

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e7e8e9]/50">
      {/* Header */}
      <button
        onClick={() => !isLocked && setIsOpen(!isOpen)}
        disabled={isLocked}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${isLocked
            ? "cursor-not-allowed bg-[#f8f9fa]"
            : "hover:bg-[#f0f4ff] cursor-pointer"
          }`}
      >
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isLocked ? "bg-[#e7e8e9] grayscale opacity-50" : "bg-[#dae2ff]"
          }`}>
          <IconComponent className={`w-6 h-6 ${isLocked ? "text-[#737785]" : "text-[#0040a1]"}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-bold text-lg truncate ${isLocked ? "text-[#737785]" : "text-[#1a1d23]"}`}>
              {specialization.title}
            </h3>
            {isLocked && <Lock className="w-4 h-4 text-[#737785]" />}
          </div>
          <p className={`text-sm truncate ${isLocked ? "text-[#a0a3a8]" : "text-[#737785]"}`}>
            {specialization.description}
          </p>
        </div>

        {/* Progress & Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Progress bar */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={
                isCompleted ? "text-[#0040a1]" :
                  isInProgress ? "text-[#ff9800]" :
                    "text-[#737785]"
              }>
                {specialization.progress}%
              </span>
              <span className="text-[#a0a3a8]">
                {specialization.lessons.length} bài
              </span>
            </div>
            <div className="w-24 h-1.5 bg-[#e7e8e9] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${isCompleted ? "bg-[#0040a1]" :
                    isInProgress ? "bg-[#ff9800]" :
                      "bg-[#c3c6d6]"
                  }`}
                style={{ width: `${specialization.progress}%` }}
              />
            </div>
          </div>

          {/* Toggle */}
          {!isLocked && (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? "bg-[#0040a1] text-white rotate-180" : "bg-[#e7e8e9] text-[#737785]"
              }`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          )}
        </div>
      </button>

      {/* Lessons List */}
      {isOpen && !isLocked && (
        <div className="border-t border-[#e7e8e9]/50">
          <div className="p-4 space-y-2">
            {specialization.lessons.map((lesson, idx) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                specializationId={specialization.id}
                programId={programId}
                index={idx}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="px-5 pb-4">
          <div className="bg-[#f8f9fa] rounded-xl p-4 text-center text-sm text-[#737785]">
            <Lock className="w-4 h-4 inline mr-2" />
            Hoàn thành các chuyên đề trước để mở khóa
          </div>
        </div>
      )}
    </div>
  )
}

// Component chính
export function SpecializationAccordion({
  specializations,
  programId,
  variant,
}: SpecializationAccordionProps) {
  return (
    <div className="space-y-4">
      {specializations.map((spec, index) => (
        <AccordionItem
          key={spec.id}
          specialization={spec}
          programId={programId}
          variant={variant}
          index={index}
          defaultOpen={variant === "basic" && index === 0}
        />
      ))}
    </div>
  )
}
