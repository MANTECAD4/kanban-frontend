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
import {
  CalendarClock,
  CircleDashed,
  CircleDot,
  Ellipsis,
  Loader,
  Paperclip,
  Plus,
  PlusCircle,
} from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

export const BoardColumn = () => {
  return (
    <div className=" w-80 p-2 shrink-0 ">
      <div className="flex justify-between p-1 my-2 border border-gray-200 rounded-lg">
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
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex flex-col p-3 bg-card border border-gray-200 rounded-xl">
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
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
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
              {/* <div className="flex items-center gap-1">
                <Paperclip className="size-3" />
                <span className="text-xs">5</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="p-2 bg-card border border-gray-200 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta quod
          architecto laboriosam voluptatem perspiciatis, facere, odit fuga non
          deleniti sunt doloribus nemo.
        </div>
        <div className="p-2 bg-card border border-gray-200 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta quod
          architecto laboriosam voluptatem perspiciatis, facere, odit fuga non
          deleniti sunt doloribus nemo.
        </div>
        <div className="p-2 bg-card border border-gray-200 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta quod
          architecto laboriosam voluptatem perspiciatis, facere, odit fuga non
          deleniti sunt doloribus nemo.
        </div>
        <div className="p-2 bg-card border border-gray-200 rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta quod
          architecto laboriosam voluptatem perspiciatis, facere, odit fuga non
          deleniti sunt doloribus nemo.
        </div>
      </div>
    </div>
  );
};
