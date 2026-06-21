import { Button } from "@/components/ui/button";
import { CircleDashed, Loader, Paintbrush, PlusCircle } from "lucide-react";
import { BoardColumn } from "./BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DragDropProvider, useDroppable } from "@dnd-kit/react";
import { TaskItem } from "@/features/kanban/components/board/TaskItem";
import { use, useMemo, useState } from "react";
import { move } from "@dnd-kit/helpers";

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
export const BoardContent = () => {
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
        <div className="h-full overflow-x-scroll custom-scrollbar pb-2">
          <div className="flex gap-10 max-w-0 h-full ">
            {Object.entries(boardColumns).map(([columnTitle, tasks]) => {
              return (
                <BoardColumn key={columnTitle} title={columnTitle}>
                  {tasks.map((task, i) => (
                    <TaskItem
                      key={task.id}
                      index={i}
                      {...task}
                      columnTitle={columnTitle}
                    />
                  ))}
                </BoardColumn>
              );
            })}
          </div>
          {/* <ScrollBar orientation="horizontal" /> */}
        </div>
      </DragDropProvider>
    </>
  );
};
