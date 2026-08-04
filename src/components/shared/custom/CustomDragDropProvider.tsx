import { useDraggingStore } from "@/providers/store/dragging.store";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import React, { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  setBoardColumns: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CustomDragDropProvider: FC<Props> = ({
  children,
  setBoardColumns,
  setColumnOrder,
}) => {
  const setIsDraggingGlobal = useDraggingStore(
    (state) => state.setIsDraggingColumn,
  );
  return (
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
      onDragEnd={(_event) => {
        setIsDraggingGlobal(false);
      }}
    >
      {children}
    </DragDropProvider>
  );
};
