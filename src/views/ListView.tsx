import { TaskPriority } from "@/interfaces/projetc.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/shared/ui/avatar";
import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import { Ellipsis, Plus } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import { PriorityBadge } from "@/components/shared/custom/PriorityBadge";

const categories = [
  {
    id: crypto.randomUUID(),
    title: "In progress",
    icon: "loader",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Implement responsive design",
      },
      {
        id: crypto.randomUUID(),
        title: "Improve performace",
      },
      {
        id: crypto.randomUUID(),
        title: "Finish JWT auth",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Under inspection",
    icon: "scan-search",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Implement Drag & Drop Feature",
      },
      {
        id: crypto.randomUUID(),
        title: "Adapt componen's styling",
      },
      {
        id: crypto.randomUUID(),
        title: "Implement responsive design",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Finished",
    icon: "circle-check",
    tasks: [],
  },
];
export const ListView = () => {
  return (
    <div className="h-full mt-2 overflow-y-scroll custom-scrollbar pr-1">
      <div className="flex flex-col gap-3 max-h-10">
        {categories.map((category) => (
          <div>
            <div className="flex border border-input justify-between items-center rounded-md bg-primary/10 py-1.5 px-3">
              <div className="flex gap-2 items-center">
                <DynamicIcon
                  name={category.icon}
                  className="size-3.5 stroke-2 stroke-primary"
                />
                <h2 className="text-sm font-semibold">{category.title}</h2>
              </div>
              <div className="flex gap-2 items-center">
                <Badge variant={"outline"}>3 Tasks</Badge>
                <Button
                  variant="ghost"
                  className={"size-6 aspect-square rounded-full"}
                >
                  <Ellipsis />
                </Button>
                <AddTaskDialog category={{ name: category.title }}>
                  <Button
                    variant="outline"
                    className={"size-6 aspect-square rounded-full"}
                  >
                    <Plus />
                  </Button>
                </AddTaskDialog>
              </div>
            </div>
            <div
              className="text-sm p-3"
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 40fr 12.5fr 12.5fr 12.5fr 12.5fr",
              }}
            >
              <div className="text-xs text-muted-foreground">Id</div>
              <div className="text-xs text-muted-foreground">Name</div>
              <div className="text-xs text-muted-foreground">Priority</div>
              <div className="text-xs text-muted-foreground">Progress</div>
              <div className="text-xs text-muted-foreground">Due date</div>
              <div className="text-xs text-muted-foreground">Assignees</div>
            </div>

            {category.tasks.map((task) => (
              <div
                className="text-sm p-3 hover:bg-foreground/5 transition-colors items-center rounded-lg"
                style={{
                  display: "grid",
                  gridTemplateColumns: "5fr 40fr 12.5fr 12.5fr 12.5fr 12.5fr",
                }}
              >
                <p className="uppercase">{task.id.slice(0, 5)}</p>
                <p>{task.title}</p>
                <PriorityBadge priority={TaskPriority.Low} />
                <div className="flex items-center gap-2">
                  <Progress className="w-6/10" value={66} />
                  <span>66%</span>
                </div>
                <p>Mon, 15 May 2026</p>
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
