import { useEffect, type RefObject } from "react";
import type { CategoryEntity } from "@/dtos/category.dto";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  RestrictToHorizontalAxis,
  RestrictToVerticalAxis,
} from "@dnd-kit/abstract/modifiers";
import { CollisionPriority } from "@dnd-kit/abstract";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useDraggingStore } from "@/providers/store/dragging.store";
import { useMutation } from "@tanstack/react-query";
import { updateCategoryOrderAction } from "@/actions/category/update-category-order.action";

interface Props {
  category: CategoryEntity;
  index: number;
  orientation: "vertical" | "horizontal";
  container: RefObject<HTMLDivElement | null>;
}

export const useTaskCategory = ({
  category,
  index,
  orientation,
  container,
}: Props) => {
  const { ref, handleRef } = useSortable({
    index,
    id: category.name,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
    modifiers: [
      orientation === "vertical"
        ? RestrictToVerticalAxis
        : RestrictToHorizontalAxis,
      RestrictToElement.configure({
        element: () => container.current,
      }),
    ],
  });

  const insDraggingGlobal = useDraggingStore((state) => state.isDraggingColumn);
  const updateCategoryOrderMutation = useMutation({
    mutationFn: updateCategoryOrderAction,
  });
  useEffect(() => {
    if (!insDraggingGlobal && index !== category.order) {
      updateCategoryOrderMutation.mutate({
        categoryId: category.id,
        order: index,
      });
    }
  }, [insDraggingGlobal, index, category.id, category.order]);

  return { ref, handleRef };
};
