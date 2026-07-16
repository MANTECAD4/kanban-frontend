import type { FC, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Kanban, Pencil, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "@/components/shared/ui/badge";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { TaskCard } from "@/components/kanban/TaskCard";
import { DeleteCategoryDialog } from "@/components/category/DeleteCategoryDialog";
import { EditCategoryPopover } from "@/components/category/EditCategoryPopover";

interface Props {
  category: CategoryEntity;
  tasks: TaskEntity[];
}

export const KanbanColumn: FC<Props> = ({ category, tasks }) => {
  if (!category) return;
  const { ref } = useDroppable({
    id: category.name,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });
  return (
    <div className={cn("flex flex-col w-82  shrink-0 ")}>
      <div className="group/header flex justify-between bg-background py-1 px-2 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
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
          <ButtonGroup className="opacity-0 group-hover/header:opacity-100 transition-opacity">
            <EditCategoryPopover>
              <Button size="icon-sm" variant={"outline"}>
                <Pencil />
              </Button>
            </EditCategoryPopover>
            <DeleteCategoryDialog category={category}>
              <Button size="icon-sm" variant={"outline"}>
                <Trash />
              </Button>
            </DeleteCategoryDialog>
          </ButtonGroup>
          <Badge variant={"outline"}>{tasks.length} Tasks</Badge>
          <AddTaskDialog
            category={{ name: category.name, categoryId: category.id }}
          >
            <Button
              size="icon"
              className="flex justify-center items-center"
              variant={"ghost"}
            >
              <Plus className="size-4" />
            </Button>
          </AddTaskDialog>
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          "relative mt-3 h-full overflow-y-scroll custom-scrollbar--transparent",
        )}
      >
        <div className="absolute top-1/2 left-1/2 -z-10 -translate-1/2 flex flex-col items-center gap-3 text-muted-foreground">
          <Kanban className=" size-20 stroke-muted-foreground" />
        </div>
        <div className="flex flex-col gap-3 max-h-10 pr-1">
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
