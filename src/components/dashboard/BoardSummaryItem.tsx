import type { BoardEntity } from "@/dtos/board.dtos";
import { cn } from "@/lib/utils";
import { iconColors, type IconColorComponents } from "@/utils/icon-colors";
import { CircleCheck, CircleDashed, CircleDot } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  board: BoardEntity;
}

export const BoardSummaryItem: FC<Props> = ({ board }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        iconColors[board.iconColor].bg,
        "flex flex-col gap-2 p-1 pb-2 rounded-2xl min-w-55 flex-1 max-w-60 cursor-pointer hover:-translate-y-1 opacity-90 hover:opacity-100 transition-transform overflow-hidden",
      )}
      onClick={() => navigate(`/boards/${board.slug}`)}
      title={`Go to ${board.name} board`}
    >
      <div
        className={cn(
          iconColors[board.iconColor].shadow,
          "flex flex-col gap-2 bg-background/85 p-4 rounded-xl ",
        )}
      >
        <div
          className={cn(
            iconColors[board.iconColor].bg,
            " p-2 rounded-full w-fit",
          )}
        >
          <DynamicIcon
            name={board.icon}
            className={cn(iconColors[board.iconColor].stroke, "size-5.5")}
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{board.name}</h3>
          <p className="text-xs text-muted-foreground">{board.description}</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <div className="flex gap-1 items-center">
            <CircleCheck className="size-4" />
            <span>6</span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleDashed className="size-4" />
            <span>6</span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleDot className="size-4" />
            <span>6</span>
          </div>
        </div>
      </div>
      <p
        className={cn(
          iconColors[board.iconColor].text,
          "text-sm font-semibold text-center",
        )}
      >
        5 TASKS
      </p>
    </div>
  );
};
