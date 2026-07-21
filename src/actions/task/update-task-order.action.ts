import { kanbanApplicationApi } from "@/api/kanban-application.api";

interface Props {
  taskId: number;
  order: number;
}

export const updateTaskOrderAction = async ({ taskId, order }: Props) => {
  const { data } = await kanbanApplicationApi.patch(
    `/tasks/${taskId}/change-order`,
    { order },
  );
  return data;
};
