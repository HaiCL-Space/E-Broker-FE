"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

/**
 * Import data from Excel file with validation
 */
async function importFromExcel<T>(
  file: File,
  validator: (row: any) => { valid: boolean; data?: T; errors?: string[] }
): Promise<{
  success: T[];
  errors: Array<{ row: number; errors: string[] }>;
}> {
  // Lazy load xlsx to reduce bundle size
  const XLSX = await import("xlsx");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
          reject(new Error("Failed to read file"));
          return;
        }
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          reject(new Error("No worksheet found"));
          return;
        }
        const worksheet = workbook.Sheets[firstSheetName];
        if (!worksheet) {
          reject(new Error("No worksheet found"));
          return;
        }
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const success: T[] = [];
        const errors: Array<{ row: number; errors: string[] }> = [];

        jsonData.forEach((row: any, index: number) => {
          const result = validator(row);
          if (result.valid && result.data) {
            success.push(result.data);
          } else if (result.errors) {
            errors.push({ row: index + 2, errors: result.errors }); // +2 for header + 0-index
          }
        });

        resolve({ success, errors });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

interface ExcelImportButtonProps<T> {
  onImport: (data: T[]) => void;
  validator: (row: any) => { valid: boolean; data?: T; errors?: string[] };
  disabled?: boolean;
}

export function ExcelImportButton<T>({
  onImport,
  validator,
  disabled = false,
}: ExcelImportButtonProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [previewData, setPreviewData] = React.useState<{
    success: T[];
    errors: Array<{ row: number; errors: string[] }>;
  } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const result = await importFromExcel(file, validator);
      setPreviewData(result);
      setOpen(true);
    } catch (error) {
      console.error("Import failed:", error);
      // TODO: Show error toast
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleConfirm = () => {
    if (previewData && previewData.success.length > 0) {
      onImport(previewData.success);
      setOpen(false);
      setPreviewData(null);
      // TODO: Show success toast
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setPreviewData(null);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || importing}
      >
        <Upload className="mr-2 h-4 w-4" />
        {importing ? "Đang xử lý..." : "Import Excel"}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Xem trước dữ liệu Import</DialogTitle>
            <DialogDescription>
              {previewData && (
                <>
                  {previewData.success.length} dòng hợp lệ,{" "}
                  {previewData.errors.length} dòng có lỗi
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {previewData && (
            <div className="space-y-4">
              {/* Success preview */}
              {previewData.success.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Dữ liệu hợp lệ ({previewData.success.length})
                  </h3>
                  <div className="border rounded-md max-h-60 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>STT</TableHead>
                          <TableHead>Dữ liệu</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.success.slice(0, 10).map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-mono text-xs">
                              {JSON.stringify(item)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {previewData.success.length > 10 && (
                      <div className="p-2 text-center text-sm text-muted-foreground">
                        ... và {previewData.success.length - 10} dòng khác
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Errors */}
              {previewData.errors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-destructive">
                    Dòng có lỗi ({previewData.errors.length})
                  </h3>
                  <div className="border rounded-md max-h-60 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dòng</TableHead>
                          <TableHead>Lỗi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {previewData.errors.map((error, index) => (
                          <TableRow key={index}>
                            <TableCell>{error.row}</TableCell>
                            <TableCell className="text-destructive">
                              {error.errors.join(", ")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!previewData || previewData.success.length === 0}
            >
              Import {previewData?.success.length || 0} dòng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
