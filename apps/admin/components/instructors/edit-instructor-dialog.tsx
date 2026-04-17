"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { InstructorUser } from "../../types/user";

// Schema validation cho form edit
const editInstructorFormSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  specialization: z.string().min(2, "Chuyên môn phải có ít nhất 2 ký tự"),
  bio: z.string().min(10, "Tiểu sử phải có ít nhất 10 ký tự"),
  status: z.enum(["active", "inactive"], {
    required_error: "Vui lòng chọn trạng thái",
  }),
});

type EditInstructorFormValues = z.infer<typeof editInstructorFormSchema>;

interface EditInstructorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EditInstructorFormValues) => void;
  instructor: InstructorUser | null;
}

export function EditInstructorDialog({
  open,
  onOpenChange,
  onSubmit,
  instructor,
}: EditInstructorDialogProps) {
  const form = useForm<EditInstructorFormValues>({
    resolver: zodResolver(editInstructorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      bio: "",
      status: "active",
    },
  });

  // Cập nhật form khi instructor thay đổi
  React.useEffect(() => {
    if (instructor) {
      form.reset({
        name: instructor.name,
        email: instructor.email,
        specialization: instructor.specialization,
        bio: instructor.bio,
        status: instructor.status,
      });
    }
  }, [instructor, form]);

  const handleSubmit = (data: EditInstructorFormValues) => {
    onSubmit(data);
    onOpenChange(false);
  };

  if (!instructor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa giảng viên</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin giảng viên
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Tên */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specialization */}
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chuyên môn *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Web Development, Data Science, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiểu sử *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả ngắn về kinh nghiệm và chuyên môn..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
