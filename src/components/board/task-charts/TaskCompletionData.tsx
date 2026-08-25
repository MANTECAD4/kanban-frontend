import { Button } from "@/components/shared/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/ui/chart";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useTaskMetaByCompletion } from "@/hooks/dashboard/useTaskMetaByCompletion";
import { RotateCcw, XCircle } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
export const TasksCompletionData = () => {
  const {
    chartConfig,
    chartData,
    numBoards = 0,
    totalTasks = 0,
    isFetchingBoards,
    isFetchingTasksMeta,
    isErrorBoards,
    isErrorTasksMeta,
    refetchQuery,
  } = useTaskMetaByCompletion();

  if (isFetchingBoards || isFetchingTasksMeta)
    return (
      <div className="flex flex-col gap-4 items-center mt-3">
        <Skeleton className="size-50 rounded-full" />
        <div className="flex flex-col gap-3 w-full items-center">
          <Skeleton className="w-6/10 h-5 " />
          <Skeleton className="w-8/10 h-5 " />
        </div>
      </div>
    );

  if (isErrorBoards || isErrorTasksMeta || !chartData)
    return (
      <Empty className="mt-3">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XCircle />
          </EmptyMedia>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyDescription>
            Something went wrong while fetching tasks's completion meta-data.
            Try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => refetchQuery()}>
            <RotateCcw />
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    );

  return (
    <>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="numTasks"
              nameKey="completionCategory"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col  gap-2 text-sm text-center">
        <p className="leading-none font-medium">Busy days, aren't they?</p>
        <p className="leading-none text-muted-foreground">
          Showing {totalTasks} tasks from {numBoards} boards
        </p>
      </div>
    </>
  );
};
