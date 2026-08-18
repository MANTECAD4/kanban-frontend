import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetTasksMetaByPriorityResponse } from "@/dtos/task.dto";

export const getTasksMetaByPriorityAction = async () => {
  const { data } =
    await kanbanApplicationApi.get<GetTasksMetaByPriorityResponse>(
      "/tasks/meta-priority",
    );
  return data;
};
