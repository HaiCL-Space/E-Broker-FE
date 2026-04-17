"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { Button } from "@workspace/ui/components/button";
import { Award, Download, BookOpen, Trophy } from "lucide-react";
import { StudentUser } from "../../types/user";
import { mockStudentProgress } from "../../lib/mock-data/student-progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StudentProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentUser | null;
}

export function StudentProgressModal({
  open,
  onOpenChange,
  student,
}: StudentProgressModalProps) {
  if (!student) return null;

  const progress = mockStudentProgress[student.id];

  if (!progress) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>{student.name}'s Learning Progress</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            Chưa có dữ liệu tiến độ học tập
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student.name}'s Learning Progress</DialogTitle>
        </DialogHeader>

        {/* Overview Stats - 4 cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Total Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.total_score}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.progress_percentage}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-500" />
                Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.courses_enrolled}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-500" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.certificates.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress Table */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progress.courses.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell className="font-medium">{course.courseName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={course.progress} className="w-24" />
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {course.score}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          course.status === "completed"
                            ? "default"
                            : course.status === "in_progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {course.status === "completed"
                          ? "Completed"
                          : course.status === "in_progress"
                          ? "In Progress"
                          : "Not Started"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(course.lastActivity).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Game Performance Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Game Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progress.gameResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="gameType"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: "12px" }}
                />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="bestScore" fill="#3b82f6" name="Best Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Certificates */}
        {progress.certificates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Certificates Earned ({progress.certificates.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {progress.certificates.map((cert) => (
                  <Card key={cert.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-sm">{cert.courseName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
