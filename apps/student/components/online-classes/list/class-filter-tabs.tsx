"use client"

import { cn } from "@workspace/ui/lib/utils"
import type { Tab } from "./use-online-classes"

interface ClassFilterTabsProps {
    tabs: Tab[]
    activeTab: string
    onChange: (tabId: string) => void
    stats: Record<string, number>
}

export function ClassFilterTabs({ tabs, activeTab, onChange, stats }: ClassFilterTabsProps) {
    return (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-1 sm:p-1.5">
            {/* Mobile: Horizontal tabs */}
            <div className="flex lg:hidden gap-1 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
                            activeTab === tab.id
                                ? "bg-primary text-white"
                                : "text-slate-600 hover:bg-surface-container-high dark:text-slate-400 dark:hover:bg-slate-800"
                        )}
                    >
                        <span>{tab.label}</span>
                        <span className={cn(
                            "text-xs px-1.5 sm:px-2 py-0.5 rounded-full",
                            activeTab === tab.id
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        )}>
                            {stats[tab.id] || 0}
                        </span>
                    </button>
                ))}
            </div>
            {/* Desktop: Vertical tabs */}
            <div className="hidden lg:flex lg:flex-col gap-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                            activeTab === tab.id
                                ? "bg-primary text-white"
                                : "text-slate-600 hover:bg-surface-container-high dark:text-slate-400 dark:hover:bg-slate-800"
                        )}
                    >
                        <span>{tab.label}</span>
                        <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            activeTab === tab.id
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        )}>
                            {stats[tab.id] || 0}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}
