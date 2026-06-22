import { DragDropProvider } from "@dnd-kit/react";
import { TaskCard } from "@/features/projects/components/Kanban/TaskICard";
import { useMemo, useState } from "react";
import { move } from "@dnd-kit/helpers";
import { KanbanColumn } from "@/features/projects/components/Kanban/KanbanColumn";
import { AddTaskPlaceholder } from "@/features/projects/components/Kanban/AddTaskPlaceholder";

const columns = [
  {
    id: crypto.randomUUID(),
    title: "In progress",
    icon: "loader",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Implement responsive design",
      },
      {
        id: crypto.randomUUID(),
        title: "Improve performace",
      },
      {
        id: crypto.randomUUID(),
        title: "Finish JWT auth",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Under inspection",
    icon: "scan-search",
    tasks: [
      {
        id: crypto.randomUUID(),
        title: "Implement Drag & Drop Feature",
      },
      {
        id: crypto.randomUUID(),
        title: "Adapt componen's styling",
      },
      {
        id: crypto.randomUUID(),
        title: "Implement responsive design",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    title: "Finished",
    icon: "circle-check",
    tasks: [],
  },
];
export const KanbanView = () => {
  const data = useMemo(() => {
    const keys: Record<string, any> = {};
    columns.forEach((column) => (keys[column.title] = column.tasks));

    return structuredClone(keys);
  }, [columns]);

  const [boardColumns, setBoardColumns] = useState(data);

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          setBoardColumns((items) => move(items, event));
        }}
      >
        <div className="h-full  overflow-x-scroll custom-scrollbar pb-2">
          <div className="flex gap-10 max-w-0 h-full ">
            {Object.entries(boardColumns).map(([columnTitle, tasks]) => {
              return (
                <KanbanColumn key={columnTitle} title={columnTitle}>
                  {tasks.map((task, i) => (
                    <TaskCard
                      key={task.id}
                      index={i}
                      {...task}
                      columnTitle={columnTitle}
                    />
                  ))}
                  {/* <AddTaskPlaceholder /> */}
                </KanbanColumn>
              );
            })}
          </div>
        </div>
      </DragDropProvider>
    </>
  );
};
