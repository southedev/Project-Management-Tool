import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const signUpSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters").refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match" }),
});

export const workspaceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  color: z.string().min(3, "Color must be at least 3 characters"),
  description: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  status: z.enum(["planning", "in progress", "completed", "on hold", "cancelled"]),
  startDate: z.string().min(10, "Start date is required"),
  dueDate: z.string().min(10, "Due date is required").optional(),
  members: z.object({ 
    user: z.string(),
    role: z.enum(["admin", "member", "owner", "viewer"]),
  }).optional(),
  tags: z.string().optional(),
});
