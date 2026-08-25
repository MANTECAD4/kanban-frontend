import { BoardSummaryItem } from "@/components/dashboard/BoardSummaryItem";
import { Button } from "@/components/shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { CopyPlus, Plus, RotateCcw, XCircle } from "lucide-react";

export const BoardGrid = () => {
  const getBoardsQuery = useGetBoardsQuery();

  if (getBoardsQuery.isFetching)
    return (
      <div className="flex items-center gap-4 flex-wrap ">
        <Skeleton className="w-50 h-45" />
        <Skeleton className="w-50 h-45" />
        <Skeleton className="w-50 h-45" />
        <Skeleton className="w-50 h-45" />
        <Skeleton className="w-50 h-45" />
        <Skeleton className="w-50 h-45" />
      </div>
    );
  if (getBoardsQuery.isError || !getBoardsQuery.data)
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <XCircle />
          </EmptyMedia>
          <EmptyTitle>Error</EmptyTitle>
          <EmptyDescription>
            We had issues fetching your boards. Pleas, try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => getBoardsQuery.refetch()}>
            <RotateCcw />
            Retry
          </Button>
        </EmptyContent>
      </Empty>
    );
  return (
    <>
      {getBoardsQuery.data.boards.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CopyPlus />
            </EmptyMedia>
            <EmptyTitle>Ready to add your first board?</EmptyTitle>
            <EmptyDescription>
              A summary of your boards will appear here
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button>
              <Plus />
              Create Board
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex items-center gap-4 flex-wrap ">
          {getBoardsQuery.data.boards.map((board) => (
            <BoardSummaryItem key={board.id} board={board} />
          ))}
        </div>
      )}
    </>
  );
};
