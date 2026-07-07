import type { FC } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { Field, FieldLabel } from "@/components/shared/ui/field";
import { Progress } from "@/components/shared/ui/progress";

import {
  CalendarClock,
  ChevronRight,
  Grip,
  Paperclip,
  Pencil,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";
import { Label } from "@/components/shared/ui/label";
import { Input } from "@/components/shared/ui/input";
import { PriorityBadge } from "@/components/shared/custom/PriorityBadge";
import { TaskPriority } from "@/interfaces/project.interface";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";

interface Props {
  columnTitle: string;
  index: number;
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
}

export const TaskCard: FC<Props> = ({ id, index, title, columnTitle }) => {
  const { handleRef, ref } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: columnTitle,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  });
  // console.log("me renderice");
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-3 bg-background border border-gray-200 dark:border-gray-700 rounded-xl  ",
      )}
    >
      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          <Badge variant="outline">UI</Badge>
          <Badge variant="outline">Bug</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Web Design</Badge>
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
          {title}
        </h2>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex items-center gap-1">
          <CalendarClock className="size-3.5 " />
          <p className="text-xs">Nov 12</p>
        </div>
      </div>
      <p className="text-sm mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <Field className="w-full mt-6 ">
        <FieldLabel htmlFor="progress-upload">
          <span>Subtasks's completion</span>
          <span className="ml-auto">(2/5)</span>
        </FieldLabel>
        <Progress value={40} id="progress-upload" />
      </Field>
      <div className="flex justify-between mt-5">
        <div className="flex gap-2 items-center ">
          <PriorityBadge priority={TaskPriority.Low} />
          <div className="flex items-center gap-1">
            <Paperclip className="size-3" />
            <span className="text-xs">5</span>
          </div>
        </div>
        <AddTaskDialog category={{ name: "lol" }}>
          <Button size="icon" variant="outline" className="">
            {/* Inspect */}
            <ChevronRight />
          </Button>
        </AddTaskDialog>
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
