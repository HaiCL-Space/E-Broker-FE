"use client"

import { useState } from "react"
import { ThumbsUp, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import type { TimelineComment } from "./timeline-post"

interface CommentCardProps {
  comment: TimelineComment
}

export function CommentCard({ comment }: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(comment.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div className="flex gap-2 sm:gap-4 py-3 sm:py-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
      {/* Avatar */}
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 border-2 border-surface-container-lowest">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
          {comment.author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-start justify-between gap-1 sm:gap-2">
          <div className="min-w-0 overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {comment.author.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {comment.timestamp}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 hover:text-slate-600 flex-shrink-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-1.5 sm:mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={cn(
              "h-7 sm:h-8 px-2 gap-1 sm:gap-1.5 rounded-full text-xs transition-all",
              isLiked
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            )}
          >
            <ThumbsUp className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", isLiked && "fill-current")} />
            <span>{likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 sm:h-8 px-2 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            Trả lời
          </Button>
        </div>
      </div>
    </div>
  )
}
