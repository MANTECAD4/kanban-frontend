import { BoardContent } from "@/features/kanban/components/board/BoardContent";
import { BoardControls } from "@/features/kanban/components/board/BoardControls";
import { BoardHeader } from "@/features/kanban/components/board/BoardHeader";
import { useAuthStore } from "@/providers/store/auth.store";
import { Wallpaper } from "lucide-react";

export const Dashboard = () => {
  const name = useAuthStore((state) => state.name);
  return (
    <div className="flex flex-col flex-1 min-w-0 h-dvh pl-2 pr-4 pt-4.5 pb-1 ">
      <div className="flex items-center gap-2 mb-3">
        <BoardHeader />
      </div>
      <div className="flex items-center gap-3">
        {/* <Wallpaper /> */}
        <h1 className="text-2xl font-semibold">Design for Landing Page</h1>
      </div>
      <div className="flex items-center justify-between mt-8  ">
        <BoardControls />
      </div>
      <div className="h-full ">
        <BoardContent />
      </div>
    </div>
  );
};
