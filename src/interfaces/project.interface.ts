import type { ProjectEntity } from "@/dtos/project.dto";

export enum TaskPriority {
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  Urgent = "URGENT",
}
export interface CreateProjectResponse {
  ok: boolean;
  message: string;
  project: ProjectEntity;
}

export interface GetProjectsResponse {
  ok: boolean;
  message: string;
  projects: ProjectEntity[];
}
export interface GetProjectBySlugResponse {
  ok: boolean;
  message: string;
  project: ProjectEntity;
}
export interface UpdateProjectResponse {
  ok: boolean;
  message: string;
  project: ProjectEntity;
}
export interface DeleteProjectResponse {
  ok: boolean;
  message: string;
  project: ProjectEntity;
}
