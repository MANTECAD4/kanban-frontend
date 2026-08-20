import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { GetTasksMetaByCompletionResponse } from "@/dtos/task.dto";

export const getTasksMetaByCompletionAction = async () => {
  const { data } =
    await kanbanApplicationApi.get<GetTasksMetaByCompletionResponse>(
      `/tasks/meta-completion`,
    );
  return data;
};
