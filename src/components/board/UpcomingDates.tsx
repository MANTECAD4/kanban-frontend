import { Button } from "@/components/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shared/ui/tooltip";
import { useGetUpcomingTasksQuery } from "@/hooks/queries/useGetUpcominTasksQuery";
import { cn } from "@/lib/utils";
import { getTimeBeforeDueDate } from "@/utils/get-time-before-due-date";
import { getUpcomingDateColor } from "@/utils/get-upcoming-date-color";
import { ClockArrowDown, Info } from "lucide-react";
import { Link } from "react-router";

export const UpcomingDates = () => {
  const getUpcomingTasksQuery = useGetUpcomingTasksQuery();
  if (!getUpcomingTasksQuery.data) return;
  const {
    data: { tasks: upcomingTasks },
  } = getUpcomingTasksQuery;
  return (
    <div className="w-full flex flex-col gap-6 rounded-lg bg-card ring ring-muted p-5">
      <div className="flex items-center gap-2">
        <ClockArrowDown className="size-5" />
        <h2 className="text-sm font-semibold">Upcoming dates</h2>
      </div>
      <div className="flex flex-col gap-4">
        {upcomingTasks.map(({ task, board }) => {
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
    </div>
  );
};
