import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface DraggingProps {
  isDraggingColumn: boolean;
  isDraggingTask: boolean;
}

interface DraggingActions {
  setIsDraggingColumn: (value: boolean) => void;
  setIsDraggingTask: (value: boolean) => void;
}

type DraggingState = DraggingProps & DraggingActions;

const storeApi: StateCreator<DraggingState, [["zustand/devtools", never]]> = (
  set,
) => ({
  isDraggingColumn: false,
  isDraggingTask: false,
  setIsDraggingColumn: (value: boolean) =>
    set({ isDraggingColumn: value }, false, "setIsDraggingColumn"),
  setIsDraggingTask: (value: boolean) =>
    set({ isDraggingTask: value }, false, "setIsDraggingTask"),
});

export const useDraggingStore = create<DraggingState>()(devtools(storeApi));
