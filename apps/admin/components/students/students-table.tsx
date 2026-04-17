"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Plus, Search, Trash2, Eye } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { StudentUser } from "../../types/user";
import { mockStudents } from "../../lib/mock-data/students";
import { AddStudentDialog } from "./add-student-dialog";
import { EditStudentDialog } from "./edit-student-dialog";
import { DeleteUserDialog } from "../users/delete-user-dialog";
import { StudentProgressModal } from "./student-progress-modal";
import { ExcelExportButton } from "@workspace/ui/components/excel-export-button";
import { ExcelImportButton } from "@workspace/ui/components/excel-import-button";
import { DataTablePagination } from "@workspace/ui/components/data-table-pagination";

export function StudentsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [progressModalOpen, setProgressModalOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<StudentUser | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [gradeLevelFilter, setGradeLevelFilter] = React.useState<string>("all");

  // Data state
  const [data, setData] = React.useState<StudentUser[]>(mockStudents);

  // Định nghĩa columns
  const columns: ColumnDef<StudentUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "grade_level",
      header: "Grade Level",
      cell: ({ row }) => {
        const gradeLevel = row.getValue("grade_level") as string;
        const colorMap = {
          Beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
          Intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
          Advanced: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
        };
        return (
          <Badge variant="outline" className={colorMap[gradeLevel as keyof typeof colorMap]}>
            {gradeLevel}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "courses_enrolled",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Courses
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("courses_enrolled")}</div>;
      },
    },
    {
      accessorKey: "progress_percentage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Progress
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const progress = row.getValue("progress_percentage") as number;
        return (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-20" />
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: "total_score",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Score
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center font-medium">{row.getValue("total_score")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      accessorKey: "enrollment_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Enrolled
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("enrollment_date"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const student = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewProgress(student)}>
                <Eye className="mr-2 h-4 w-4" />
                View Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(student)}>
                Edit Student
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete(student)}
              >
                Delete Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Apply filters
  React.useEffect(() => {
    table.getColumn("status")?.setFilterValue(statusFilter);
  }, [statusFilter, table]);

  React.useEffect(() => {
    table.getColumn("grade_level")?.setFilterValue(gradeLevelFilter);
  }, [gradeLevelFilter, table]);

  // Handlers
  const handleAdd = (newData: any) => {
    console.log("Add student:", newData);
    // TODO: Call API to add student
    const newStudent: StudentUser = {
      id: `stud-${Date.now()}`,
      ...newData,
      role: "student" as const,
      courses_enrolled: 0,
      progress_percentage: 0,
      total_score: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setData([...data, newStudent]);
  };

  const handleEdit = (student: StudentUser) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedData: any) => {
    console.log("Edit student:", selectedStudent?.id, updatedData);
    // TODO: Call API to edit student
    setData(
      data.map((item) =>
        item.id === selectedStudent?.id ? { ...item, ...updatedData } : item
      )
    );
  };

  const handleDelete = (student: StudentUser) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete student:", selectedStudent?.id);
    // TODO: Call API to delete student
    setData(data.filter((item) => item.id !== selectedStudent?.id));
    setDeleteDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleBulkDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log("Bulk delete:", selectedRows.map((row) => row.original.id));
    // TODO: Call API to bulk delete students
    const selectedIds = selectedRows.map((row) => row.original.id);
    setData(data.filter((item) => !selectedIds.includes(item.id)));
    setRowSelection({});
  };

  const handleViewProgress = (student: StudentUser) => {
    setSelectedStudent(student);
    setProgressModalOpen(true);
  };

  const handleImport = (importedData: StudentUser[]) => {
    console.log("Import students:", importedData);
    // TODO: Call API to bulk create students
    setData([...data, ...importedData]);
  };

  // Excel export columns
  const exportColumns = [
    { key: "name" as keyof StudentUser, header: "Name" },
    { key: "email" as keyof StudentUser, header: "Email" },
    { key: "grade_level" as keyof StudentUser, header: "Grade Level" },
    { key: "enrollment_date" as keyof StudentUser, header: "Enrollment Date" },
    { key: "courses_enrolled" as keyof StudentUser, header: "Courses Enrolled" },
    { key: "progress_percentage" as keyof StudentUser, header: "Progress %" },
    { key: "total_score" as keyof StudentUser, header: "Total Score" },
    { key: "status" as keyof StudentUser, header: "Status" },
  ];

  // Excel import validator
  const importValidator = (row: any) => {
    const errors: string[] = [];

    if (!row.Name || row.Name.trim().length < 2) {
      errors.push("Name is required (min 2 characters)");
    }
    if (!row.Email || !row.Email.includes("@")) {
      errors.push("Valid email is required");
    }
    if (!row["Grade Level"] || !["Beginner", "Intermediate", "Advanced"].includes(row["Grade Level"])) {
      errors.push("Grade Level must be Beginner, Intermediate, or Advanced");
    }
    if (!row["Enrollment Date"]) {
      errors.push("Enrollment Date is required");
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const data: StudentUser = {
      id: `stud-${Date.now()}-${Math.random()}`,
      name: row.Name,
      email: row.Email,
      role: "student",
      grade_level: row["Grade Level"] as "Beginner" | "Intermediate" | "Advanced",
      enrollment_date: row["Enrollment Date"],
      courses_enrolled: 0,
      progress_percentage: 0,
      total_score: 0,
      status: row.Status === "inactive" ? "inactive" : "active",
      createdAt: new Date().toISOString().split("T")[0] || "",
    };

    return { valid: true, data };
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student List</CardTitle>
              <CardDescription>
                Danh sách tất cả học viên trong hệ thống
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <ExcelImportButton
                onImport={handleImport}
                validator={importValidator}
              />
              <ExcelExportButton
                data={data}
                filename="students"
                columns={exportColumns}
              />
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={(table.getColumn("name")?.getFilterValue() as string) || ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm pl-8"
              />
            </div>

            <Select value={gradeLevelFilter} onValueChange={setGradeLevelFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Grade Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            )}
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <DataTablePagination table={table} />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddStudentDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAdd}
      />
      <EditStudentDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
        student={selectedStudent}
      />
      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        user={selectedStudent}
      />
      <StudentProgressModal
        open={progressModalOpen}
        onOpenChange={setProgressModalOpen}
        student={selectedStudent}
      />
    </>
  );
}
