"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, MessageCircle, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export interface ExplorePost {
    id: string
    title: string
    excerpt: string
    thumbnail: string
    author: {
        name: string
        avatar: string
    }
    timestamp: string
    stats: {
        likes: number
        comments: number
    }
    tags?: string[]
}

interface ExplorePostCardProps {
    post: ExplorePost
    viewMode?: "grid" | "list"
}

export function ExplorePostCard({ post, viewMode = "list" }: ExplorePostCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)
    const [likesCount, setLikesCount] = useState(post.stats.likes)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))
    }

    const isGrid = viewMode === "grid"

    return (
        <article
            className={cn(
                "group bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden",
                "hover:shadow-lg transition-all duration-300",
                isGrid 
                    ? "flex flex-col" 
                    : "flex flex-row sm:flex-row gap-3 p-3 sm:p-5"
            )}
        >
            {/* Thumbnail */}
            <div
                className={cn(
                    "relative overflow-hidden bg-slate-100 flex-shrink-0",
                    isGrid 
                        ? "w-full h-40 sm:h-48" 
                        : "w-24 h-24 sm:w-40 md:w-48 sm:h-32 rounded-lg"
                )}
            >
                <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className={cn("flex flex-col flex-1 min-w-0", isGrid && "p-4 sm:p-5")}>
                {/* Title */}
                <Link href={`/timeline/${post.id}`}>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-1.5 sm:px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-700/50 gap-2">
                    {/* Author */}
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <Avatar className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                {post.author.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-xs min-w-0 overflow-hidden">
                            <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
                                {post.author.name}
                            </p>
                            <p className="text-slate-500 hidden sm:block">{post.timestamp}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={cn(
                                "h-7 sm:h-8 px-1.5 sm:px-2 gap-1 sm:gap-1.5 rounded-full text-xs",
                                isLiked
                                    ? "text-blue-600 bg-blue-50"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            <ThumbsUp className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", isLiked && "fill-current")} />
                            <span>{likesCount}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 sm:h-8 px-1.5 sm:px-2 gap-1 sm:gap-1.5 rounded-full text-xs text-slate-500 hover:bg-slate-100"
                        >
                            <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            <span className="hidden sm:inline">Bình luận</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsFavorited(!isFavorited)}
                            className={cn(
                                "h-7 sm:h-8 px-1.5 sm:px-2 gap-1 sm:gap-1.5 rounded-full text-xs",
                                isFavorited
                                    ? "text-amber-500 bg-amber-50"
                                    : "text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            <Star className={cn("h-3 w-3 sm:h-3.5 sm:w-3.5", isFavorited && "fill-current")} />
                            <span className="hidden sm:inline">Yêu thích</span>
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    )
}
