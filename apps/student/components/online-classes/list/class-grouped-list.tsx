"use client"

import { Calendar } from "lucide-react"
import { OnlineClassCard, type OnlineClass } from "../online-class-card"

interface ClassGroupedListProps {
    groupedClasses: Record<string, OnlineClass[]>
}

export function ClassGroupedList({ groupedClasses }: ClassGroupedListProps) {
    return (
        <div className="space-y-6 sm:space-y-8">
            {Object.entries(groupedClasses).map(([monthYear, classes]) => (
                <div key={monthYear}>
                    <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {monthYear}
                    </h2>
                    <div className="flex flex-col gap-2 sm:gap-3">
                        {classes.map((classItem) => (
                            <OnlineClassCard key={classItem.id} classItem={classItem} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
