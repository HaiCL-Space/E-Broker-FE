// Base user fields (common to all roles)
type BaseUser = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
  avatar?: string;
};

// Admin user type
export type AdminUser = BaseUser & {
  role: "admin";
  permissions: string[];
  lastLogin?: string;
};

// Instructor user type
export type InstructorUser = BaseUser & {
  role: "instructor";
  specialization: string;
  bio: string;
  courses_created: number;
  total_students: number;
  rating: number; // 0-5
};

// Student user type
export type StudentUser = BaseUser & {
  role: "student";
  enrollment_date: string;
  grade_level: "Beginner" | "Intermediate" | "Advanced";
  courses_enrolled: number;
  progress_percentage: number; // 0-100
  total_score: number;
};

// Union type for all users
export type User = AdminUser | InstructorUser | StudentUser;

// Type guards
export const isInstructor = (user: User): user is InstructorUser =>
  user.role === "instructor";

export const isStudent = (user: User): user is StudentUser =>
  user.role === "student";

export const isAdmin = (user: User): user is AdminUser => user.role === "admin";
