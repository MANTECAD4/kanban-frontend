import { AddBoardDialog } from "@/components/board/AddBoardDialog";
import { BoardGrid } from "@/components/board/BoardGrid";
import { DeleteProjectDialog } from "@/components/project/DeleteProjectDialog";
import { EditProjectDialog } from "@/components/project/EditProjectDialog";
import { RecentActivityCard } from "@/components/project/RecentActivityCard";
import { TasksChart } from "@/components/project/TasksChart";
import { UpcomingDates } from "@/components/project/UpcomingDates";
import { PageBreadcrumbs } from "@/components/shared/custom/PageBreadcrumb";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Separator } from "@/components/shared/ui/separator";
import { useProject } from "@/hooks/project/useProject";
import { Pencil, Plus, Trash } from "lucide-react";

export const ProjectPage = () => {
  const {
    getProjectBySlugQuery: { data },
  } = useProject();
  if (!data) return;
  return (
    <div className="flex flex-col min-h-dvh pl-2 pr-4 pt-4.5 pb-8  max-w-6xl mx-auto">
      <PageBreadcrumbs links={[]} currentPage={data.project.name} />
      <div className=" mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center">
                {/* <DynamicIcon
                  name={data.project.icon}
                  className={cn(
                    colors[data.project.iconColor].stroke,
                    "size-6",
                  )}
                /> */}
                <h1 className="text-3xl font-semibold">{data.project.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                {data.project.description}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ButtonGroup>
              <DeleteProjectDialog project={data.project}>
                <Button variant={"outline"} title="Delete project">
                  <Trash />
                </Button>
              </DeleteProjectDialog>

              <EditProjectDialog project={data.project}>
                <Button variant={"outline"} title="Edit project data">
                  <Pencil />
                </Button>
              </EditProjectDialog>
            </ButtonGroup>
            <AddBoardDialog projectId={data.project.id}>
              <Button variant={"default"}>
                <Plus /> New Board
              </Button>
            </AddBoardDialog>
          </div>
        </div>
      </div>
      {/* <Separator className="mt-3 mb-8" /> */}

      <div className="flex gap-3">
        <TasksChart />
        <Separator orientation="vertical" />
        <UpcomingDates />
        <Separator orientation="vertical" />
        {/* <RecentActivityCard /> */}
      </div>

      {/* <div className=" mt-10">
        <BoardGrid projectId={data.project.id} />
      </div> */}
    </div>
  );
};

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
