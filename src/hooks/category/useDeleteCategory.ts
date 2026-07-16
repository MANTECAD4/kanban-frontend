import { deleteCategoryAction } from "@/actions/category/delete-category.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteCategory = (boardId: number) => {
  const deleteCategoryQuery = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: (data) => {
      const { category } = data;
      kanbanQueryClient.invalidateQueries({
        queryKey: ["in-board", boardId, "categories"],
      });
      toast.success(`Category "${category.name}" deleted successfully`);
    },
  });

  const submitCategoryDeletion = (categoryId: number) => {
    deleteCategoryQuery.mutate(categoryId);
  };

  return { submitCategoryDeletion };
};
