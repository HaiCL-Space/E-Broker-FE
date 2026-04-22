"use client"

import {
    useOnlineClasses,
    type TabId,
    ClassSearch,
    ClassFilterTabs,
    QuickStats,
    ClassGroupedList,
    ClassEmptyState,
} from "@/components/online-classes"

export default function OnlineClassesPage() {
    const {
        tabs,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        groupedClasses,
        stats,
        hasResults,
    } = useOnlineClasses()

    return (
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-4 sm:gap-6 px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-headline font-bold text-slate-900 dark:text-slate-100">
                        Lớp học trực tuyến
                    </h1>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Quản lý và tham gia các lớp học trực tuyến của bạn
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                {/* Left Sidebar */}
                <div className="w-full lg:w-56 xl:w-60 flex-shrink-0 order-first lg:order-none">
                    <div className="lg:sticky lg:top-20 xl:top-24 space-y-3 sm:space-y-4">
                        <ClassSearch
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />

                        <ClassFilterTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={(id) => setActiveTab(id as TabId)}
                            stats={stats}
                        />

                        <QuickStats
                            upcoming={stats.upcoming}
                            scheduled={stats.scheduled}
                            history={stats.history}
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1 min-w-0">
                    {hasResults ? (
                        <ClassGroupedList groupedClasses={groupedClasses} />
                    ) : (
                        <ClassEmptyState
                            hasSearchQuery={!!searchQuery}
                            onClearSearch={() => setSearchQuery("")}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
