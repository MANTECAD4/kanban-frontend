import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type { DeleteAttachmentResponse } from "@/dtos/attatchment.dto";

export const deleteAttachmentAction = async (attachmentId: number) => {
  const { data } = await kanbanApplicationApi.delete<DeleteAttachmentResponse>(
    `/attachments/${attachmentId}`,
  );
  return data;
};
