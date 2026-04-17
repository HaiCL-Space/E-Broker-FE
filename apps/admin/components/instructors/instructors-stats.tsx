"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { GraduationCap, BookOpen, Users, Star } from "lucide-react";
import { mockInstructors } from "../../lib/mock-data/instructors";
import { mockInstructorCourses } from "../../lib/mock-data/instructor-courses";

export function InstructorsStats() {
  // Calculate stats from mock data
  const totalInstructors = mockInstructors.length;
  const activeInstructors = mockInstructors.filter(
    (i) => i.status === "active"
  ).length;

  // Calculate total active courses
  const totalActiveCourses = Object.values(mockInstructorCourses)
    .flat()
    .filter((c) => c.status === "active").length;

  // Calculate total students taught
  const totalStudentsTaught = mockInstructors.reduce(
    (sum, instructor) => sum + instructor.total_students,
    0
  );

  // Calculate average rating
  const avgRating =
    mockInstructors.reduce((sum, instructor) => sum + instructor.rating, 0) /
    mockInstructors.length;

  const stats = [
    {
      title: "Total Instructors",
      value: totalInstructors,
      icon: GraduationCap,
      description: `${activeInstructors} active, ${totalInstructors - activeInstructors} inactive`,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Active Courses",
      value: totalActiveCourses,
      icon: BookOpen,
      description: "Currently running",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Students Taught",
      value: totalStudentsTaught,
      icon: Users,
      description: "Across all courses",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Average Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      description: "Out of 5.0",
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
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
