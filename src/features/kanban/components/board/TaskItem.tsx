import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { CalendarClock, Ellipsis, Paperclip } from "lucide-react";
import React from "react";

export const TaskItem = () => {
  return (
    <div className="flex flex-col p-3 bg-card border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          <Badge variant="outline">UI</Badge>
          <Badge variant="outline">Bug</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Web Design</Badge>
        </div>
        <Button className="rounded-full" variant={"ghost"}>
          <Ellipsis />
        </Button>
      </div>
      <h3 className="tezt-md font-semibold hover:underline cursor-pointer">
        Implement Responsive Design
      </h3>
      <div className="flex items-center gap-1 mt-1.5">
        <CalendarClock className="size-3.5 " />
        <p className="text-xs">Nov 12</p>
      </div>
      <p className="text-sm mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        unde exercitationem eos illum, molestiae nesciunt.
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
        </div>
      </div>
    </div>
  );
};
