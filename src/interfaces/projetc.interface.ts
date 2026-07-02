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

export interface GetProjectsResponse {
  ok: boolean;
  message: string;
  projects: Project[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  icon: string;
  iconColor: string;
  slug: string;
  boards: null;
}
