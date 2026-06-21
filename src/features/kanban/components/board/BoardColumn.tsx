import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskItem } from "@/features/kanban/components/board/TaskItem";
import { useDroppable } from "@dnd-kit/react";
import { Plus } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { CollisionPriority } from "@dnd-kit/abstract";

import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  children: ReactNode;
}

export const BoardColumn: FC<Props> = ({ title, children }) => {
  const { isDropTarget, ref } = useDroppable({
    id: title,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });
  return (
    <div className="flex flex-col w-80 p-2 shrink-0 ">
      <div className="flex justify-between p-1 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <DynamicIcon
            name={"loader"}
            className="size-5 stroke-2 stroke-primary"
          />
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {/* <span className="flex items-center justify-center bg-red-300 text-red-800 rounded-xs aspect-square size-5">
            49
          </span> */}
          <Badge>49 Tasks</Badge>
          <Button
            className="flex justify-center items-center size-8 rounded-full"
            variant={"ghost"}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          isDropTarget ? "border-amber-700" : "",
          " mt-3 h-full overflow-y-scroll custom-scrollbar--transparent ",
        )}
      >
        <div className="flex flex-col gap-3 max-h-0">{children}</div>
        {/* </div> */}
      </div>
    </div>
  );
};
