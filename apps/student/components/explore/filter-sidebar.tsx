"use client"

import { cn } from "@workspace/ui/lib/utils"

interface FilterSidebarProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function FilterSidebar({ tags, selectedTags, onTagToggle }: FilterSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Filter by Tags */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-5">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Lọc theo thẻ
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full transition-all",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                )}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-5">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Thẻ phổ biến
        </h3>
        <div className="space-y-3">
          {[
            { tag: "Tài chính và Đầu tư", count: 45 },
            { tag: "Kỹ năng tư vấn", count: 38 },
            { tag: "Sản phẩm", count: 32 },
            { tag: "Chính sách tuân thủ", count: 28 },
            { tag: "Claim", count: 24 },
          ].map((item) => (
            <div
              key={item.tag}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-600 dark:text-slate-400">
                {item.tag}
              </span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
