import type { Project } from "@/dtos/project.dto";

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
export interface GetProjectBySlugResponse {
  ok: boolean;
  message: string;
  project: Project;
}
export interface UpdateProjectResponse {
  ok: boolean;
  message: string;
  project: Project;
}
