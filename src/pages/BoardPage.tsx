import { BoardBody } from "@/components/board/BoardBody";
import { BoardHeader } from "@/components/board/BoardHeader";

export const BoardPage = () => {
  return (
    <div className="flex flex-col h-dvh pl-2 pr-4 pt-4.5 pb-1 ">
      <BoardHeader />

      <h1 className="text-2xl font-semibold">Design for Landing Page</h1>

      <BoardBody />
    </div>
  );
};
