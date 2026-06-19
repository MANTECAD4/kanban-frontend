import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Kanban, ListTree, Plus } from "lucide-react";

export const BoardControls = () => {
  return (
    <>
      <Tabs defaultValue="kanban" className="">
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
    </>
  );
};
