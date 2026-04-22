"use client"

import { useState, useMemo } from "react"
import { TimelineFeed, TimelineSidebar } from "@/components/timeline"
import { timelinePosts } from "@/lib/mock-data"

export default function TimelinePage() {
  const [activeTab, setActiveTab] = useState<"all" | "priority">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter posts based on search query and active tab
  const filteredPosts = useMemo(() => {
    let posts = [...timelinePosts]

    // Filter by tab
    if (activeTab === "priority") {
      posts = posts.filter((post) => post.isFavorited || post.stats.likes > 100)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query)
      )
    }

    return posts
  }, [activeTab, searchQuery])

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">
            Dòng thời gian
          </h1>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Cập nhật tin tức và hoạt động mới nhất từ cộng đồng
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Left Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 order-first lg:order-none">
          <div className="lg:sticky lg:top-20 xl:top-24">
            <TimelineSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {/* Right Content - Feed */}
        <div className="flex-1 min-w-0">
          <TimelineFeed posts={filteredPosts} />
        </div>
      </div>
    </div>
  )
}
