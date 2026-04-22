"use client"

import { useState } from "react"
import { mockPrograms } from "@/lib/training-mock-data"
import {
  TrainingTabs,
  TopicsView,
  RoadmapView,
  CatalogView,
  LearningProgressCard,
} from "@/components/training"

const tabs = [
  { id: "topics", label: "Chủ đề" },
  { id: "roadmap", label: "Lộ trình" },
  { id: "catalog", label: "Ca-ta-lô" },
]

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("topics")
  const featuredProgram = mockPrograms[0]!
  const otherPrograms = mockPrograms.slice(1)

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 sm:gap-8 px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Progress Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <LearningProgressCard program={featuredProgram} />
      </div>

      {/* Tabs Navigation  */}
      <TrainingTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "topics" && (
          <TopicsView 
            specializations={featuredProgram.specializations} 
            programId={featuredProgram.id}
          />
        )}
        {activeTab === "roadmap" && (
          <RoadmapView program={featuredProgram} />
        )}
        {activeTab === "catalog" && (
          <CatalogView programs={otherPrograms} />
        )}
      </div>
    </div>
  )
}
