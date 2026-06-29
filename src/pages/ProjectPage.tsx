import { AddBoardDialog } from "@/components/board/AddBoardDialog";
import { BoardItemCard } from "@/components/project/BoardItemCard";
import { EditProjectDialog } from "@/components/project/EditBoardDialog";
import { RecentActivityCard } from "@/components/project/RecentActivityCard";
import { TasksChart } from "@/components/project/TasksChart";
import { UpcomingDates } from "@/components/project/UpcomingDates";
import { Button } from "@/components/shared/ui/button";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { LayoutGrid, Pencil, Plus, Rocket, StickyNotePlus } from "lucide-react";

export const ProjectPage = () => {
  return (
    <div className=" flex flex-col h-full pl-2 pr-4  pb-10">
      <div className="bg-background backdrop-blur-xs pt-4">
        <SidebarTrigger className="" />
        <div className="flex justify-between mb-4">
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center size-12 border-2 rounded-lg bg-sky-700/20 border-sky-700">
              <Rocket className="stroke-sky-700" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">Kanban Application</h1>
              <p className="text-sm text-muted-foreground">
                A simple, intuitive fullstack application for task management!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <EditProjectDialog>
              <Button>
                <Pencil />
              </Button>
            </EditProjectDialog>
            <AddBoardDialog>
              <Button>
                <Plus /> New Board
              </Button>
            </AddBoardDialog>
          </div>
        </div>
      </div>
      <Separator className="mt-3 mb-8" />

      <div className="grid grid-cols-3 gap-6">
        <TasksChart />
        <UpcomingDates />
        <RecentActivityCard />
      </div>

      <div className=" mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <LayoutGrid className="size-5" />
              <h2>Boards (5)</h2>
            </div>
            <Button variant={"ghost"}>
              <Plus /> Add new board
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {boards.map((board) => (
              <BoardItemCard board={board} />
            ))}
            <div className="flex flex-col justify-center items-center gap-3 rounded-lg ring-1 ring-foreground/10 bg-background p-5 h-58">
              <StickyNotePlus className="stroke-muted-foreground size-8" />
              <p className="text-muted-foreground">Add new task</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const boards = [
  "Product Design",
  "User Authentication",
  "Docker deployment",
  // "testing",
];

{
  /* <div className="flex flex-col gap-4">
      <div className="flex justify-between text-sm font-semibold">
      </div>
      <p className="text-xs text-muted-foreground">
        Keep it up — the project is more than 20% of the way there.
      </p>
    </div>
    <div className="flex flex-col gap-4 rounded-lg bg-background border border-ring p-4">
      <div className="flex items-center gap-2">
        <ClockArrowUp className="size-5" />
        <h2 className="text-sm font-semibold">Upcoming dates</h2>
      </div>
      <div className="flex flex-col gap-3">
        {boards.map((board) => (
          <div key={board} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-900 size-2" />
              <div>
                <h3 className="text-sm">Safari Glicth</h3>
                <p className="text-xs text-muted-foreground">{board}</p>
              </div>
            </div>
            <span className="text-sm">Nov 15</span>
          </div>
        ))}
      </div>
    </div>
  </div> */
}

{
  /* <div className="grid grid-cols-2 gap-4 ">
          <div className="flex bg-background justify-between px-5 items-center  border border-ring rounded-2xl py-4">
            <div className="max-w-7/10 ">
              <h2 className="text-xs text-semibold">Total tasks</h2>
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-2xl">18</span>
                <p className="text-xs text-muted-foreground">
                  Accross all boards
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <GalleryVerticalEnd className="size-8 stroke-primary" />
            </div>
          </div>
          <div className="flex bg-background justify-between px-5 items-center  border border-ring rounded-2xl py-4">
            <div className="max-w-7/10 ">
              <h2 className="text-xs text-semibold">Completed</h2>
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-2xl">18%</span>
                <p className="text-xs text-muted-foreground">
                  Accross all boards
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <SquareCheckBig className="size-8 stroke-green-900" />
            </div>
          </div>
          <div className="flex bg-background justify-between px-5 items-center  border border-ring rounded-2xl py-4">
            <div className="max-w-7/10 ">
              <h2 className="text-xs text-semibold">Active</h2>
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-2xl">18</span>
                <p className="text-xs text-muted-foreground">
                  Tasks already started
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <Loader className="size-8 stroke-yellow-900" />
            </div>
          </div>
          <div className="flex bg-background justify-between px-5 items-center  border border-ring rounded-2xl py-4">
            <div className="max-w-7/10 ">
              <h2 className="text-xs text-semibold">Overdue</h2>
              <div className="flex flex-col gap-2 mt-4">
                <span className="text-2xl">18</span>
                <p className="text-xs text-muted-foreground">
                  Accross all boards
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <ClockAlert className="size-8 stroke-red-900" />
            </div>
          </div>
        </div> */
}
