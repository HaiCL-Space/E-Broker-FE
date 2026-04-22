"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Newspaper } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { ArticleDetail, TimelineFeed } from "@/components/timeline"
import { timelinePosts } from "@/lib/mock-data"

export default function ArticlePage() {
  const params = useParams()
  const postId = params.id as string

  // Find the current post
  const post = timelinePosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Newspaper className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Không tìm thấy bài viết
          </h1>
          <p className="mt-2 text-slate-500">
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
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <ArticleDetail post={post} />
        </div>

        {/* Sidebar - Related Posts */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Related Posts */}
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Bài viết liên quan
              </h3>
              <div className="flex flex-col gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/timeline/${relatedPost.id}`}
                    className="group flex gap-3"
                  >
                    {relatedPost.thumbnail && (
                      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
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
