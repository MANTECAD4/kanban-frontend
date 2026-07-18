import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface DraggingProps {
  isDraggingGlobal: boolean;
}

interface DraggingActions {
  setIsDraggingGlobal: (value: boolean) => void;
}

type DraggingState = DraggingProps & DraggingActions;

const storeApi: StateCreator<DraggingState, [["zustand/devtools", never]]> = (
  set,
) => ({
  isDraggingGlobal: false,
  setIsDraggingGlobal: (value: boolean) =>
    set({ isDraggingGlobal: value }, false, "setIsDraggingGlobal"),
});

export const useDraggingGlobalStore = create<DraggingState>()(
  devtools(storeApi),
);
