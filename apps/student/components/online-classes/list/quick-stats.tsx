"use client"

import { Calendar, BookOpen, Clock } from "lucide-react"

interface QuickStatsProps {
    upcoming: number
    scheduled: number
    history: number
}

export function QuickStats({ upcoming, scheduled, history }: QuickStatsProps) {
    return (
        <div className="hidden sm:block bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-3 sm:p-4">
            <h3 className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                Thống kê nhanh
            </h3>
            <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Sắp diễn ra</p>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">{upcoming} lớp</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Đã đăng ký</p>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">{scheduled} lớp</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Đã hoàn thành</p>
                        <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">{history} lớp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
