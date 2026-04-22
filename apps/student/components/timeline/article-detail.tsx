"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Star,
  Share2,
  Bookmark,
  Clock,
  Eye,
  Hash,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { CommentSection } from "./comment-section"
import type { TimelinePostData } from "./timeline-post"

interface ArticleDetailProps {
  post: TimelinePostData
}

export function ArticleDetail({ post }: ArticleDetailProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isFavorited, setIsFavorited] = useState(post.isFavorited || false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  // Parse content paragraphs
  const contentParagraphs = post.content
    ? post.content.split("\n\n")
    : post.excerpt.split("\n\n")

  return (
    <article className="bg-surface-container-lowest rounded-2xl border border-outline-variant/15 overflow-hidden">
      {/* Back Button - Mobile */}
      <div className="lg:hidden p-4 border-b border-slate-100 dark:border-slate-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-slate-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </Button>
      </div>

      {/* Header */}
      <div className="p-6 lg:p-8 pb-4">
        <div className="flex items-start justify-between gap-4">
          {/* Author Info */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-surface-container-lowest ring-2 ring-primary/10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-primary text-on-primary text-sm font-semibold">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {post.author.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {post.author.title}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.timestamp}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  1.2k lượt xem
                </span>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className={cn(
                "h-10 w-10 rounded-full transition-all",
                isBookmarked
                  ? "text-amber-500 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              )}
            >
              <Bookmark
                className={cn("h-5 w-5", isBookmarked && "fill-current")}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-10 w-10 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 lg:px-8">
        <h1 className="text-2xl lg:text-3xl font-headline font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-6 lg:px-8 mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/5 text-primary hover:bg-primary/10 cursor-pointer"
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Thumbnail */}
      {post.thumbnail && (
        <div className="mx-6 lg:mx-8 mt-6 rounded-xl overflow-hidden">
          <Image
            src={post.thumbnail.url}
            alt={post.thumbnail.alt}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 lg:p-8 pt-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {contentParagraphs.map((paragraph, index) => {
            // Check if it's a heading (starts with ##)
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            // Check if it's a list
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((item) => item.startsWith("- "))
              return (
                <ul key={index} className="list-disc list-inside space-y-2 my-4 text-slate-700 dark:text-slate-300">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              )
            }
            // Check if it's a divider
            if (paragraph.startsWith("---")) {
              return (
                <hr
                  key={index}
                  className="my-8 border-slate-200 dark:border-slate-700"
                />
              )
            }
            // Regular paragraph
            return (
              <p
                key={index}
                className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-line"
              >
                {paragraph}
              </p>
            )
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 lg:px-8 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-10 px-4 gap-2 rounded-full transition-all",
                isLiked
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <ThumbsUp className={cn("h-5 w-5", isLiked && "fill-current")} />
              <span className="font-medium">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-10 px-4 gap-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{post.stats.comments}</span>
              <span className="hidden sm:inline">bình luận</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={cn(
                "h-10 px-4 gap-2 rounded-full transition-all",
                isFavorited
                  ? "text-amber-500 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Star
                className={cn("h-5 w-5", isFavorited && "fill-current")}
              />
              <span className="hidden sm:inline font-medium">Yêu thích</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-10 px-4 gap-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Share2 className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Chia sẻ</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-6 lg:px-8 pb-8">
        <CommentSection
          comments={post.comments || []}
          totalCount={post.stats.comments}
        />
      </div>
    </article>
  )
}
