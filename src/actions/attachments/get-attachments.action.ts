import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { LoadAttachmentsResponse } from "@/dtos/attatchment.dto";

export const getAttachmentsAction = async (taskId: number) => {
  const { data } = await kanbanApplicationApi.get<LoadAttachmentsResponse>(
    `/attachments/in-task/${taskId}`,
  );

  return data;
};
