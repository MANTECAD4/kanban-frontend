import { type FC, type RefObject } from "react";
import {
  Grip,
  Kanban,
  Plus,
  RotateCcw,
  StickyNotePlus,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { TaskCard } from "@/components/kanban/TaskCard";
import { CategorySpeedDial } from "@/components/category/CategorySpeedDial";
import { useTaskCategory } from "@/hooks/task-management/useTaskCategory";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";

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
  const { handleRef, ref } = useTaskCategory({
    category,
    container,
    index,
    orientation: "horizontal",
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
        {tasks.length === 0 ? (
          <div className="size-full flex justify-center items-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <StickyNotePlus />
                </EmptyMedia>
                <EmptyTitle>No tasks</EmptyTitle>
                <EmptyDescription>
                  You dont have any tasks here. Create some of them & start
                  working.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-2">
                <AddTaskDialog category={category}>
                  <Button variant="outline">
                    <Plus />
                    Create task
                  </Button>
                </AddTaskDialog>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-h-10 pr-1 ">
            {tasks.map((task, i) => (
              <TaskCard
                key={task.id}
                index={i}
                task={task}
                category={category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
