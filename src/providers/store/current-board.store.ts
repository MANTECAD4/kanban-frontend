import type { BoardEntity } from "@/dtos/board.dtos";
import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface CurrentBoardProps {
  board: BoardEntity | null;
}
interface CurrentBoardActions {
  setCurrentBoard: (board: BoardEntity) => void;
  clearBoard: () => void;
}

type CurrentBoardState = CurrentBoardProps & CurrentBoardActions;

const storeApi: StateCreator<
  CurrentBoardState,
  [["zustand/devtools", never]]
> = (set) => ({
  board: null,
  setCurrentBoard: (board: BoardEntity) =>
    set({ board }, false, "setCurrentBoard"),
  clearBoard: () => set({ board: null }, false, "clearBoard"),
});

export const useCurrentBoardStore = create<CurrentBoardState>()(
  devtools(storeApi),
);
