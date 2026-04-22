import type { PaginationQuery } from "./courses.types"

export interface CreateLessonDto {
  courseId: string
  title: string
  description?: string
  order?: number
  isPublished?: boolean
}

export interface UpdateLessonDto extends Partial<CreateLessonDto> {}

export interface Lesson {
  id: string
  courseId: string
  title: string
  description?: string
  order: number
  isPublished?: boolean
}

export interface LessonListQuery extends PaginationQuery {
  courseId?: string
}
