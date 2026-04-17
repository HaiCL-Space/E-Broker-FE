"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Users, UserCheck, BookOpen, TrendingUp } from "lucide-react";
import { mockStudents } from "../../lib/mock-data/students";

export function StudentsStats() {
  // Calculate stats from mock data
  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(
    (s) => s.status === "active"
  ).length;

  // Calculate total enrollments
  const totalEnrollments = mockStudents.reduce(
    (sum, student) => sum + student.courses_enrolled,
    0
  );

  // Calculate average progress
  const avgProgress = Math.round(
    mockStudents.reduce((sum, student) => sum + student.progress_percentage, 0) /
      mockStudents.length
  );

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      description: `${activeStudents} active learners`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Active Learners",
      value: activeStudents,
      icon: UserCheck,
      description: "Currently enrolled",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Courses Enrolled",
      value: totalEnrollments,
      icon: BookOpen,
      description: "Total enrollments",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Average Progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      description: "Completion rate",
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
