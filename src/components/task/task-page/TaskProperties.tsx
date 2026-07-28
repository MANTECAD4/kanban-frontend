import { Badge } from "@/components/shared/ui/badge";
import { Separator } from "@/components/shared/ui/separator";
import type { TaskEntity } from "@/dtos/task.dto";
import { Calendar, Clock, Flag, Siren, Tags } from "lucide-react";
import type { FC } from "react";

interface Props {
  task: TaskEntity;
}

export const TaskProperties: FC<Props> = ({ task }) => {
  return (
    <>
      <h2 className=" font-semibold">Properties</h2>
      <div className="flex flex-col gap-3 text-xs mt-4">
        <div className="flex justify-between py-2">
          <div className="flex gap-1 items-center">
            <Flag className="size-4" />
            <p>Priority</p>
          </div>
          <div className="flex gap-1 items-center">
            <Siren className="size-4" />
            <p>{task.priority}</p>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between  py-2">
          <div className="flex gap-1 items-center">
            <Calendar className="size-4" />
            <p>Due date</p>
          </div>
          <p className="font-semibold">
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <Separator />
        <div className="flex justify-between  py-2">
          <div className="flex gap-1 items-center">
            <Clock className="size-4" />
            <p>Due time</p>
          </div>
          <p className="font-semibold">
            {new Date(task.dueDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "numeric",
            })}
          </p>
        </div>
        <Separator />
        <div className="py-2">
          <div className="flex gap-1 items-center">
            <Tags className="size-4" />
            <p>Tags</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {task.tags.map((tag) => (
              <Badge key={tag} variant={"outline"}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
