import { useState } from "react";

import { AddCategoryDialog } from "@/features/projects/components/AddCategoryDialog";
import { KanbanView } from "@/features/projects/views/KanbanView";
import { ListView } from "@/features/projects/views/ListView";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Kanban, ListTree, Plus } from "lucide-react";

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
            <TabsTrigger
              className="w-25 py-4 text-sm cursor-pointer"
              value="kanban"
            >
              <Kanban />
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="w-25 py-4 text-sm cursor-pointer"
              value="list"
            >
              <ListTree />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div>
          <AddCategoryDialog className="py-5">
            <Button>
              <Plus />
              Add category
            </Button>
          </AddCategoryDialog>
        </div>
      </div>
      <div className="h-full p-2">
        {tasksView === "kanban" ? <KanbanView /> : <ListView />}
      </div>
    </>
  );
};
