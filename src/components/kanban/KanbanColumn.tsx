import { useEffect, type FC, type RefObject } from "react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Grip, Kanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { TaskCard } from "@/components/kanban/TaskCard";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToHorizontalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useDraggingStore } from "@/providers/store/dragging.store";
import { useMutation } from "@tanstack/react-query";
import { updateCategoryOrderAction } from "@/actions/category/update-category-order.action";
import { CategorySpeedDial } from "@/components/category/CategorySpeedDial";

interface Props {
  category: CategoryEntity;
  tasks: TaskEntity[];
  index: number;
  container: RefObject<HTMLDivElement | null>;
}

export const KanbanColumn: FC<Props> = ({
  category,
  tasks,
  index,
  container,
}) => {
  if (!category) return;
  const { ref, handleRef } = useSortable({
    index,
    id: category.name,
    type: "column",
    accept: ["item", "column"],
    collisionPriority: CollisionPriority.Low,
    modifiers: [
      RestrictToHorizontalAxis,
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

  return (
    <div
      className={cn("flex flex-col w-82  shrink-0  bg-background")}
      ref={ref}
    >
      <div className="group/header flex justify-between  py-1 px-2 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <DynamicIcon
            name={category.icon}
            className="size-5 stroke-2 stroke-primary shrink-0"
          />
          <h2 className="text-sm font-semibold" title={category.name}>
            {category.name.slice(0, 23)}
            {category.name.length >= 23 ? "..." : ""}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant={"outline"}>{tasks.length} Tasks</Badge>
          <Button ref={handleRef} variant="outline" className="cursor-grab">
            <Grip />
          </Button>
          <CategorySpeedDial category={category} />
        </div>
      </div>
      <div
        className={cn(
          "relative! mt-3 h-full  overflow-y-scroll custom-scrollbar--transparent",
        )}
      >
        <div className="absolute top-1/2 left-1/2 -z-10 -translate-1/2 flex flex-col items-center gap-3 text-muted-foreground">
          <Kanban className=" size-20 stroke-muted-foreground" />
        </div>
        <div className="flex flex-col gap-3 max-h-10 pr-1 ">
          {tasks.map((task, i) => (
            <TaskCard
              key={task.id}
              index={i}
              task={task}
              category={{ name: category.name, categoryId: category.id }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
