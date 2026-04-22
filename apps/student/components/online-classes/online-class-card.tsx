"use client"

import Link from "next/link"
import { Clock, Globe, User, ChevronRight, CheckCircle2, XCircle, PauseCircle, Clock4 } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

export interface OnlineClass {
  id: string
  title: string
  date: string
  dayOfWeek: string
  day: number
  month: string
  timeRange: string
  language: string
  courseName: string
  instructor: string
  status: "available" | "full" | "waitlist" | "ended"
  statusText: string
  meetingLink?: string | null
}

interface OnlineClassCardProps {
    classItem: OnlineClass
}

const statusConfig = {
    available: {
        color: "bg-green-500",
        icon: CheckCircle2,
        text: "Còn chỗ",
        textClass: "text-green-600 dark:text-green-400",
    },
    full: {
        color: "bg-red-500",
        icon: XCircle,
        text: "Hết chỗ",
        textClass: "text-red-600 dark:text-red-400",
    },
    waitlist: {
        color: "bg-amber-500",
        icon: PauseCircle,
        text: "Chờ",
        textClass: "text-amber-600 dark:text-amber-400",
    },
    ended: {
        color: "bg-slate-400",
        icon: Clock4,
        text: "Kết thúc",
        textClass: "text-slate-500 dark:text-slate-400",
    },
}

export function OnlineClassCard({ classItem }: OnlineClassCardProps) {
    const config = statusConfig[classItem.status]
    const StatusIcon = config.icon

    return (
        <Link
            href={`/online-classes/${classItem.id}`}
            className={cn(
                "group flex items-stretch gap-0 rounded-xl border border-outline-variant/15 overflow-hidden",
                "bg-surface-container-lowest hover:shadow-md hover:border-primary/20 transition-all duration-200"
            )}
        >
            {/* Status Color Bar */}
            <div className={cn("w-1.5 flex-shrink-0", config.color)} />

            {/* Date Column */}
            <div className="flex flex-col items-center justify-center w-12 sm:w-14 lg:w-16 flex-shrink-0 text-center bg-surface-container p-2 sm:p-3">
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
                    {classItem.dayOfWeek}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                    {classItem.day}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                    {classItem.month}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-center">
                {/* Title Row with Status */}
                <div className="flex items-start gap-2">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1 flex-1">
                        {classItem.title}
                    </h3>
                    {/* Status Icon (mobile only) */}
                    <StatusIcon className={cn("h-4 w-4 sm:hidden flex-shrink-0 mt-0.5", config.textClass)} />
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {classItem.timeRange}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        {classItem.language}
                    </span>
                    <span className="hidden lg:inline text-slate-300">|</span>
                    <span className="hidden lg:flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[100px]">{classItem.instructor}</span>
                    </span>
                </div>

                {/* Status Text - Desktop */}
                <div className="hidden sm:flex items-center gap-1.5 mt-2">
                    <StatusIcon className={cn("h-4 w-4", config.textClass)} />
                    <span className={cn("text-xs font-medium", config.textClass)}>
                        {config.text}
                    </span>
                </div>
            </div>

            {/* Action Arrow */}
            <div className="flex items-center justify-center px-3 sm:px-4 border-l border-outline-variant/10">
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
        </Link>
    )
}
