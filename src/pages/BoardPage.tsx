import { DeleteBoardDialog } from "@/components/board/DeleteBoardDialog";
import { EditBoardDialog } from "@/components/board/EditBoardDialog";
import { AddCategoryPopover } from "@/components/category/AddCategoryPopover";
import { CustomDragDropProvider } from "@/components/shared/custom/CustomDragDropProvider";
import { PageBreadcrumbs } from "@/components/shared/custom/PageBreadcrumb";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs";

import { useBoard } from "@/hooks/boards/useBoard";
import { useBoardContentManagement } from "@/hooks/task-management/useBoardContentManagement";
import {
  useBoardModeStore,
  type Mode,
} from "@/providers/store/board-mode.store";
import { KanbanView } from "@/views/KanbanView";
import { ListView } from "@/views/ListView";
import { Kanban, ListTree, Pencil, Plus, Trash } from "lucide-react";

export const BoardPage = () => {
  const { getBoardQuery } = useBoard();
  const boardMode = useBoardModeStore((state) => state.boardMode);
  const setBoardMode = useBoardModeStore((state) => state.setBoardMode);
  const { setColumnOrder, setBoardColumns, ...restProps } =
    useBoardContentManagement(getBoardQuery.data?.board.id);

  if (!getBoardQuery.data) return;

  if (getBoardQuery.isFetching) return <p>Loading</p>;
  const {
    data: { board },
  } = getBoardQuery;
  return (
    <div className="flex flex-col h-dvh min-h-dvh pl-2 pr-4 pt-4.5 pb-8  max-w-6xl mx-auto">
      <PageBreadcrumbs links={[]} currentPage={board.name} />

      <div className="flex flex-col items-start gap-2 pb-8 group/header">
        <div className="flex gap-2 items-center">
          <h1 title="Edit board" className="text-3xl font-semibold text-start ">
            {getBoardQuery.data.board.name}
          </h1>
          <ButtonGroup className="opacity-0 group-hover/header:opacity-100 transition-opacity focus-within:opacity-100">
            <EditBoardDialog board={getBoardQuery.data.board}>
              <Button variant="outline" size="icon-sm">
                <Pencil />
              </Button>
            </EditBoardDialog>
            <DeleteBoardDialog board={getBoardQuery.data.board}>
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
          value={boardMode}
          onValueChange={(value) => {
            setBoardMode(value as Mode);
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
          <AddCategoryPopover
            className=""
            boardId={getBoardQuery.data.board.id}
          >
            <Button variant="ghost">
              <Plus />
              Add category
            </Button>
          </AddCategoryPopover>
        </div>
      </div>
      <div className="h-full p-2">
        <CustomDragDropProvider
          setBoardColumns={setBoardColumns}
          setColumnOrder={setColumnOrder}
        >
          {boardMode === "kanban" ? (
            <KanbanView {...restProps} />
          ) : (
            <ListView {...restProps} />
          )}
        </CustomDragDropProvider>
      </div>
    </div>
  );
};
