import type { FC, ReactNode, RefObject } from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import {
  Copy,
  Ellipsis,
  EllipsisVertical,
  Grip,
  Heart,
  Kanban,
  Pencil,
  Plus,
  Share2,
  Trash,
} from "lucide-react";
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
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from "@/components/shared/ui/speed-dial";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToHorizontalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";

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
    collisionPriority: CollisionPriority.High,
    modifiers: [
      RestrictToHorizontalAxis,
      RestrictToElement.configure({
        element: () => container.current,
      }),
    ],
  });
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
          {/* <ButtonGroup className="opacity-0 group-hover/header:opacity-100 transition-opacity">
            <EditCategoryPopover category={category}>
              <Button size="icon-sm" variant={"outline"}>
                <Pencil />
              </Button>
            </EditCategoryPopover>
            <DeleteCategoryDialog
              category={category}
              boardId={category.boardId}
            >
              <Button size="icon-sm" variant={"outline"}>
                <Trash />
              </Button>
            </DeleteCategoryDialog>
          </ButtonGroup> */}
          <Badge variant={"outline"}>{tasks.length} Tasks</Badge>
          <Button ref={handleRef} variant="outline" className="cursor-grab">
            <Grip />
          </Button>
          {/* <AddTaskDialog
            category={{ name: category.name, categoryId: category.id }}
          >
            <Button
              size="icon"
              className="flex justify-center items-center"
              variant={"ghost"}
            >
              <Plus className="size-4" />
            </Button>
          </AddTaskDialog> */}
          <SpeedDial side="bottom">
            <SpeedDialTrigger
              variant="ghost"
              className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-90 size-8"
            >
              <EllipsisVertical />
            </SpeedDialTrigger>
            <SpeedDialContent forceMount>
              <SpeedDialItem>
                <SpeedDialLabel className="text-xs">Add task</SpeedDialLabel>
                <AddTaskDialog
                  category={{ name: category.name, categoryId: category.id }}
                >
                  <SpeedDialAction variant="default" className="size-9 ">
                    <Plus />
                  </SpeedDialAction>
                </AddTaskDialog>
              </SpeedDialItem>
              <SpeedDialItem>
                <SpeedDialLabel className="text-xs">
                  Edit category
                </SpeedDialLabel>
                <EditCategoryPopover category={category}>
                  <SpeedDialAction variant="default" className="size-9 ">
                    <Pencil />
                  </SpeedDialAction>
                </EditCategoryPopover>
              </SpeedDialItem>
              <SpeedDialItem>
                <SpeedDialLabel className="text-xs">
                  Delete category
                </SpeedDialLabel>

                <DeleteCategoryDialog
                  category={category}
                  boardId={category.boardId}
                >
                  <SpeedDialAction variant="default" className="size-9 ">
                    <Trash />
                  </SpeedDialAction>
                </DeleteCategoryDialog>
              </SpeedDialItem>
            </SpeedDialContent>
          </SpeedDial>
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
