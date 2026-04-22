"use client"

import { Users, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import type { ClassParticipant } from "@/lib/mock-data"

interface ParticipantsListProps {
  participants: ClassParticipant[]
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
          Danh sách ngườ tham dự
        </h2>
        <Badge variant="secondary" className="text-xs sm:text-sm">{participants.length} ngườ</Badge>
      </div>

      {participants.length > 0 ? (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {participants.map((participant, index) => (
            <div
              key={participant.id}
              className="flex items-center justify-between py-3 sm:py-4 first:pt-0 last:pb-0 gap-3"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {participant.status === "confirmed" && (
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500 absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-900 rounded-full" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
                    {participant.name}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 truncate">{participant.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5",
                    participant.status === "confirmed"
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                  )}
                >
                  <span className="hidden sm:inline">{participant.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}</span>
                  <span className="sm:hidden">{participant.status === "confirmed" ? "Đã OK" : "Chờ"}</span>
                </Badge>
                <span className="text-xs sm:text-sm text-slate-400 w-6 sm:w-8 text-right">
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">Chưa có ngườ đăng ký tham dự</p>
        </div>
      )}
    </div>
  )
}
