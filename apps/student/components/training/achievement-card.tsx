export function AchievementCard() {
  return (
    <div className="bg-white p-8 rounded-xl relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffe16d] opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
      <div className="relative">
        <div className="w-12 h-12 bg-[#ffe16d] rounded-xl flex items-center justify-center text-[#221b00] mb-6">
          <span className="material-symbols-outlined text-2xl">
            workspace_premium
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          Thành Tích Học Tập
        </h3>
        <p className="text-[#424654] text-sm mb-6 leading-relaxed">
          Bạn đang thuộc top 5% học viên xuất sắc nhất khóa học hiện tại.
        </p>
        <div className="flex -space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white"></div>
          <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white"></div>
          <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-white"></div>
          <div className="w-10 h-10 rounded-full bg-[#edeeef] flex items-center justify-center text-[10px] font-bold border-2 border-white">
            +42
          </div>
        </div>
      </div>
    </div>
  )
}
