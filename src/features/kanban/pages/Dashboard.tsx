import { BoardContent } from "@/features/kanban/components/board/BoardContent";
import { BoardControls } from "@/features/kanban/components/board/BoardControls";
import { BoardHeader } from "@/features/kanban/components/board/BoardHeader";
import { useAuthStore } from "@/providers/store/auth.store";

export const Dashboard = () => {
  const name = useAuthStore((state) => state.name);
  return (
    <div className="flex flex-col flex-1 min-w-0 h-dvh pl-2 pr-4 py-4.5 ">
      <div className="mb-3 flex gap-2 ">
        <BoardHeader />
      </div>
      <h1 className="text-2xl font-semibold">Design for Landing Page</h1>
      <div className="flex items-center justify-between mt-7 ">
        <BoardControls />
      </div>
      <div className="h-full mt-3.5 overflow-x-scroll ">
        <BoardContent />
      </div>
    </div>
  );
};
