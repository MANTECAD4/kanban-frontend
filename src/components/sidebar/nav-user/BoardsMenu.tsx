import { Button } from "@/components/shared/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shared/ui/sidebar";
import { Skeleton } from "@/components/shared/ui/skeleton";
import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { RotateCcw, XCircle } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useNavigate } from "react-router";

export const BoardsMenu = () => {
  const getBoardsQuery = useGetBoardsQuery();
  const navigate = useNavigate();
  if (getBoardsQuery.isFetching)
    return (
      <div className="flex flex-col gap-3 px-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
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
    <SidebarMenu className="gap-1">
      {getBoardsQuery.data.boards.map((board) => (
        <SidebarMenuButton onClick={() => navigate(`/boards/${board.slug}`)}>
          <SidebarMenuItem>
            <div className="flex justify-between  text-xs font-semibold px-2 py-1">
              <div className="flex gap-2 items-center">
                <DynamicIcon name={board.icon} className="size-5" />

                {board.name}
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenuButton>
      ))}
    </SidebarMenu>
  );
};
