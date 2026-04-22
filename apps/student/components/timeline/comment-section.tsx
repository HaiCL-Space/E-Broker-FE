"use client"

import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Textarea } from "@workspace/ui/components/textarea"
import { CommentCard } from "./comment-card"
import type { TimelineComment } from "./timeline-post"
import { currentUser } from "@/lib/mock-data"

interface CommentSectionProps {
  comments: TimelineComment[]
  totalCount: number
}

export function CommentSection({ comments, totalCount }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Bình luận
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          ({totalCount})
        </span>
      </div>

      {/* Comment Input */}
      <div className="flex gap-4 mb-8">
        <Avatar className="h-10 w-10 flex-shrink-0 border-2 border-surface-container-lowest">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="bg-primary text-on-primary text-sm font-semibold">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="relative">
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] resize-none pr-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
            />
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-primary hover:bg-primary-container disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Nhấn Enter để gửi bình luận
          </p>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Chưa có bình luận nào. Hãy là ngườ đầu tiên bình luận!</p>
          </div>
        )}
      </div>

      {/* Load More */}
      {comments.length < totalCount && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="rounded-full px-6 border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Xem thêm bình luận
          </Button>
        </div>
      )}
    </div>
  )
}
