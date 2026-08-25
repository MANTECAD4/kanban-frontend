import { Button } from "@/components/shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { Skeleton } from "@/components/shared/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import { useGetUpcomingTasksQuery } from "@/hooks/queries/useGetUpcominTasksQuery";
import { cn } from "@/lib/utils";
import { getTimeBeforeDueDate } from "@/utils/get-time-before-due-date";
import { getUpcomingDateColor } from "@/utils/get-upcoming-date-color";
import { ClockArrowDown, RotateCcw, XCircle } from "lucide-react";
import { Link } from "react-router";

export const UpcomingDates = () => {
  const getUpcomingTasksQuery = useGetUpcomingTasksQuery();

  if (getUpcomingTasksQuery.isFetching)
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    );

  if (getUpcomingTasksQuery.isError)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XCircle />
          </EmptyMedia>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyDescription>
            Something went wrong while fetching your upcoming tasks. Please, try
            again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => getUpcomingTasksQuery.refetch()}
          >
            <RotateCcw />
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  return (
    <div className="flex flex-col gap-4">
      {getUpcomingTasksQuery.data?.tasks.map(({ task, board }) => {
        return (
          <div key={task.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={cn(
                      getUpcomingDateColor(task.dueDate),
                      "rounded-full size-2.5",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getTimeBeforeDueDate(task.dueDate)}</p>
                </TooltipContent>
              </Tooltip>
              <div>
                <Link to={`/boards/${board.slug}/tasks/${task.slug}`}>
                  <h3 className=" hover:underline text-sm">{task.title}</h3>
                </Link>
                <Link to={`/boards/${board.slug}`}>
                  <p className=" hover:underline text-xs text-muted-foreground">
                    {board.name}
                  </p>
                </Link>
              </div>
            </div>
            <span className="text-sm">
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};
