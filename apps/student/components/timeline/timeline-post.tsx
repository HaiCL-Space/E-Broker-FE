"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ThumbsUp,
  MessageCircle,
  Star,
  Share2,
  BarChart3,
  Link2,
  MoreHorizontal,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface TimelineComment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

export interface TimelinePostData {
  id: string
  author: {
    name: string
    avatar: string
    title: string
  }
  timestamp: string
  title: string
  excerpt: string
  content?: string
  thumbnail?: {
    url: string
    alt: string
  }
  stats: {
    likes: number
    comments: number
  }
  tags?: string[]
  isLiked?: boolean
  isFavorited?: boolean
  comments?: TimelineComment[]
}

interface TimelinePostProps {
  post: TimelinePostData
}

export function TimelinePost({ post }: TimelinePostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isFavorited, setIsFavorited] = useState(post.isFavorited || false)
  const [likesCount, setLikesCount] = useState(post.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
  }

  const handleShare = () => {
    // Copy link to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/timeline/${post.id}`)
  }

  return (
    <article className="group bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="p-3 sm:p-4 lg:p-5 pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-surface-container-lowest flex-shrink-0">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-primary text-on-primary text-xs sm:text-sm font-semibold">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 overflow-hidden">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {post.author.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {post.author.title} · {post.timestamp}
              </p>
            </div>
          </div>

          {/* Actions Menu - Ẩn 1 số nút trên mobile */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 hover:text-slate-600 hidden sm:flex"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 hover:text-slate-600"
              onClick={handleShare}
            >
              <Link2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 hover:text-slate-600"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 lg:px-5">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 min-w-0 order-2 sm:order-1">
            <Link
              href={`/timeline/${post.id}`}
              className="block group/title"
            >
              <h3 className="text-base sm:text-lg font-headline font-semibold text-slate-900 dark:text-slate-100 group-hover/title:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>
            <p className="mt-1.5 sm:mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Thumbnail - Full width trên mobile */}
          {post.thumbnail && (
            <div className="w-full sm:w-auto sm:flex-shrink-0 sm:w-40 md:w-48 h-40 sm:h-24 md:h-28 rounded-lg overflow-hidden order-1 sm:order-2">
              <Image
                src={post.thumbnail.url}
                alt={post.thumbnail.alt}
                width={192}
                height={112}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions Footer */}
      <div className="p-3 sm:p-4 mt-2 sm:mt-3 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between gap-2">
          {/* Left Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "h-8 sm:h-9 px-2 sm:px-3 gap-1.5 sm:gap-2 rounded-full transition-all",
                isLiked
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <ThumbsUp
                className={cn("h-4 w-4", isLiked && "fill-current")}
              />
              <span className="text-sm font-medium">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 sm:h-9 px-2 sm:px-3 gap-1.5 sm:gap-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">{post.stats.comments}</span>
              <span className="text-sm hidden md:inline">bình luận</span>
            </Button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className={cn(
                "h-8 sm:h-9 px-2 sm:px-3 gap-1.5 sm:gap-2 rounded-full transition-all",
                isFavorited
                  ? "text-amber-500 bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <Star
                className={cn("h-4 w-4", isFavorited && "fill-current")}
              />
              <span className="text-sm font-medium hidden sm:inline">Yêu thích</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 sm:h-9 px-2 sm:px-3 gap-1.5 sm:gap-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Chia sẻ</span>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
