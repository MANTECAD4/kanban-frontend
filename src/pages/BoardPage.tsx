import { DeleteBoardDialog } from "@/components/board/DeleteBoardDialog";
import { EditBoardDialog } from "@/components/board/EditBoardDialog";
import { AddCategoryDialog } from "@/components/category/AddCategoryDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";

import { useBoard } from "@/hooks/boards/useBoard";
import { KanbanView } from "@/views/KanbanView";
import { ListView } from "@/views/ListView";
import { Kanban, ListTree, Pencil, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const BoardPage = () => {
  const { projectSlug, projectName, getBoardQuery } = useBoard();
  const [tasksView, setTasksView] = useState<string>("kanban");
  if (!projectName || !getBoardQuery.data) return;
  return (
    <div className="flex flex-col h-dvh pl-2 pr-4 pt-4.5 pb-1 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 mb-3">
          <SidebarTrigger className="" />

          <Separator orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={`/projects/${projectSlug}`} className="text-gray-400">
                  {projectName}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{getBoardQuery.data.board.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 pb-8 group/header">
        <div className="flex gap-2 items-center">
          <h1 title="Edit board" className="text-2xl font-semibold text-start ">
            {getBoardQuery.data.board.name}
          </h1>
          <ButtonGroup className="opacity-0 group-hover/header:opacity-100 transition-opacity focus-within:opacity-100">
            <EditBoardDialog board={getBoardQuery.data.board}>
              <Button variant="outline" size="icon-sm">
                <Pencil />
              </Button>
            </EditBoardDialog>
            <DeleteBoardDialog
              board={getBoardQuery.data.board}
              projectSlug={projectSlug}
            >
              <Button variant="outline" size="icon-sm">
                <Trash />
              </Button>
            </DeleteBoardDialog>
          </ButtonGroup>
        </div>
        <p className="text-sm text-muted-foreground">
          {getBoardQuery.data.board.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
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
          <AddCategoryDialog className="" boardId={getBoardQuery.data.board.id}>
            <Button variant="ghost">
              <Plus />
              Add category
            </Button>
          </AddCategoryDialog>
        </div>
      </div>
      <div className="h-full p-2">
        {tasksView === "kanban" ? (
          <KanbanView boardId={getBoardQuery.data.board.id} />
        ) : (
          <ListView />
        )}
      </div>
    </div>
  );
};
