import type { FC } from "react";

import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import { Separator } from "@/components/shared/ui/separator";
import {
  ChevronRight,
  Circle,
  CircleCheckBigIcon,
  CircleDot,
  Palette,
} from "lucide-react";

interface Props {
  board: string;
}

export const BoardItemCard: FC<Props> = ({ board }) => {
  return (
    <div
      key={board}
      className="flex flex-col rounded-lg ring-1 ring-foreground/10 bg-background p-5"
    >
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center size-12 p-3 aspect-squre bg-sky-700/20 rounded-lg">
          <Palette className="stroke-sky-700 size-5" />
        </div>
        <div>
          <h3>{board}</h3>
          {/* <Badge >5 tasks</Badge> */}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="flex flex-col gap-2 mt-5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <p className="">Progress</p>
          <span>66%</span>
        </div>
        <Progress value={66} className="first:bg-amber-900" />
        <Separator className="mt-3 mb-1" />
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="flex gap-1 items-center text-xs text-muted-foreground">
              <Circle className="size-4 stroke-muted-foreground" />
              <span>6</span>
            </div>
            <div className="flex gap-1 items-center text-xs text-muted-foreground">
              <CircleDot className="size-4 stroke-muted-foreground" />
              <span>6</span>
            </div>
            <div className="flex gap-1 items-center text-xs text-muted-foreground">
              <CircleCheckBigIcon className="size-4 stroke-muted-foreground" />
              <span>6</span>
            </div>
          </div>
          <Button variant="ghost" className="rounded-full size-7">
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
