import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Mode = "kanban" | "list";
interface BoardModeProps {
  boardMode: Mode;
}

interface BoardModeActions {
  setBoardMode: (mode: Mode) => void;
}

type BoardModeState = BoardModeProps & BoardModeActions;

const storeApi: StateCreator<BoardModeState, [["zustand/devtools", never]]> = (
  set,
) => ({
  boardMode: "kanban",
  setBoardMode: (mode: Mode) => set({ boardMode: mode }, false, "setBoardMode"),
});

export const useBoardModeStore = create<BoardModeState>()(
  persist(devtools(storeApi), { name: "board-mode-store" }),
);
