export enum TaskPriority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Urgent = "URGENT",
}
export interface CreateProjectResponse {
  ok: boolean;
  message: string;
  project: Project;
}

interface Project {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
}
