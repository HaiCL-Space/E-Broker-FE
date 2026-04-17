"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "./button";

/**
 * Export data to Excel file
 */
function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns: { key: keyof T; header: string }[]
) {
  // Lazy load xlsx to reduce bundle size
  import("xlsx").then((XLSX) => {
    // Map data to column structure
    const exportData = data.map((row) => {
      const obj: Record<string, any> = {};
      columns.forEach((col) => {
        obj[col.header] = row[col.key];
      });
      return obj;
    });

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Download
    XLSX.writeFile(
      wb,
      `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  });
}

interface ExcelExportButtonProps<T extends Record<string, any>> {
  data: T[];
  filename: string;
  columns: { key: keyof T; header: string }[];
  disabled?: boolean;
}

export function ExcelExportButton<T extends Record<string, any>>({
  data,
  filename,
  columns,
  disabled = false,
}: ExcelExportButtonProps<T>) {
  const handleExport = () => {
    try {
      exportToExcel(data, filename, columns);
    } catch (error) {
      console.error("Export failed:", error);
      // TODO: Show error toast
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={disabled || data.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Export Excel
    </Button>
  );
}
