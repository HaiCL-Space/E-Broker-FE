"use client"

import * as React from "react"

import { NavMain } from "@workspace/ui/components/nav-main"
import { NavProjects } from "@workspace/ui/components/nav-projects"
import { NavUser } from "@workspace/ui/components/nav-user"
import { TeamSwitcher } from "@workspace/ui/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import {
  BarChart3,
  ChartPie,
  CircleUserRound,
  Notebook,
  ClipboardList,
  Table,
  NotepadText,
  Ticket,
  LayoutPanelTop,
  Languages,
  GalleryVerticalEndIcon,
  SearchIcon
} from "lucide-react"
import { Input } from "@workspace/ui/components/input"

// Dữ liệu mẫu cho E-learning platform
const data = {
  user: {
    name: "Admin User",
    email: "admin@elearning.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "E-Learning Platform",
      logo: (
        <GalleryVerticalEndIcon />
      ),
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <BarChart3 />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "User Management",
      url: "#",
      icon: <CircleUserRound />,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Instructors",
          url: "/instructors",
        },
        {
          title: "Students",
          url: "/students",
        },
      ],
    },
    {
      title: "Course Management",
      url: "#",
      icon: <Notebook />,
      items: [
        {
          title: "Courses",
          url: "/courses",
        },
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Lessons",
          url: "/lessons",
        },
      ],
    },
    {
      title: "Game Engine",
      url: "#",
      icon: <Ticket />,
      items: [
        {
          title: "Quiz",
          url: "/games/quiz",
        },
        {
          title: "Fill in Blank",
          url: "/games/fill-blank",
        },
        {
          title: "Match",
          url: "/games/match",
        },
        {
          title: "Sequence",
          url: "/games/sequence",
        },
        {
          title: "Hotspot",
          url: "/games/hotspot",
        },
        {
          title: "Label Image",
          url: "/games/label-image",
        },
        {
          title: "Memory Flip",
          url: "/games/memory-flip",
        },
        {
          title: "Word Scramble",
          url: "/games/word-scramble",
        },
        {
          title: "Crossword",
          url: "/games/crossword",
        },
        {
          title: "Swipe",
          url: "/games/swipe",
        },
        {
          title: "Branching",
          url: "/games/branching",
        },
        {
          title: "Timed Sprint",
          url: "/games/timed-sprint",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: <ChartPie />,
      items: [
        {
          title: "Student Progress",
          url: "/reports/progress",
        },
        {
          title: "Game Results",
          url: "/reports/games",
        },
        {
          title: "Course Analytics",
          url: "/reports/courses",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <LayoutPanelTop />,
      items: [
        {
          title: "Branding",
          url: "/settings/branding",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
        {
          title: "Integrations",
          url: "/settings/integrations",
        },
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Lọc menu items dựa trên từ khóa tìm kiếm và đánh dấu để mở menu
  const filteredNavMain = React.useMemo(() => {
    if (!searchQuery.trim()) return data.navMain

    const query = searchQuery.toLowerCase()

    return data.navMain.reduce((acc: any[], item) => {
      // Kiểm tra xem title có khớp không
      const titleMatches = item.title?.toLowerCase().includes(query)

      // Kiểm tra xem có items nào khớp không
      const filteredItems = item.items?.filter((subItem: any) =>
        subItem.title?.toLowerCase().includes(query)
      )

      // Thêm item nếu title khớp hoặc có items khớp
      if (titleMatches || (filteredItems && filteredItems.length > 0)) {
        acc.push({
          ...item,
          items: filteredItems && filteredItems.length > 0 ? filteredItems : item.items,
          // Tự động mở menu nếu title khớp hoặc có sub-items khớp
          isActive: true,
        })
      }

      return acc
    }, [])
  }, [searchQuery])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        {/* Thanh tìm kiếm */}
        <div className="px-2 py-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {data.projects.length > 0 && <NavProjects projects={data.projects} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
