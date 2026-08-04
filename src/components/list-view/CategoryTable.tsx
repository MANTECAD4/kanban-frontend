import { CategorySpeedDial } from "@/components/category/CategorySpeedDial";
import { TaskRow } from "@/components/list-view/TaskRow";
import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { useTaskCategory } from "@/hooks/task-management/useTaskCategory";
import { Ellipsis, Grip } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC, RefObject } from "react";

interface Props {
  originalCategoryRegister: CategoryEntity;
  sortedTasks: TaskEntity[];
  index: number;
  container: RefObject<HTMLDivElement | null>;
}

export const CategoryTable: FC<Props> = ({
  originalCategoryRegister: category,
  sortedTasks,
  index,
  container,
}) => {
  const { ref, handleRef } = useTaskCategory({
    index,
    container,
    category,
    orientation: "vertical",
  });
  return (
    <div ref={ref} className="bg-background">
      <div className="flex border border-input justify-between items-center rounded-md bg-primary/10 py-1.5 px-3">
        <div className="flex gap-2 items-center">
          <DynamicIcon
            name={category.icon}
            className="size-4 stroke-2 stroke-primary"
          />
          <h2 className="text-sm font-semibold">{category.name}</h2>
        </div>
        <div className="flex gap-2 items-center ">
          <Badge variant={"outline"}>{category.tasks.length} Tasks</Badge>
          <CategorySpeedDial category={category} />
          <AddTaskDialog category={category}>
            <Button
              variant="outline"
              size="icon-sm"
              ref={handleRef}
              className="cursor-grab"
            >
              <Grip />
            </Button>
          </AddTaskDialog>
        </div>
      </div>
      <div
        className="grid  p-2 gap-3 items-center text-xs text-muted-foreground "
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 60fr 8fr 12fr 15fr 8fr",
        }}
      >
        <div />
        <div className="">Name</div>
        <div className="text-xs text-muted-foreground ">Priority</div>
        <div className="text-xs text-muted-foreground ">Progress</div>
        <div className="text-xs text-muted-foreground ">Due Day</div>
        <div className="text-xs text-muted-foreground ">Due Time</div>
      </div>

      {sortedTasks.map((task, index) => (
        <TaskRow key={task.id} task={task} category={category} index={index} />
      ))}
    </div>
  );
};
