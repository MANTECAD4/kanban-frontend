import type { FC } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { cn } from "@/shared/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import { Progress } from "@/shared/components/ui/progress";

import {
  CalendarClock,
  Grip,
  MoveRight,
  MoveUpRight,
  Paperclip,
  Siren,
  SquareMousePointer,
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
} from "@/shared/components/ui/dialog";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { PriorityBadge } from "@/features/projects/components/PriorityBadge";
import { TaskPriority } from "@/features/projects/interfaces/projetc.interface";

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
        "flex flex-col p-3 bg-card border border-gray-200 dark:border-gray-700 rounded-xl  ",
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
        <Dialog>
          <DialogTrigger asChild>
            <h3 className="tezt-md font-semibold hover:underline hover:text-blue-400 cursor-pointer">
              {title}
            </h3>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue="https://ui.shadcn.com/docs/installation"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Inspect</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
        <AvatarGroup className="grayscale">
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
        </AvatarGroup>
        <div className="flex gap-2 items-center ">
          <div className="flex items-center gap-1">
            <Paperclip className="size-3" />
            <span className="text-xs">5</span>
          </div>
          <PriorityBadge priority={TaskPriority.Low} />
        </div>
      </div>
    </div>
  );
};
