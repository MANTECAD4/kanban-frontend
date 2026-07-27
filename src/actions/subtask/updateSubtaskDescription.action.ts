import { kanbanApplicationApi } from "@/api/kanban-application.api";
import type {
  SubmitSubtaskState,
  UpdateSubtaskResponse,
} from "@/dtos/subtask.dto";

interface Props {
  subtaskId: number;
  submitData: SubmitSubtaskState;
}

export const updateSubtaskDescriptionAction = async ({
  subtaskId,
  submitData,
}: Props) => {
  const { data } = await kanbanApplicationApi.patch<UpdateSubtaskResponse>(
    `/subtasks/${subtaskId}/change-description`,
    submitData,
  );
  return data;
};
