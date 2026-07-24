import { useEffect, useRef, useState, type FC } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { useQuery } from "@tanstack/react-query";
import { move } from "@dnd-kit/helpers";

import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import { getCategoriesAction } from "@/actions/category/get-categories.action";
import type { TaskEntity } from "@/dtos/task.dto";
import { useDraggingStore } from "@/providers/store/dragging.store";

interface Props {
  boardId: number;
}
export const KanbanView: FC<Props> = ({ boardId }) => {
  const {
    data: categoriesData,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: () => getCategoriesAction(boardId),
    queryKey: ["in-board", boardId, "categories"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const setIsDraggingGlobal = useDraggingStore(
    (state) => state.setIsDraggingColumn,
  );
  const [boardColumns, setBoardColumns] = useState<Record<string, any>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  useEffect(() => {
    if (categoriesData) {
      const columns: Record<string, any> = {};
      categoriesData.categories.forEach(
        (category) => (columns[category.name] = category.tasks),
      );
      setBoardColumns(columns);
      setColumnOrder(() => Object.keys(columns));
    }
  }, [categoriesData]);

  if (isFetching) return <p>Loading</p>;

  if ((!boardColumns || !categoriesData) && isFetched) return;

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          const { source } = event.operation;
          setBoardColumns((items) => move(items, event));
          if (!source || source.type !== "column") return;

          setColumnOrder((columns) => move(columns, event));
        }}
        onDragStart={() => {
          setIsDraggingGlobal(true);
        }}
        onDragEnd={(event) => {
          setIsDraggingGlobal(false);
        }}
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
      </DragDropProvider>
    </>
  );
};
