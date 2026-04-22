import { redirect } from "next/navigation"

/**
 * Trang chủ - Chuyển hướng đến dashboard
 */
export default function HomePage() {
  redirect("/dashboard")
}
