"use client"

import { Clock } from "lucide-react"

interface AgendaItem {
  time: string
  title: string
  description?: string
}

interface ClassAgendaProps {
  items: AgendaItem[]
}

export function ClassAgenda({ items }: ClassAgendaProps) {
  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Chương trình học
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 sm:gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary" />
              {index < items.length - 1 && (
                <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mt-2 min-h-[20px]" />
              )}
            </div>
            <div className={index < items.length - 1 ? "pb-4 sm:pb-6" : ""}>
              <p className="text-xs sm:text-sm text-slate-500">{item.time}</p>
              <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {item.title}
              </p>
              {item.description && (
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
