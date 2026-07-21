import { kanbanApplicationApi } from "@/api/kanban-application.api";

interface Props {
  categoryId: number;
  order: number;
}

export const updateCategoryOrderAction = async ({
  categoryId,
  order,
}: Props) => {
  const { data } = await kanbanApplicationApi.patch(
    `/categories/${categoryId}/change-order`,
    { order },
  );
  return data;
};
