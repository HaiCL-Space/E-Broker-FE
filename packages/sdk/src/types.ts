import type { ErrorCode } from "./types/error-code.js"

export interface ApiError {
  statusCode: number
  errorCode: ErrorCode | "CONNECTION_ERROR"
  message: string
  timestamp: string
  path: string
}
