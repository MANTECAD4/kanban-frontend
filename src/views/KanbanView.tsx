import { type FC } from "react";

import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import type { TaskEntity } from "@/dtos/task.dto";
import { CustomDragDropProvider } from "@/components/shared/custom/CustomDragDropProvider";
import { useTaskManagement } from "@/hooks/useTaskManagement";

interface Props {
  boardId: number;
}
export const KanbanView: FC<Props> = ({ boardId }) => {
  const {
    isFetching,
    boardColumns,
    categoriesData,
    setBoardColumns,
    setColumnOrder,
    columnOrder,
    containerRef,
  } = useTaskManagement(boardId);
  if (isFetching) return <p>Loading</p>;

  if (!boardColumns || !categoriesData || isFetching) return;

  return (
    <>
      <CustomDragDropProvider
        setBoardColumns={setBoardColumns}
        setColumnOrder={setColumnOrder}
      >
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
      </CustomDragDropProvider>
    </>
  );
};
