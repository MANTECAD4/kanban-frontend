import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetUpcomingTasksResponse } from "@/dtos/task.dto";

export const getUpcomingTasksAction = async () => {
  const { data } =
    await kanbanApplicationApi.get<GetUpcomingTasksResponse>("/tasks/upcoming");
  return data;
};
