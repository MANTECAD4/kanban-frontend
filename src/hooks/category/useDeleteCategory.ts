import { deleteCategoryAction } from "@/actions/category/delete-category.action";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
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
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const submitCategoryDeletion = (categoryId: number) => {
    toast.promise(deleteCategoryQuery.mutateAsync(categoryId), {
      loading: "Deleting category...",
    });
  };

  return { submitCategoryDeletion };
};
