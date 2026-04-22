import type { PaginationQuery } from "./courses.types"

export type NotificationType = "new_course" | "study_reminder" | "system"

export type NotificationChannel = "email" | "in_app"

export interface CreateNotificationDto {
  tenantId: string
  userId: string
  title: string
  message: string
  type: NotificationType
  channel?: NotificationChannel
  metadata?: Record<string, unknown>
}

export interface QueueNotificationEventDto {
  tenantId: string
  recipientIds: string[]
  title: string
  message?: string
  channel?: NotificationChannel
  metadata?: Record<string, unknown>
}

export interface Notification {
  id: string
  tenantId?: string
  userId?: string
  title?: string
  message?: string
  type?: NotificationType
  channel?: NotificationChannel
  isRead?: boolean
  createdAt?: string
  metadata?: Record<string, unknown>
}

export interface NotificationListQuery extends PaginationQuery {
  userId?: string
  isRead?: boolean
  type?: NotificationType
}

export interface UnreadCountResponse {
  unreadCount: number
}

export interface NotificationEventResponse {
  success: boolean
}
