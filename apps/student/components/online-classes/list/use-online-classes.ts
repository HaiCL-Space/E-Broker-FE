"use client"

import { useState, useMemo } from "react"
import { onlineClasses } from "@/lib/mock-data"

export interface Tab {
    id: "upcoming" | "scheduled" | "history"
    label: string
}

export type TabId = Tab["id"]

export const classTabs: Tab[] = [
    { id: "upcoming", label: "Sắp tới" },
    { id: "scheduled", label: "Đã lên lịch" },
    { id: "history", label: "Lịch sử" },
]

// Group classes by month
function groupClassesByMonth(classes: typeof onlineClasses) {
    const grouped: Record<string, typeof onlineClasses> = {}

    classes.forEach((classItem) => {
        const date = new Date(classItem.date)
        const monthYear = `tháng ${date.getMonth() + 1}, ${date.getFullYear()}`

        if (!grouped[monthYear]) {
            grouped[monthYear] = []
        }
        grouped[monthYear].push(classItem)
    })

    return grouped
}

export function useOnlineClasses() {
    const [activeTab, setActiveTab] = useState<TabId>("upcoming")
    const [searchQuery, setSearchQuery] = useState("")

    // Filter classes based on tab and search
    const filteredClasses = useMemo(() => {
        let classes = [...onlineClasses]

        // Filter by tab
        const now = new Date("2026-04-20") // Mock current date
        classes = classes.filter((classItem) => {
            const classDate = new Date(classItem.date)

            switch (activeTab) {
                case "upcoming":
                    return classDate >= now && classItem.status !== "ended"
                case "scheduled":
                    return classDate >= now && classItem.status !== "ended"
                case "history":
                    return classDate < now || classItem.status === "ended"
                default:
                    return true
            }
        })

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            classes = classes.filter(
                (classItem) =>
                    classItem.title.toLowerCase().includes(query) ||
                    classItem.courseName.toLowerCase().includes(query) ||
                    classItem.instructor.toLowerCase().includes(query)
            )
        }

        // Sort by date
        classes.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )

        return classes
    }, [activeTab, searchQuery])

    // Group by month
    const groupedClasses = useMemo(() => groupClassesByMonth(filteredClasses), [filteredClasses])

    // Calculate stats - match tab ids
    const stats = useMemo(() => ({
        upcoming: onlineClasses.filter(c => c.status === "available").length,
        scheduled: onlineClasses.filter(c => c.status === "full" || c.status === "waitlist").length,
        history: onlineClasses.filter(c => c.status === "ended").length,
    }), [])

    return {
        tabs: classTabs,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        groupedClasses,
        stats,
        hasResults: filteredClasses.length > 0,
    }
}
