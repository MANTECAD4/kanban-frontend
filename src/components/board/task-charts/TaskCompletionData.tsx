import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shared/ui/chart";
import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { useGetTasksMetaByCompletionQuery } from "@/hooks/queries/useGetTasksMetaByCompletionQuery";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
export const TasksCompletionData = () => {
  const getBoardsQuery = useGetBoardsQuery();
  const getTasksMetaByCompletionQuery = useGetTasksMetaByCompletionQuery();

  const [totalTasks, chartData, chartConfig] = useMemo(() => {
    let totalTasks;
    let chartData;
    let chartConfig: Record<string, { label: string; color: string }> = {};
    if (getTasksMetaByCompletionQuery.data) {
      const {
        data: {
          meta: { total, ...rest },
        },
      } = getTasksMetaByCompletionQuery;
      totalTasks = total;
      chartData = Object.entries(rest).map(
        ([completionCategory, numTasks], index) => ({
          completionCategory,
          numTasks,
          fill: `var(--chart-${index})`,
        }),
      );
      Object.keys(rest).forEach((completionCategory, index) => {
        console.log({ completionCategory, index });
        chartConfig[completionCategory] = {
          label:
            completionCategory === "notApplicable"
              ? "N/A"
              : completionCategory.toUpperCase(),
          color: `var(--chart-${index})`,
        };
      });
    }
    return [totalTasks, chartData, chartConfig];
  }, [getTasksMetaByCompletionQuery.data]);

  const numBoards = getBoardsQuery.data?.meta.total;
  if (
    numBoards === undefined ||
    totalTasks === undefined ||
    !chartData ||
    !chartConfig
  )
    return;

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
