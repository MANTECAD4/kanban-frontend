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

import { CalendarClock, Grip, Paperclip, Siren } from "lucide-react";

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
        <h3 className="tezt-md font-semibold hover:underline cursor-pointer">
          {title} - {index}
        </h3>
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
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <Paperclip className="size-3" />
            <span className="text-xs">5</span>
          </div>
          {/* <Badge
            className="bg-green-100 border-green-500 text-green-500"
            variant={"outline"}
          >
            <Siren />
            Low
          </Badge> */}
          {/* <Badge
            className="bg-yellow-100 border-yellow-500 text-yellow-500"
            variant={"outline"}
          >
            <Siren />
            Medium
          </Badge>
          <Badge
            className="bg-orange-100 border-orange-500 text-orange-500"
            variant={"outline"}
          >
            <Siren />
            High
          </Badge> */}
          <Badge
            className="bg-red-100 border-red-500 text-red-500"
            variant={"outline"}
          >
            <Siren />
            Urgent
          </Badge>
        </div>
      </div>
    </div>
  );
};
