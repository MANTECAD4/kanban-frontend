import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskItem } from "@/features/kanban/components/board/TaskItem";
import { Plus } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

export const BoardColumn = () => {
  return (
    <div className="flex flex-col w-80 p-2 shrink-0 ">
      <div className="flex justify-between p-1 my-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center gap-2">
          <DynamicIcon
            name="loader"
            className="size-5 stroke-2 stroke-primary"
          />
          <h2 className="text-sm font-semibold">In Progress</h2>
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
      <div className="mt-4 h-full overflow-y-scroll custom-scrollbar--transparent">
        <div className="flex flex-col gap-3 max-h-0 ">
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          {/* <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem /> */}
        </div>
      </div>
    </div>
  );
};
