import type { FC, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";
import { Badge } from "@/components/shared/ui/badge";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import { Button } from "@/components/shared/ui/button";

interface Props {
  title: string;
  children: ReactNode;
}

export const KanbanColumn: FC<Props> = ({ title, children }) => {
  const { ref } = useDroppable({
    id: title,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });
  return (
    <div className={cn("flex flex-col w-75  shrink-0 ")}>
      <div className="flex justify-between bg-background p-1 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <DynamicIcon
            name={"loader"}
            className="size-5 stroke-2 stroke-primary"
          />
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={"outline"}>49 Tasks</Badge>
          <AddTaskDialog category={{ name: title }}>
            <Button
              className="flex justify-center items-center size-8 rounded-full"
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
          "mt-3 h-full overflow-y-scroll custom-scrollbar--transparent ",
        )}
      >
        <div className="flex flex-col gap-3 max-h-10">{children}</div>
        {/* </div> */}
      </div>
    </div>
  );
};
