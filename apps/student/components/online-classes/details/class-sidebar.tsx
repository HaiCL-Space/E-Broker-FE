"use client"

import { Mail, Phone, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

interface ClassSidebarProps {
  instructor: string
}

export function ClassSidebar({ instructor }: ClassSidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
      {/* Instructor Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/15 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
          Thông tin giảng viên
        </h3>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=0040a1&color=fff`} />
            <AvatarFallback>{instructor.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate">
              {instructor}
            </p>
            <p className="text-xs sm:text-sm text-slate-500">Giảng viên chính</p>
          </div>
        </div>
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">giangvien@e-broker.com</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>+84 123 456 789</span>
          </div>
        </div>
      </div>

      {/* Reminder Card */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-900 dark:text-amber-100 text-sm sm:text-base">
              Lưu ý quan trọng
            </h4>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 mt-1">
              Vui lòng đăng nhập trước 15 phút để kiểm tra thiết bị và kết nối.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
