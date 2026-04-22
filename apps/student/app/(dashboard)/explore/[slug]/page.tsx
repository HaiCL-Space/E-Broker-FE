"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Grid3X3, List, Search, FolderOpen, ChevronLeft } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { ExplorePostCard, FilterSidebar } from "@/components/explore"
import { exploreCategories, explorePosts, exploreTags } from "@/lib/mock-data"
import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  // Find category
  const category = exploreCategories.find((c) => c.slug === slug)

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = [...explorePosts]

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      )
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      posts = posts.filter((post) =>
        post.tags?.some((tag) => selectedTags.includes(tag))
      )
    }

    return posts
  }, [searchQuery, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  if (!category) {
    return (
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center px-3 sm:px-4 py-12 sm:py-16 lg:px-8">
        <div className="text-center">
          <FolderOpen className="h-14 w-14 sm:h-16 sm:w-16 mx-auto text-slate-400 mb-4" />
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Không tìm thấy thư mục
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Thư mục bạn đang tìm kiếm không tồn tại.
          </p>
          <Link href="/explore">
            <Button className="mt-6 rounded-full bg-primary hover:bg-primary-container">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Mục khám phá
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Back Link - Desktop */}
      <div className="hidden sm:block">
        <Link href="/explore">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Mục khám phá
          </Button>
        </Link>
      </div>

      {/* Back Button - Mobile */}
      <div className="sm:hidden -mx-3 px-3 -mt-4 pt-2 pb-2 border-b border-slate-100 dark:border-slate-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-1.5 text-slate-600 h-8 px-2 -ml-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>

      {/* Category Header */}
      <div className="flex items-start gap-3 sm:gap-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <nav className="text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">
            <Link href="/explore" className="hover:text-primary">
              Thư mục
            </Link>
            <span className="mx-1 sm:mx-2">/</span>
          </nav>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-headline font-bold text-slate-900 dark:text-slate-100 truncate">
            {category.name}
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-slate-500">{category.postCount} bài viết</p>
        </div>
      </div>

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
          placeholder="Tìm kiếm trong thư mục này..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-slate-100 min-w-0"
        />
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">Xem dạng:</span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-sm transition-all",
                viewMode === "grid"
                  ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dạng lưới</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-md text-sm transition-all",
                viewMode === "list"
                  ? "bg-white dark:bg-slate-700 text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Dạng danh sách</span>
            </button>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          {filteredPosts.length} bài viết
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Posts */}
        <div className="flex-1 min-w-0 order-first lg:order-none">
          {filteredPosts.length > 0 ? (
            <div
              className={cn(
                "grid gap-3 sm:gap-5",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              {filteredPosts.map((post) => (
                <ExplorePostCard
                  key={post.id}
                  post={post}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
              <Search className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-slate-400 mb-3 sm:mb-4" />
              <p className="text-sm text-slate-500">Không tìm thấy bài viết nào</p>
              {selectedTags.length > 0 && (
                <Button
                  variant="outline"
                  className="mt-4 rounded-full"
                  onClick={() => setSelectedTags([])}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 order-last lg:order-none">
          <div className="lg:sticky lg:top-20 xl:top-24">
            <FilterSidebar
              tags={exploreTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
