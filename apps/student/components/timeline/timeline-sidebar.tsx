"use client"

import { useState } from "react"
import { Search, MessageSquare, Star, Clock, TrendingUp, Hash } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

type TabType = "all" | "priority"

interface TimelineSidebarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const tabs = [
  { id: "all" as const, label: "Tất cả Tin nhắn", icon: MessageSquare },
  { id: "priority" as const, label: "Tin nhắn Ưu tiên", icon: Star },
]

const trendingTopics = [
  { id: "1", tag: "Bảo hiểm nhân thọ", count: 128 },
  { id: "2", tag: "Kỹ năng bán hàng", count: 96 },
  { id: "3", tag: "Chăm sóc khách hàng", count: 84 },
  { id: "4", tag: "Quản lý đội nhóm", count: 72 },
  { id: "5", tag: "Sản phẩm mới", count: 65 },
]

const recentActivity = [
  { id: "1", action: "Đã thích", target: "Tóm tắt Quy tắc và Điều khoản", time: "5 phút trước" },
  { id: "2", action: "Đã bình luận", target: "M-Talk #247", time: "1 giờ trước" },
  { id: "3", action: "Đã chia sẻ", target: "Kỹ năng đàm phán", time: "3 giờ trước" },
]

export function TimelineSidebar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: TimelineSidebarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <aside className="flex flex-col gap-4 lg:gap-6">
      {/* Search Bar */}
      <div
        className={cn(
          "flex items-center gap-2 sm:gap-3 rounded-xl border bg-surface-container-lowest px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200",
          isSearchFocused
            ? "border-primary ring-2 ring-primary/20"
            : "border-outline-variant/30 hover:border-outline-variant/50"
        )}
      >
        <Search className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm kiếm tin nhắn..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-100 min-w-0"
        />
      </div>

      {/* Tabs - Horizontal scroll trên mobile, vertical trên desktop */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden">
        {/* Mobile: Horizontal tabs */}
        <div className="flex lg:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/5 text-primary border-b-2 border-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 border-b-2 border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive ? "text-primary" : "text-slate-400"
                  )}
                />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id === "all" ? "Tất cả" : "Ưu tiên"}</span>
              </button>
            )
          })}
        </div>

        {/* Desktop: Vertical tabs */}
        <div className="hidden lg:flex lg:flex-col">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-200",
                  isActive
                    ? "bg-primary/5 text-primary border-l-4 border-primary"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 border-l-4 border-transparent",
                  index !== tabs.length - 1 && "border-b border-slate-100 dark:border-slate-700/50"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-primary" : "text-slate-400"
                  )}
                />
                <span className="font-medium text-sm">{tab.label}</span>
                {isActive && (
                  <span className="ml-auto text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Mới
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Trending Topics & Recent Activity - Ẩn trên mobile, hiện trên tablet+ */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
        {/* Trending Topics */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-3 lg:mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Chủ đề nổi bật
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={topic.id}
                className="flex items-center justify-between py-2 text-left group hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={cn(
                      "text-xs font-bold w-5 h-5 flex items-center justify-center rounded flex-shrink-0",
                      index < 3
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    {index + 1}
                  </span>
                  <Hash className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors truncate">
                    {topic.tag}
                  </span>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-3 lg:mb-4">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Hoạt động gần đây
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="text-sm border-b border-slate-100 dark:border-slate-700/50 last:border-0 pb-3 last:pb-0"
              >
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    Bạn
                  </span>{" "}
                  {activity.action}
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5 line-clamp-1">
                  {activity.target}
                </p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
