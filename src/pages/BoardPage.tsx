import { AddCategoryDialog } from "@/components/category/AddCategoryDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Button } from "@/components/shared/ui/button";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";
import { KanbanView } from "@/views/KanbanView";
import { ListView } from "@/views/ListView";
import { Kanban, ListTree, Palette, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const BoardPage = () => {
  const [tasksView, setTasksView] = useState<string>("kanban");
  return (
    <div className="flex flex-col h-dvh pl-2 pr-4 pt-4.5 pb-1 ">
      <div className="flex items-center gap-2 mb-3">
        <SidebarTrigger className="" />

        <Separator orientation="vertical" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/project" className="text-gray-400">
                Intex Company
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Design for Landing Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Design for Landing Page</h1>
        {/* <div className="flex justify-center items-center size-12 p-3 aspect-squre bg-sky-700/20 rounded-full">
          <Palette className="stroke-sky-700 size-5" />
        </div> */}
      </div>

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
    </div>
  );
};
