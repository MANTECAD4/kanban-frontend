import { updateTaskCategoryAction } from "@/actions/task/update-task-category.action";
import { updateTaskOrderAction } from "@/actions/task/update-task-order.action";
import type { TaskEntity } from "@/dtos/task.dto";
import { useDraggingStore } from "@/providers/store/dragging.store";
import { useSortable } from "@dnd-kit/react/sortable";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
  category: { name: string; categoryId: number };
  index: number;
  task: TaskEntity;
}

export const useTaskCard = ({
  task: { id: taskId },
  category: { categoryId, name: categoryName },
  index,
}: Props) => {
  const { handleRef, ref, isDragging } = useSortable({
    id: taskId,
    index,
    type: "item",
    accept: "item",
    group: categoryName,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  });

  const updateTaskCategoryMutation = useMutation({
    mutationFn: updateTaskCategoryAction,
  });
  const updateTaskOrderMutation = useMutation({
    mutationFn: updateTaskOrderAction,
  });

  const isDraggingGlobal = useDraggingStore((state) => state.isDraggingColumn);

  useEffect(() => {
    if (!isDragging) {
      updateTaskCategoryMutation.mutate({
        taskId: taskId,
        categoryId: categoryId,
      });
    }
  }, [isDragging, categoryId, taskId]);

  useEffect(() => {
    if (!isDraggingGlobal) {
      updateTaskOrderMutation.mutate({ taskId, order: index });
    }
  }, [isDraggingGlobal, index, taskId]);

  return {
    handleRef,
    ref,
  };
};
