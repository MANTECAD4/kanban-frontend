import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState, type FC } from "react";
import { move } from "@dnd-kit/helpers";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesAction } from "@/actions/category/get-categories.action";
import type { TaskEntity } from "@/dtos/task.dto";

interface Props {
  boardId: number;
}
export const KanbanView: FC<Props> = ({ boardId }) => {
  const { data: categoriesData } = useQuery({
    queryFn: () => getCategoriesAction(boardId),
    queryKey: ["in-board", boardId, "categories"],
  });

  const [boardColumns, setBoardColumns] = useState({});
  useEffect(() => {
    if (categoriesData) {
      const columns: Record<string, any> = {};
      categoriesData.categories.forEach(
        (category) => (columns[category.name] = category.tasks),
      );
      setBoardColumns(columns);
    }
  }, [categoriesData]);

  if (!boardColumns || !categoriesData) return;

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          {
            setBoardColumns((items) => move(items, event));
          }
        }}
      >
        <div className="h-full  overflow-x-scroll custom-scrollbar pb-2">
          <div className="flex gap-10 max-w-0 h-full ">
            {Object.entries(boardColumns).map(([categoryName, tasks]) => {
              const categoryRegister = categoriesData.categories.find(
                (category) => category.name === categoryName,
              );
              if (!categoryRegister) return;
              return (
                <KanbanColumn
                  key={categoryName}
                  category={categoryRegister}
                  tasks={tasks as TaskEntity[]}
                />
              );
            })}
          </div>
        </div>
      </DragDropProvider>
    </>
  );
};
