import { KanbanView } from "@/features/projects/views/KanbanView";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Kanban, ListTree, Plus } from "lucide-react";
import { useState } from "react";

export const ProjectBody = () => {
  const [tasksView, setTasksView] = useState<string>("kanban");
  return (
    <>
      <div className="flex items-center justify-between mt-8  ">
        <Tabs
          className=""
          value={tasksView}
          onValueChange={(value) => {
            setTasksView(value);
          }}
        >
          <TabsList variant={"line"}>
            <TabsTrigger className="w-25 pb-3 text-sm" value="kanban">
              <Kanban />
              Kanban
            </TabsTrigger>
            <TabsTrigger className="w-25 pb-3 text-sm" value="list">
              <ListTree />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div>
          <Button>
            <Plus />
            Add column
          </Button>
        </div>
      </div>
      <div className="h-full">
        {tasksView === "kanban" ? <KanbanView /> : <div>list</div>}
      </div>
    </>
  );
};
