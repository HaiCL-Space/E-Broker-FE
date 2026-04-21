// Game Types
export type GameType =
  | "quiz"
  | "fill-blank"
  | "match"
  | "sequence"
  | "hotspot"
  | "label"
  | "memory"
  | "word-scramble"
  | "crossword"
  | "swipe"
  | "branching"
  | "timed-sprint"

export type GameStatus = "pending" | "pass" | "fail"

export interface Game {
  id: string
  type: GameType
  title: string
  content: any
  score: number | null
  status: GameStatus
  passThreshold: number
  maxRetries?: number
  currentRetries?: number
}

// Lesson
export interface Lesson {
  id: string
  title: string
  description: string
  games: Game[]
  progress: number
  lastGameIndex: number
  isCompleted: boolean
}

// Specialization
export type SpecializationType = "basic" | "advanced"

export interface Specialization {
  id: string
  title: string
  description: string
  type: SpecializationType
  lessons: Lesson[]
  isLocked: boolean
  progress: number
  isCompleted: boolean
}

// Program
export interface Program {
  id: string
  title: string
  description: string
  thumbnail: string
  progress: number
  totalSpecializations: number
  completedSpecializations: number
  specializations: Specialization[]
}
