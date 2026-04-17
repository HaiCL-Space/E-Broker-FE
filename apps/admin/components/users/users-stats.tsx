"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Users, GraduationCap, BookOpen, UserCheck } from "lucide-react";

// Dữ liệu mẫu - sau này sẽ lấy từ API
const statsData = {
  total: 150,
  admins: 5,
  instructors: 25,
  students: 120,
  active: 135,
  inactive: 15,
};

export function UsersStats() {
  const stats = [
    {
      title: "Total Users",
      value: statsData.total,
      icon: Users,
      description: `${statsData.active} active, ${statsData.inactive} inactive`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Admins",
      value: statsData.admins,
      icon: UserCheck,
      description: "System administrators",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Instructors",
      value: statsData.instructors,
      icon: GraduationCap,
      description: "Course creators",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Students",
      value: statsData.students,
      icon: BookOpen,
      description: "Active learners",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
