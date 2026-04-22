"use client"

import { TimelinePost, type TimelinePostData } from "./timeline-post"
import { Button } from "@workspace/ui/components/button"
import { Loader2, Sparkles } from "lucide-react"

interface TimelineFeedProps {
  posts: TimelinePostData[]
  isLoading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
}

export function TimelineFeed({
  posts,
  isLoading,
  hasMore,
  onLoadMore,
}: TimelineFeedProps) {
  if (isLoading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-slate-500">Đang tải tin nhắn...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Chưa có tin nhắn nào
        </h3>
        <p className="mt-2 text-sm text-slate-500 text-center max-w-sm">
          Hãy theo dõi thêm đại lý hoặc khóa học để nhận thông báo mới nhất.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Posts */}
      {posts.map((post) => (
        <TimelinePost key={post.id} post={post} />
      ))}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoading}
            className="rounded-full px-6 py-2.5 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang tải...
              </>
            ) : (
              "Tải thêm tin nhắn"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
