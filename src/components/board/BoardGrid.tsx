import { AddBoardDialog } from "@/components/board/AddBoardDialog";
import { BoardItemCard } from "@/components/board/BoardItemCard";
import { Button } from "@/components/shared/ui/button";
import { useGetBoards } from "@/hooks/boards/useGetBoards";
import { LayoutGrid, Plus, StickyNotePlus } from "lucide-react";
import type { FC } from "react";

interface Props {
  projectId: number;
}

export const BoardGrid: FC<Props> = ({ projectId }) => {
  const { getBoardsQuery } = useGetBoards(projectId);

  if (!getBoardsQuery.data) return;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <LayoutGrid className="size-5" />
          <h2>Boards ({getBoardsQuery.data.meta.total})</h2>
        </div>
        <AddBoardDialog projectId={projectId}>
          <Button variant={"ghost"}>
            <Plus /> Add new board
          </Button>
        </AddBoardDialog>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {getBoardsQuery.data.boards.map((board) => (
          <BoardItemCard board={board} />
        ))}
      </div>
      <Button variant="ghost" className="self-center">
        Show more...
      </Button>
    </div>
  );
};
