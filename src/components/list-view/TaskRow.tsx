import { Button } from "@/components/shared/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shared/ui/hover-card";
import { Progress } from "@/components/shared/ui/progress";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { useTaskCard } from "@/hooks/kanban/useTaskCard";
import { cn } from "@/lib/utils";
import { PriorityColors } from "@/utils/icon-colors";
import { Grip, Info, Siren } from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router";

interface Props {
  task: TaskEntity;
  index: number;
  category: CategoryEntity;
}
export const TaskRow: FC<Props> = ({ task, category, index }) => {
  const { handleRef, ref, boardSlug, projectSlug } = useTaskCard({
    task,
    category,
    index,
  });
  return (
    <div
      ref={ref}
      className="grid text-xs p-2 gap-3 items-center group/task-row hover:bg-foreground/5 transition-colors"
      style={{
        gridTemplateColumns: "5fr 60fr 8fr 12fr 15fr 8fr",
      }}
    >
      <div className=" ">
        <Button
          ref={handleRef}
          variant="ghost"
          size={"icon-sm"}
          className="cursor-grab"
        >
          <Grip />
        </Button>
      </div>
      <div className="flex gap-1 items-center">
        <Link
          to={`/projects/${projectSlug}/boards/${boardSlug}/tasks/${task.slug}`}
          className="text-sm group-hover/task-row:underline"
        >
          {task.title}
        </Link>
        <HoverCard>
          <HoverCardTrigger>
            <Button size={"icon-xs"} variant="ghost">
              <Info />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="flex w-64 flex-col gap-0.5">
            <div className="font-semibold">Description</div>
            <div>{task.description}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Created at{" "}
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div
        className={cn(PriorityColors[task.priority], "flex gap-2 items-center")}
      >
        <Siren className="size-4" />
        <p>{task.priority}</p>
      </div>
      <div className="flex items-center gap-2 ">
        <Progress className="" value={66} />
      </div>
      <p className="">
        {new Date(task.dueDate).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="">
        {new Date(task.dueDate).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "numeric",
        })}
      </p>
    </div>
  );
};
