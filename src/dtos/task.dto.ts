import { TaskPriority } from "@/interfaces/project.interface";
import z from "zod";
export enum TaskTag {
  UI = "UI",
  UX = "UX",
  Bug = "Bug",
  Feature = "Feature",
  Refactor = "Refactor",
  Documentation = "Documentation",
  Testing = "Testing",
  Research = "Research",
  Performance = "Performance",
  Security = "Security",
  API = "API",
  Authentication = "Authentication",
  Database = "Database",
  Container = "Container",
  Git = "Git",
  CSS = "CSS",
  Accessibility = "Accessibility",
  Responsive = "Responsive",
  Animation = "Animation",
  Deployment = "Deployment",
  Hotfix = "Hotfix",
  Optimization = "Optimization",
  Cleanup = "Cleanup",
}

export const TaskSchema = z.object({
  id: z.int().min(1),
  title: z.string().min(3),
  slug: z.string(),
  description: z.string().nonempty(),
  dueDate: z.date(),
  priority: z.enum(TaskPriority),
  tags: z.array(z.enum(TaskTag)),
  statusColumnId: z.int().min(1),
});

export const FormTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().nonempty(),
  dueDay: z.date(),
  dueTime: z.iso.time(),
  priority: z.enum(TaskPriority),
  tags: z.array(z.enum(TaskTag)),
});

export type TaskEntity = z.infer<typeof TaskSchema>;
export type FormTaskState = z.infer<typeof FormTaskSchema>;

export type SubmitTaskState = {
  title: string;
  slug: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  tags: TaskTag[];
};

// RESPONSES
export type CreateTaskResponse = {
  ok: boolean;
  message: string;
  task: TaskEntity;
};
