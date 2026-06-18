import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Kanban, ListTree, Plus } from "lucide-react";

export const BoardControls = () => {
  return (
    <>
      <Tabs defaultValue="preview">
        <TabsList variant={"default"}>
          <TabsTrigger className="w-25" value="preview">
            <Kanban />
            Kanban
          </TabsTrigger>
          <TabsTrigger className="w-25" value="code">
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
