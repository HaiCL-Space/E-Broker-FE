export function NewsletterSection() {
  return (
    <section className="bg-[#0056d2] rounded-xl overflow-hidden p-12 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <svg
          className="w-full h-full text-white fill-current"
          viewBox="0 0 100 100"
        >
          <path d="M0 0 L100 0 L100 100 Z"></path>
        </svg>
      </div>
      <div className="max-w-2xl relative z-10 space-y-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Cập Nhật Xu Hướng Thị Trường
        </h2>
        <p className="text-white/80 text-lg">
          Tham gia cùng 4,000+ môi giới chuyên nghiệp nhận bản tin hàng tuần về
          chính sách pháp luật và xu hướng thị trường từ đội ngũ giảng viên hàng đầu.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 bg-white/10 border-0 rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/30 outline-none backdrop-blur-md"
            placeholder="Email của bạn"
            type="email"
          />
          <button className="px-8 py-4 bg-white text-[#0040a1] rounded-full font-bold hover:bg-[#f8f9fa] transition-colors">
            Đăng Ký Ngay
          </button>
        </div>
      </div>
    </section>
  )
}
