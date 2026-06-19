import { Button } from "@/components/ui/button";
import { CircleDashed, Paintbrush, PlusCircle } from "lucide-react";
import { BoardColumn } from "./BoardColumn";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const BoardContent = () => {
  return (
    <>
      <ScrollArea className="h-full ">
        <div className="flex gap-4 max-w-0 h-full ">
          <BoardColumn />
          <BoardColumn />
          <BoardColumn />
          <BoardColumn />
          <BoardColumn />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};
