"use client"

import { Flame, Target, Trophy } from "lucide-react"

export function DailyGoalCard() {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              Mục tiêu hôm nay
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">12 ngày liên tiếp</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-surface-container rounded-xl p-3 sm:p-4 text-center">
          <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mx-auto mb-1.5" />
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">85%</p>
          <p className="text-[10px] sm:text-xs text-slate-500">Tỷ lệ hoàn thành</p>
        </div>
        <div className="bg-surface-container rounded-xl p-3 sm:p-4 text-center">
          <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto mb-1.5" />
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">3/5</p>
          <p className="text-[10px] sm:text-xs text-slate-500">Bài học hôm nay</p>
        </div>
      </div>

      {/* Weekly Progress */}
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 sm:mb-3">
          Tuần này
        </p>
        <div className="flex justify-between gap-1 sm:gap-2">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1 sm:gap-1.5">
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-medium ${
                  i < 5
                    ? "bg-primary text-white"
                    : i === 5
                    ? "bg-primary/20 text-primary"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                }`}
              >
                {i < 5 ? "✓" : ""}
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
