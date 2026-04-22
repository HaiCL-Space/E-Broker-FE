"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Newspaper } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { ArticleDetail } from "@/components/timeline"
import { timelinePosts } from "@/lib/mock-data"

export default function ArticlePage() {
  const params = useParams()
  const postId = params.id as string

  // Find the current post
  const post = timelinePosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center px-3 sm:px-4 py-12 sm:py-16 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Newspaper className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Không tìm thấy bài viết
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/timeline">
            <Button className="mt-6 rounded-full bg-primary hover:bg-primary-container">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Dòng thờ gian
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get related posts (excluding current post)
  const relatedPosts = timelinePosts
    .filter((p) => p.id !== postId)
    .slice(0, 3)

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Back Link - Desktop */}
      <div className="hidden lg:block">
        <Link href="/timeline">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Dòng thờ gian
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        {/* Article Content */}
        <div className="flex-1 min-w-0 order-first lg:order-none">
          <ArticleDetail post={post} />
        </div>

        {/* Sidebar - Related Posts */}
        <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 order-last lg:order-none">
          <div className="lg:sticky lg:top-20 xl:top-24 space-y-4 lg:space-y-6">
            {/* Related Posts */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 lg:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mb-3 lg:mb-4">
                Bài viết liên quan
              </h3>
              <div className="flex flex-col gap-3 lg:gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/timeline/${relatedPost.id}`}
                    className="group flex gap-3"
                  >
                    {relatedPost.thumbnail && (
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={relatedPost.thumbnail.url}
                          alt={relatedPost.thumbnail.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {relatedPost.author.name} · {relatedPost.timestamp}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
