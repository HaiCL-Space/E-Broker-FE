import { InstructorsTable } from "@/components/instructors/instructors-table";
import { InstructorsStats } from "@/components/instructors/instructors-stats";

export default function InstructorsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Instructors Management
          </h1>
          <p className="text-muted-foreground">
            Quản lý giảng viên và theo dõi hoạt động giảng dạy
          </p>
        </div>
      </div>

      {/* Stats */}
      <InstructorsStats />

      {/* Table */}
      <InstructorsTable />
    </div>
  );
}
