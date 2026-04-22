"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface ClassSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function ClassSearch({ value, onChange, placeholder = "Tìm kiếm lớp học..." }: ClassSearchProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div
            className={cn(
                "flex items-center gap-2 rounded-lg border bg-surface-container-lowest px-3 py-2 transition-all duration-200",
                isFocused
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-outline-variant/30 hover:border-outline-variant/50"
            )}
        >
            <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-100 min-w-0"
            />
        </div>
    )
}
