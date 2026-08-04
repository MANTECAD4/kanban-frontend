import { type FC, type RefObject } from "react";

import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import type { TaskEntity } from "@/dtos/task.dto";
import type { GetCategoriesResponse } from "@/interfaces/category.interface";

interface Props {
  isFetching: boolean;
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
}) => {
  if (isFetching) return <p>Loading</p>;

  if (!boardColumns || !categoriesData || isFetching) return;

  return (
    <>
      <div
        ref={containerRef}
        className="h-full  overflow-x-scroll custom-scrollbar pb-2"
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
    </>
  );
};
