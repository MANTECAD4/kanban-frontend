import type { FC } from "react";

import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import { Separator } from "@/components/shared/ui/separator";
import {
  ChevronRight,
  Circle,
  CircleCheckBigIcon,
  CircleDot,
  Ellipsis,
} from "lucide-react";
import type { BoardEntity } from "@/dtos/board.dtos";
import { DynamicIcon } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { colors } from "@/utils/icon-colors";
import { EditBoardDialog } from "@/components/board/EditBoardDIalog";
import { Link } from "react-router";

interface Props {
  board: BoardEntity;
}

export const BoardItemCard: FC<Props> = ({ board }) => {
  const { id, description, icon, iconColor, name } = board;
  return (
    <div
      key={id}
      className="flex flex-col rounded-lg ring-1 ring-foreground/10 bg-background p-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              colors[iconColor].bg,
              colors[iconColor].border,
              "flex justify-center items-center size-12 p-3 aspect-square rounded-full",
            )}
          >
            <DynamicIcon name={icon} className={cn(colors[iconColor].stroke)} />
          </div>
          <h3 className="hover:underline cursor-pointer">
            <Link to={`/boards/${board.slug}`}>{name}</Link>
          </h3>
        </div>
        <EditBoardDialog board={board}>
          <Button size={"icon"} variant={"ghost"}>
            <Ellipsis />
          </Button>
        </EditBoardDialog>
      </div>
      <p className="text-sm text-muted-foreground mt-3">{description}</p>
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
