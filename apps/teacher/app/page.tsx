import { redirect } from "next/navigation"

/**
 * Trang chủ - Chuyển hướng đến trang đăng nhập
 */
export default function HomePage() {
  redirect("/login")
}
