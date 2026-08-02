import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type {
  SubmitAttachmentsState,
  LoadAttachmentsResponse,
} from "@/dtos/attatchment.dto";

interface Props {
  taskId: number;
  submitData: SubmitAttachmentsState;
}

export const uploadAttachmentsAction = async ({
  taskId,
  submitData: { attachments },
}: Props) => {
  const formData = new FormData();
  attachments.forEach((attachment) =>
    formData.append("attachments", attachment),
  );

  const { data } = await kanbanApplicationApi.post<LoadAttachmentsResponse>(
    `/attachments/in-task/${taskId}`,
    formData,
  );
  return data;
};
