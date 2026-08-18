"use client";

import * as React from "react";
import { StickyNote, Summary, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/shared/ui/chart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/ui/tabs";
import { TasksPriorityData } from "@/components/board/task-charts/TasksPriorityData";

export const description = "A donut chart with text";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function TasksCharts() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card ring ring-muted p-5">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <Summary className="size-5" />
              <h2 className="text-sm font-semibold">Tasks summary</h2>
            </div>
          </div>
          <TabsList>
            <TabsTrigger value="analytics">Completion Status</TabsTrigger>
            <TabsTrigger value="overview">Task Priority</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <TasksPriorityData />
        </TabsContent>
        <TabsContent value="analytics">
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
                  dataKey="visitors"
                  nameKey="browser"
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
                              {totalVisitors.toLocaleString()}
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
              Showing 79 tasks from 7 boards
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
