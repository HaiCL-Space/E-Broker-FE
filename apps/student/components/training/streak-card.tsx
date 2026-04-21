export function StreakCard() {
  return (
    <div className="bg-[#f3f4f5] p-8 rounded-xl overflow-hidden group border border-[#e1e3e4]/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm text-[#424654] tracking-widest uppercase">
          Mục Tiêu Tuần
        </h3>
        <span className="material-symbols-outlined text-[#8b5000]">
          local_fire_department
        </span>
      </div>
      <div className="text-4xl font-extrabold text-[#191c1d] mb-2">
        12 Ngày
      </div>
      <p className="text-sm text-[#424654] mb-6">
        Chuỗi học tập dài nhất của bạn trong học kỳ này. Hãy tiếp tục phát huy!
      </p>
      <div className="flex justify-between gap-1">
        <div className="h-1 flex-1 bg-[#8b5000] rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000] rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000] rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000]/20 rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000]/20 rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000]/20 rounded-full"></div>
        <div className="h-1 flex-1 bg-[#8b5000]/20 rounded-full"></div>
      </div>
    </div>
  )
}
