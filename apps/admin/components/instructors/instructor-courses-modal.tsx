"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Badge } from "@workspace/ui/components/badge";
import { Star } from "lucide-react";
import { InstructorUser } from "../../types/user";
import { mockInstructorCourses, InstructorCourse } from "../../lib/mock-data/instructor-courses";

interface InstructorCoursesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  instructor: InstructorUser | null;
}

export function InstructorCoursesModal({
  open,
  onOpenChange,
  instructor,
}: InstructorCoursesModalProps) {
  if (!instructor) return null;

  const courses = mockInstructorCourses[instructor.id] || [];
  const activeCourses = courses.filter((c) => c.status === "active");
  const completedCourses = courses.filter((c) => c.status === "completed");
  const draftCourses = courses.filter((c) => c.status === "draft");

  const renderCourseTable = (courseList: InstructorCourse[]) => {
    if (courseList.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          Không có khóa học nào
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead className="text-center">Students</TableHead>
            <TableHead className="text-center">Avg Progress</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseList.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell className="text-center">{course.students}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${course.avgProgress}%` }}
                    />
                  </div>
                  <span className="text-sm">{course.avgProgress}%</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(course.lastUpdated).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{instructor.name}'s Courses</DialogTitle>
          <DialogDescription>
            Danh sách {courses.length} khóa học đã tạo
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              Active ({activeCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft ({draftCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4">
            {renderCourseTable(activeCourses)}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {renderCourseTable(completedCourses)}
          </TabsContent>

          <TabsContent value="draft" className="mt-4">
            {renderCourseTable(draftCourses)}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
