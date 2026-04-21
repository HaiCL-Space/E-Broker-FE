"use client"

import { useState } from "react"
import Link from "next/link"
import { Lesson, Game } from "@/lib/training-types"
import {
  X,
  ArrowLeft,
  ArrowRight,
  WorkspacePremium,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Zap,
} from "lucide-react"

interface LessonPlayerProps {
  lesson: Lesson
  specializationTitle: string
  programTitle: string
  onComplete?: () => void
}

export function LessonPlayer({
  lesson,
  specializationTitle,
  programTitle,
  onComplete,
}: LessonPlayerProps) {
  const [currentGameIndex, setCurrentGameIndex] = useState(lesson.lastGameIndex)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(1)

  const currentGame = lesson.games[currentGameIndex]
  const progress = Math.round(
    ((currentGameIndex + (showResult ? 1 : 0)) / lesson.games.length) * 100
  )

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const correct = currentGame.content.correctAnswer === selectedAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore((prev) => prev + 100 * streak)
      setStreak((prev) => prev + 1)
    } else {
      setStreak(1)
    }
  }

  const handleNext = () => {
    if (currentGameIndex < lesson.games.length - 1) {
      setCurrentGameIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex((prev) => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrect(false)
    }
  }

  const getOptionStyle = (index: number) => {
    const base =
      "group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-left border-2 flex items-center gap-4"

    if (showResult) {
      if (index === currentGame.content.correctAnswer) {
        return `${base} border-green-500 bg-green-50`
      }
      if (index === selectedAnswer && !isCorrect) {
        return `${base} border-red-500 bg-red-50`
      }
      return `${base} border-gray-200 opacity-60`
    }

    if (selectedAnswer === index) {
      return `${base} border-[#0040a1] bg-blue-50`
    }
    return `${base} border-transparent hover:border-[#0040a1]/20`
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,64,161,0.04)]">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/training/program/prog-1"
              className="p-2 hover:bg-blue-50/50 transition-all duration-300 rounded-full flex items-center justify-center"
            >
              <X className="w-6 h-6 text-[#0040a1]" />
            </Link>
            <div className="flex flex-col">
              <h1 className="font-bold tracking-tight text-slate-900 text-lg">
                {lesson.title}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {specializationTitle}
              </span>
            </div>
          </div>

          {/* Game Progress & Score */}
          <div className="flex items-center gap-6">
            {/* Progress dots */}
            <div className="flex items-center gap-3 bg-[#edeeef] px-4 py-2 rounded-full">
              <div className="flex -space-x-1">
                {lesson.games.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx < currentGameIndex
                        ? "bg-[#0040a1]"
                        : idx === currentGameIndex
                          ? "bg-[#0056d2]"
                          : "bg-[#c3c6d6]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0040a1]">
                {currentGameIndex + 1} / {lesson.games.length}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff9800]" fill="#ff9800" />
              <span className="font-bold text-[#ff9800]">{score}</span>
            </div>

            {/* Streak */}
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-[#ff9800]/10 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-[#ff9800]" />
                <span className="text-xs font-bold text-[#ff9800]">
                  {streak}x Streak
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-32">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Question Card */}
          <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden border border-[#e7e8e9]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0040a1]/5 rounded-bl-full" />

            <div className="relative z-10">
              <span className="text-xs font-bold text-[#0040a1] bg-[#0040a1]/10 px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">
                {currentGame.type === "quiz"
                  ? "Kiểm Tra Kiến Thức"
                  : currentGame.type === "fill-blank"
                    ? "Điền Từ"
                    : "Ghép Cặp"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#191c1d] mb-6">
                {currentGame.content.question}
              </h2>

              <p className="text-[#424654] leading-relaxed text-lg mb-8">
                {currentGame.type === "fill-blank" && currentGame.content.text}
              </p>

              {/* Image hint if available */}
              {currentGame.type === "quiz" && currentGame.content.image && (
                <div className="rounded-2xl overflow-hidden h-48 bg-[#f3f4f5] relative">
                  <img
                    alt="Hint"
                    src={currentGame.content.image}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Options Bento Grid */}
          <div className="md:col-span-5 grid grid-cols-1 gap-4 h-full">
            {currentGame.type === "quiz" &&
              currentGame.content.options?.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={getOptionStyle(idx)}
                  disabled={showResult}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-colors ${
                      showResult
                        ? idx === currentGame.content.correctAnswer
                          ? "bg-green-500 text-white"
                          : idx === selectedAnswer && !isCorrect
                            ? "bg-red-500 text-white"
                            : "bg-[#e7e8e9] text-[#737785]"
                        : selectedAnswer === idx
                          ? "bg-[#0040a1] text-white"
                          : "bg-[#f3f4f5] text-[#0040a1] group-hover:bg-[#0040a1] group-hover:text-white"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-semibold text-[#191c1d] flex-1">
                    {option}
                  </span>
                  {showResult && idx === currentGame.content.correctAnswer && (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  )}
                  {showResult &&
                    idx === selectedAnswer &&
                    !isCorrect && (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                </button>
              ))}

            {/* Fill blank input */}
            {currentGame.type === "fill-blank" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nhập đáp án..."
                  className="w-full p-4 rounded-xl border-2 border-[#e7e8e9] focus:border-[#0040a1] outline-none text-lg"
                  value={selectedAnswer === null ? "" : selectedAnswer}
                  onChange={(e) => {
                    const idx = currentGame.content.options?.indexOf(e.target.value) ?? -1
                    setSelectedAnswer(idx >= 0 ? idx : 0)
                  }}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#0040a1] text-white py-4 rounded-xl font-bold hover:bg-[#0056d2] transition-colors"
                >
                  Kiểm Tra
                </button>
              </div>
            )}

            {/* Match pairs */}
            {currentGame.type === "match" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {currentGame.content.pairs?.map((pair: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-[#e7e8e9]">
                      <span className="font-semibold text-[#0040a1]">{pair.trai}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hint Widget */}
            <div className="mt-2 p-4 rounded-2xl bg-[#e7e8e9]/60 backdrop-blur-sm border border-white/20 flex items-start gap-4">
              <Lightbulb className="w-5 h-5 text-[#ff9800]" />
              <div>
                <p className="text-[11px] font-bold text-[#ff9800] uppercase tracking-wider mb-1">
                  Gợi Ý
                </p>
                <p className="text-xs text-[#424654] font-medium leading-snug">
                  {currentGame.type === "quiz"
                    ? "Hãy suy nghĩ kỹ về từng lựa chọn trước khi trả lời."
                    : "Điền từ còn thiếu vào chỗ trống."}
                </p>
              </div>
            </div>

            {/* Submit Button (for quiz) */}
            {currentGame.type === "quiz" && !showResult && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`w-full py-4 rounded-xl font-bold transition-all mt-4 ${
                  selectedAnswer === null
                    ? "bg-[#e7e8e9] text-[#737785] cursor-not-allowed"
                    : "bg-[#0040a1] text-white hover:bg-[#0056d2] active:scale-[0.98]"
                }`}
              >
                Xác Nhận Đáp Án
              </button>
            )}

            {/* Result Feedback */}
            {showResult && (
              <div
                className={`p-6 rounded-2xl mt-4 ${
                  isCorrect
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                  <span
                    className={`font-bold text-xl ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "Chính Xác!" : "Chưa Đúng"}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-[#424654]">
                    Đáp án đúng là:{" "}
                    <span className="font-semibold">
                      {currentGame.content.options[currentGame.content.correctAnswer]}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-8">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentGameIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${
              currentGameIndex === 0
                ? "bg-[#e7e8e9] text-[#737785] cursor-not-allowed"
                : "bg-[#f3f4f5] text-[#0040a1] hover:bg-[#e7e8e9]"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay Lại</span>
          </button>

          {/* Centered Progress Bar */}
          <div className="flex-grow max-w-xl hidden md:block">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tiến Độ Bài Học
              </span>
              <span className="text-[10px] font-bold text-[#0040a1] uppercase tracking-widest">
                {progress}% Hoàn Thành
              </span>
            </div>
            <div className="h-2 w-full bg-[#e1e3e4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0040a1] to-[#0056d2] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!showResult && currentGame.type === "quiz"}
            className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold transition-all active:scale-95 ${
              showResult || currentGame.type !== "quiz"
                ? "bg-[#0040a1] text-white hover:bg-[#0056d2]"
                : "bg-[#c3c6d6]/30 text-[#737785] cursor-not-allowed"
            }`}
          >
            <span>
              {currentGameIndex === lesson.games.length - 1
                ? "Hoàn Thành"
                : "Tiếp Theo"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Achievement Toast */}
      {streak >= 2 && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[#ffdcbe] px-5 py-3 rounded-full shadow-lg border border-[#ff9800]/10 animate-bounce">
          <div className="w-8 h-8 rounded-lg bg-[#ff9800] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#653900] text-sm">
            {streak}x Streak Active!
          </span>
        </div>
      )}
    </div>
  )
}
