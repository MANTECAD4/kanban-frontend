"use client";

import { Summary } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/ui/tabs";
import { TasksPriorityData } from "@/components/dashboard/task-charts/TasksPriorityData";
import { TasksCompletionData } from "@/components/dashboard/task-charts/TaskCompletionData";

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
