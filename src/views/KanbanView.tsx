import { type FC, type RefObject } from "react";

import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import type { TaskEntity } from "@/dtos/task.dto";
import type { GetCategoriesResponse } from "@/interfaces/category.interface";
import {
  Home,
  Loader,
  LoaderCircle,
  Plus,
  RotateCcw,
  Tag,
  XCircle,
} from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { Button } from "@/components/shared/ui/button";
import { AddCategoryPopover } from "@/components/category/AddCategoryPopover";

interface Props {
  boardId: number;
  isFetching: boolean;
  refetch: Function;
  isError: boolean;
  boardColumns: Record<string, any>;
  categoriesData: NoInfer<GetCategoriesResponse> | undefined;
  columnOrder: string[];
  containerRef: RefObject<HTMLDivElement | null>;
}
export const KanbanView: FC<Props> = ({
  boardColumns,
  categoriesData,
  columnOrder,
  containerRef,
  isFetching,
  isError,
  refetch,
  boardId,
}) => {
  if (isFetching)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader className="size-10 stroke-muted-foreground animate-spin" />
      </div>
    );

  if (isError || !boardColumns || !categoriesData)
    return (
      <div className="h-full flex justify-center items-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <XCircle />
            </EmptyMedia>
            <EmptyTitle>Error</EmptyTitle>
            <EmptyDescription>
              We had some issues fetching your tasks. Please, try again later.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RotateCcw />
              Retry
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );

  return (
    <>
      {columnOrder.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Tag />
              </EmptyMedia>
              <EmptyTitle>No categories found</EmptyTitle>
              <EmptyDescription>
                You don't have any categories in this board. Get started adding
                some of them
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button variant="outline" onClick={() => refetch()}>
                <Home />
                Go to dashboard
              </Button>
              <AddCategoryPopover boardId={boardId}>
                <Button variant="default">
                  <Plus />
                  Add category
                </Button>
              </AddCategoryPopover>
            </EmptyContent>
          </Empty>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="h-full  overflow-x-scroll custom-scrollbar--transparent pb-1"
        >
          <div className="flex gap-10 max-w-0 h-full">
            {columnOrder.map((categoryName, index) => {
              const categoryRegister = categoriesData!.categories.find(
                (category) => category.name === categoryName,
              );
              if (!categoryRegister) return;
              return (
                <KanbanColumn
                  key={categoryName}
                  category={categoryRegister}
                  tasks={boardColumns[categoryName] as unknown as TaskEntity[]}
                  index={index}
                  container={containerRef}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
