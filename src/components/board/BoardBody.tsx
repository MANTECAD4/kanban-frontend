import { useState } from "react";

import { AddCategoryDialog } from "@/components/category/AddCategoryDialog";
import { Kanban, ListTree, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";
import { Button } from "@/components/shared/ui/button";
import { KanbanView } from "@/views/KanbanView";
import { ListView } from "@/views/ListView";

export const BoardBody = () => {
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
