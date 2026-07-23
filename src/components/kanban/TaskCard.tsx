import type { FC } from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { Field, FieldLabel } from "@/components/shared/ui/field";
import { Progress } from "@/components/shared/ui/progress";

import { CalendarClock, ChevronRight, Grip, Paperclip } from "lucide-react";

import { PriorityBadge } from "@/components/shared/custom/PriorityBadge";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import type { TaskEntity } from "@/dtos/task.dto";
import { useTaskCard } from "@/hooks/kanban/useTaskCard";
import { Link } from "react-router";

interface Props {
  category: { name: string; categoryId: number };
  index: number;
  task: TaskEntity;
}

export const TaskCard: FC<Props> = ({ task, index, category }) => {
  const { handleRef, ref, boardSlug, projectSlug } = useTaskCard({
    task,
    category,
    index,
  });
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-3 bg-background border border-gray-200 dark:border-gray-700 rounded-xl",
      )}
    >
      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          ref={handleRef}
          className="hover:cursor-grab aspect-square size-7"
          variant={"outline"}
        >
          <Grip />
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <h2 className="tezt-md font-semibold hover:underline hover:text-blue-400 cursor-pointer">
          {task.title}
        </h2>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex items-center gap-1">
          <CalendarClock className="size-3.5 " />
          <p className="text-xs">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <p className="text-sm mt-3">{task.description}</p>
      <Field className="w-full mt-6 ">
        <FieldLabel htmlFor="progress-upload">
          <span>Subtasks's completion</span>
          <span className="ml-auto">(2/5)</span>
        </FieldLabel>
        <Progress value={40} id="progress-upload" />
      </Field>
      <div className="flex justify-between mt-5">
        <div className="flex gap-2 items-center ">
          <PriorityBadge priority={task.priority} />
          <div className="flex items-center gap-1">
            <Paperclip className="size-3" />
            <span className="text-xs">5</span>
          </div>
        </div>
        <Link
          to={`/projects/${projectSlug}/boards/${boardSlug}/tasks/${task.slug}`}
        >
          <Button size="icon-lg" variant="outline" className="">
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

{
  /* <AvatarGroup className="grayscale">
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup> */
}
