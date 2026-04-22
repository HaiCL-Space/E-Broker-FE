"use client"

import { Calendar } from "lucide-react"

interface ClassEmptyStateProps {
    hasSearchQuery: boolean
    onClearSearch?: () => void
}

export function ClassEmptyState({ hasSearchQuery, onClearSearch }: ClassEmptyStateProps) {
    return (
        <div className="text-center py-12 sm:py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
            <Calendar className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-slate-400 mb-3 sm:mb-4" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {hasSearchQuery
                    ? "Không tìm thấy lớp học nào"
                    : "Không có lớp học nào trong mục này"}
            </p>
            {hasSearchQuery && onClearSearch && (
                <button
                    onClick={onClearSearch}
                    className="mt-4 text-primary hover:text-primary/80 font-medium text-sm"
                >
                    Xóa tìm kiếm
                </button>
            )}
        </div>
    )
}
