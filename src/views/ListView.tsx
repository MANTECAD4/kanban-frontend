import type { FC, RefObject } from "react";
import { CategoryTable } from "@/components/list-view/CategoryTable";
import type { TaskEntity } from "@/dtos/task.dto";
import type { GetCategoriesResponse } from "@/interfaces/category.interface";

interface Props {
  isFetching: boolean;
  boardColumns: Record<string, any>;
  categoriesData: NoInfer<GetCategoriesResponse> | undefined;
  columnOrder: string[];
  containerRef: RefObject<HTMLDivElement | null>;
}
export const ListView: FC<Props> = ({
  boardColumns,
  categoriesData,
  columnOrder,
  containerRef,
  isFetching,
}) => {
  if (isFetching) return <p>Loading</p>;

  if (!boardColumns || !categoriesData || isFetching) return;
  return (
    <div className="h-full mt-2 overflow-y-scroll custom-scrollbar pr-1">
      <div className="flex flex-col gap-3 max-h-10">
        {columnOrder.map((categoryName, index) => {
          const categoryRegister = categoriesData!.categories.find(
            (category) => category.name === categoryName,
          );
          if (!categoryRegister) return;
          return (
            <CategoryTable
              key={categoryName}
              originalCategoryRegister={categoryRegister}
              sortedTasks={
                boardColumns[categoryName] as unknown as TaskEntity[]
              }
              index={index}
              container={containerRef}
            />
          );
        })}
      </div>
    </div>
  );
};
