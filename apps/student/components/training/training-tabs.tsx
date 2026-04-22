"use client"

import { cn } from "@workspace/ui/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TrainingTabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function TrainingTabs({ tabs, activeTab, onChange }: TrainingTabsProps) {
  return (
    <div className="flex items-center border-b border-slate-200 dark:border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 sm:flex-none sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors relative text-center sm:text-left whitespace-nowrap",
            activeTab === tab.id
              ? "text-primary"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  )
}
