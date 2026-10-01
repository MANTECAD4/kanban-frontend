import type { BoardEntity } from "@/dtos/board.dtos";
import { cn } from "@/lib/utils";
import { iconColors } from "@/utils/icon-colors";
import {
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleQuestionMark,
} from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import type { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  board: BoardEntity;
}

export const BoardSummaryItem: FC<Props> = ({
  board: { description, icon, iconColor, name, slug, meta },
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        iconColors[iconColor].bg,
        "flex flex-col gap-2 p-1 pb-2 rounded-2xl min-w-55 flex-1 max-w-60 cursor-pointer hover:-translate-y-1 opacity-90 hover:opacity-100 transition-transform overflow-hidden",
      )}
      onClick={() => navigate(`/boards/${slug}`)}
      title={`Go to ${name} board`}
    >
      <div
        className={cn(
          iconColors[iconColor].shadow,
          "flex flex-col gap-2 bg-background/85 p-4 rounded-xl min-h-40",
        )}
      >
        <div
          className={cn(iconColors[iconColor].bg, " p-2 rounded-full w-fit")}
        >
          <DynamicIcon
            name={icon}
            className={cn(iconColors[iconColor].stroke, "size-5.5")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{name}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <div className="flex gap-1 items-center">
            <CircleCheck className="size-4" />
            <span>{meta?.numCompletedTasks ?? -1}</span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleDashed className="size-4" />
            <span>{meta?.numStartedTasks ?? -1}</span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleDot className="size-4" />
            <span>{meta?.numNotStartedTasks ?? -1}</span>
          </div>
          <div className="flex gap-1 items-center">
            <CircleQuestionMark className="size-4" />
            <span>{meta?.numNotApplicableTasks ?? -1}</span>
          </div>
        </div>
      </div>
      <p
        className={cn(
          iconColors[iconColor].text,
          "text-sm font-semibold text-center",
        )}
      >
        {meta?.total ?? -1} TASKS
      </p>
    </div>
  );
};
