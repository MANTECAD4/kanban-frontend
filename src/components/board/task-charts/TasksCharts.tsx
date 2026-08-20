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
import { TasksCompletionData } from "@/components/board/task-charts/TaskCompletionData";

export const description = "A donut chart with text";

export function TasksCharts() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-card ring ring-muted p-5">
      <Tabs defaultValue="priority" className="w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <Summary className="size-5" />
              <h2 className="text-sm font-semibold">Tasks summary</h2>
            </div>
          </div>
          <TabsList>
            <TabsTrigger value="status">Completion Status</TabsTrigger>
            <TabsTrigger value="priority">Task Priority</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="priority">
          <TasksPriorityData />
        </TabsContent>
        <TabsContent value="status">
          <TasksCompletionData />
        </TabsContent>
      </Tabs>
    </div>
  );
}
