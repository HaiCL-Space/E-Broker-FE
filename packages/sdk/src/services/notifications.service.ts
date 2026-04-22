import { BaseService } from "./base.service"
import type {
  CreateNotificationDto,
  Notification,
  NotificationEventResponse,
  NotificationListQuery,
  QueueNotificationEventDto,
  UnreadCountResponse,
} from "../types/notifications.types"

export class NotificationsService extends BaseService {
  create(data: CreateNotificationDto) {
    return this.client.post<Notification>("/notifications", data)
  }

  list(params?: NotificationListQuery) {
    const query = new URLSearchParams()
    if (params?.page) query.set("page", String(params.page))
    if (params?.limit) query.set("limit", String(params.limit))
    if (params?.userId) query.set("userId", params.userId)
    if (typeof params?.isRead === "boolean") {
      query.set("isRead", String(params.isRead))
    }
    if (params?.type) query.set("type", params.type)
    const qs = query.toString()
    return this.client.get<Notification[]>(
      `/notifications${qs ? `?${qs}` : ""}`
    )
  }

  getUnreadCount() {
    return this.client.get<UnreadCountResponse>("/notifications/unread-count")
  }

  markRead(id: string) {
    return this.client.patch<Notification>(`/notifications/${id}/read`)
  }

  remove(id: string) {
    return this.client.delete<void>(`/notifications/${id}`)
  }

  queueNewCourse(data: QueueNotificationEventDto) {
    return this.client.post<NotificationEventResponse>(
      "/notifications/events/new-course",
      data
    )
  }

  queueStudyReminder(data: QueueNotificationEventDto) {
    return this.client.post<NotificationEventResponse>(
      "/notifications/events/study-reminder",
      data
    )
  }
}
