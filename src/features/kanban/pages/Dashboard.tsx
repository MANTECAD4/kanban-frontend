import { BoardControls } from "@/features/kanban/components/board/BoardControls";
import { BoardHeader } from "@/features/kanban/components/board/BoardHeader";
import { useAuthStore } from "@/providers/store/auth.store";

export const Dashboard = () => {
  const name = useAuthStore((state) => state.name);
  return (
    <div className="flex flex-col flex-1 min-w-0 h-dvh pl-2 pr-4 py-4.5 ">
      <div className="ml-6 mb-3 flex gap-2 ">
        <BoardHeader />
      </div>
      <h1 className="text-2xl font-semibold">Design for Landing Page</h1>
      <div className="flex items-center justify-between mt-7 ">
        <BoardControls />
      </div>
      <div className="mt-3.5 h-full overflow-x-scroll">
        <div className="h-full flex gap-2  max-w-0">
          <div className="h-full w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
          <div className="w-80 shrink-0 border-2 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            unde exercitationem eos illum, molestiae nesciunt. Sapiente dicta
            quod architecto laboriosam voluptatem perspiciatis, facere, odit
            fuga non deleniti sunt doloribus nemo.
          </div>
        </div>
      </div>
    </div>
  );
};
