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
import { ArrowUpDown, MoreHorizontal, Plus, Search, Trash2, Eye, Star } from "lucide-react";

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
import { InstructorUser } from "../../types/user";
import { mockInstructors } from "../../lib/mock-data/instructors";
import { AddInstructorDialog } from "./add-instructor-dialog";
import { EditInstructorDialog } from "./edit-instructor-dialog";
import { DeleteUserDialog } from "../users/delete-user-dialog";
import { InstructorCoursesModal } from "./instructor-courses-modal";
import { ExcelExportButton } from "@workspace/ui/components/excel-export-button";
import { ExcelImportButton } from "@workspace/ui/components/excel-import-button";
import { DataTablePagination } from "@workspace/ui/components/data-table-pagination";

export function InstructorsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [coursesModalOpen, setCoursesModalOpen] = React.useState(false);
  const [selectedInstructor, setSelectedInstructor] = React.useState<InstructorUser | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Data state
  const [data, setData] = React.useState<InstructorUser[]>(mockInstructors);

  // Định nghĩa columns
  const columns: ColumnDef<InstructorUser>[] = [
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
      accessorKey: "specialization",
      header: "Specialization",
      cell: ({ row }) => {
        const specialization = row.getValue("specialization") as string;
        return (
          <Badge variant="outline" className="font-normal">
            {specialization}
          </Badge>
        );
      },
    },
    {
      accessorKey: "courses_created",
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
        return <div className="text-center">{row.getValue("courses_created")}</div>;
      },
    },
    {
      accessorKey: "total_students",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Students
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("total_students")}</div>;
      },
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const rating = row.getValue("rating") as number;
        return (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        );
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
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const instructor = row.original;

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
              <DropdownMenuItem onClick={() => handleViewCourses(instructor)}>
                <Eye className="mr-2 h-4 w-4" />
                View Courses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(instructor)}>
                Edit Instructor
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete(instructor)}
              >
                Delete Instructor
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

  // Apply status filter
  React.useEffect(() => {
    table.getColumn("status")?.setFilterValue(statusFilter);
  }, [statusFilter, table]);

  // Handlers
  const handleAdd = (newData: any) => {
    console.log("Add instructor:", newData);
    // TODO: Call API to add instructor
    const newInstructor: InstructorUser = {
      id: `inst-${Date.now()}`,
      ...newData,
      role: "instructor" as const,
      courses_created: 0,
      total_students: 0,
      rating: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setData([...data, newInstructor]);
  };

  const handleEdit = (instructor: InstructorUser) => {
    setSelectedInstructor(instructor);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedData: any) => {
    console.log("Edit instructor:", selectedInstructor?.id, updatedData);
    // TODO: Call API to edit instructor
    setData(
      data.map((item) =>
        item.id === selectedInstructor?.id ? { ...item, ...updatedData } : item
      )
    );
  };

  const handleDelete = (instructor: InstructorUser) => {
    setSelectedInstructor(instructor);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete instructor:", selectedInstructor?.id);
    // TODO: Call API to delete instructor
    setData(data.filter((item) => item.id !== selectedInstructor?.id));
    setDeleteDialogOpen(false);
    setSelectedInstructor(null);
  };

  const handleBulkDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log("Bulk delete:", selectedRows.map((row) => row.original.id));
    // TODO: Call API to bulk delete instructors
    const selectedIds = selectedRows.map((row) => row.original.id);
    setData(data.filter((item) => !selectedIds.includes(item.id)));
    setRowSelection({});
  };

  const handleViewCourses = (instructor: InstructorUser) => {
    setSelectedInstructor(instructor);
    setCoursesModalOpen(true);
  };

  const handleImport = (importedData: InstructorUser[]) => {
    console.log("Import instructors:", importedData);
    // TODO: Call API to bulk create instructors
    setData([...data, ...importedData]);
  };

  // Excel export columns
  const exportColumns = [
    { key: "name" as keyof InstructorUser, header: "Name" },
    { key: "email" as keyof InstructorUser, header: "Email" },
    { key: "specialization" as keyof InstructorUser, header: "Specialization" },
    { key: "bio" as keyof InstructorUser, header: "Bio" },
    { key: "courses_created" as keyof InstructorUser, header: "Courses Created" },
    { key: "total_students" as keyof InstructorUser, header: "Total Students" },
    { key: "rating" as keyof InstructorUser, header: "Rating" },
    { key: "status" as keyof InstructorUser, header: "Status" },
    { key: "createdAt" as keyof InstructorUser, header: "Created At" },
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
    if (!row.Specialization) {
      errors.push("Specialization is required");
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const data: InstructorUser = {
      id: `inst-${Date.now()}-${Math.random()}`,
      name: row.Name,
      email: row.Email,
      role: "instructor",
      specialization: row.Specialization,
      bio: row.Bio || "",
      courses_created: 0,
      total_students: 0,
      rating: 0,
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
              <CardTitle>Instructor List</CardTitle>
              <CardDescription>
                Danh sách tất cả giảng viên trong hệ thống
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <ExcelImportButton
                onImport={handleImport}
                validator={importValidator}
              />
              <ExcelExportButton
                data={data}
                filename="instructors"
                columns={exportColumns}
              />
              <Button onClick={() => setAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Instructor
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
      <AddInstructorDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAdd}
      />
      <EditInstructorDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
        instructor={selectedInstructor}
      />
      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        user={selectedInstructor}
      />
      <InstructorCoursesModal
        open={coursesModalOpen}
        onOpenChange={setCoursesModalOpen}
        instructor={selectedInstructor}
      />
    </>
  );
}
