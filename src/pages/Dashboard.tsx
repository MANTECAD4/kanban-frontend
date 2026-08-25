import { AddBoardDialog } from "@/components/board/AddBoardDialog";
import { TasksCharts } from "@/components/board/task-charts/TasksCharts";
import { UpcomingDates } from "@/components/board/UpcomingDates";
import { BoardSummaryItem } from "@/components/dashboard/BoardSummaryItem";
import {
  Avatar,
  AvatarFallback,
  // AvatarImage,
} from "@/components/shared/ui/avatar";
import { Button } from "@/components/shared/ui/button";
import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/providers/store/auth.store";
import { getNameAbreviation } from "@/utils/get-name-abrev";
import { Kanban, Plus } from "lucide-react";

export const Dashboard = () => {
  const userName = useAuthStore((s) => s.name);
  const name = useAuthStore((state) => state.name);
  const getBoardsQuery = useGetBoardsQuery();
  if (!getBoardsQuery.data) return;
  return (
    <div className="min-h-dvh p-5">
      <div className="flex flex-col gap-4 m-auto max-w-5xl">
        <div className="flex items-center justify-between p-4 w-full ring ring-muted rounded-lg bg-card">
          <div className="flex gap-3  ">
            <Avatar size="lg">
              {/* <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              /> */}
              <AvatarFallback>
                {" "}
                {getNameAbreviation(userName ?? "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <h1 className="font-semibold">Welcome, {name} ✌</h1>
              <p className="text-sm text-muted-foreground">
                Create and manage your tasks.
              </p>
            </div>
          </div>
          <AddBoardDialog>
            <Button>
              <Plus />
              Create Board
            </Button>
          </AddBoardDialog>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TasksCharts />
          {/* <Separator orientation="vertical" /> */}
          <UpcomingDates />
          {/* <RecentActivityCard /> */}
        </div>
        {/* <Separator /> */}
        <div className="flex flex-col  gap-4 bg-card ring ring-muted rounded-lg p-5">
          <div className="flex gap-2 items-center">
            <Kanban className="size-4.5" />
            <h2 className="text-sm font-semibold">Boards - (8)</h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap ">
            {getBoardsQuery.data.boards.map((board) => (
              <BoardSummaryItem key={board.id} board={board} />
            ))}
            {/* <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CopyPlus />
              </EmptyMedia>
              <EmptyTitle>Ready to add your first board?</EmptyTitle>
              <EmptyDescription>
                A summary of your boards will appear here
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button>
                <Plus />
                Create Board
              </Button>
            </EmptyContent>
          </Empty> */}
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* {Object.entries(iconColors).map(([key, value]) => (
                <div
                  className={cn(
                    iconColors[key].bg,
                    "flex flex-col gap-2 p-1 pb-2 rounded-2xl min-w-55 flex-1 max-w-60 cursor-pointer hover:-translate-y-1 opacity-90 hover:opacity-100 transition-transform overflow-hidden",
                  )}
                >
                  <div
                    className={cn(
                      iconColors[key].shadow,
                      "flex flex-col gap-2 bg-background/85 p-4 rounded-xl ",
                    )}
                  >
                    <div
                      className={cn(
                        iconColors[key].bg,
                        " p-2 rounded-full w-fit",
                      )}
                    >
                      <DynamicIcon
                        name={"folder"}
                        className={cn(iconColors[key].stroke, "size-5.5")}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{key}</h3>
                      <p className="text-xs text-muted-foreground">
                        Some description
                      </p>
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
                      iconColors[key].text,
                      "text-sm font-semibold text-center",
                    )}
                  >
                    5 TASKS
                  </p>
                </div>
              ))} */
}
