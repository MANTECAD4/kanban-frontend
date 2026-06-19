import { Button } from "@/components/ui/button";
import { CircleDashed, Paintbrush, PlusCircle } from "lucide-react";
import { BoardColumn } from "./BoardColumn";

export const BoardContent = () => {
  return (
    <>
      <div className="flex gap-4 max-w-0 h-full ">
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
      </div>
    </>
  );
};
