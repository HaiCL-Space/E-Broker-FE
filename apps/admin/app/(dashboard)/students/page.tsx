import { StudentsTable } from "@/components/students/students-table";
import { StudentsStats } from "@/components/students/students-stats";

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Students Management
          </h1>
          <p className="text-muted-foreground">
            Quản lý học viên và theo dõi tiến độ học tập
          </p>
        </div>
      </div>

      {/* Stats */}
      <StudentsStats />

      {/* Table */}
      <StudentsTable />
    </div>
  );
}
