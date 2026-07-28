import { Button } from "@/components/shared/ui/button";
import { Separator } from "@/components/shared/ui/separator";
import { EditTaskDialog } from "@/components/task/EditTaskDialog";
import { ManageSubtasksForm } from "@/components/subtask/ManageSubtasksForm";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { DeleteTaskDialog } from "@/components/task/DeleteTaskDialog";
import {
  PageBreadcrumbs,
  type BreadcrumbLink,
} from "@/components/shared/custom/PageBreadcrumb";
import { useGetProjectQuery } from "@/hooks/queries/useGetProjectQuery";
import { useGetBoardQuery } from "@/hooks/queries/useGetBoardQuery";
import { useGetTaskQuery } from "@/hooks/queries/useGetTaskQuery";
import { TaskProperties } from "@/components/task/task-page/TaskProperties";
import { Link } from "react-router";

export const TaskPage = () => {
  const getProjectQuery = useGetProjectQuery();
  const getBoardQuery = useGetBoardQuery(getProjectQuery.data?.project.id);
  const getTaskQuery = useGetTaskQuery(getBoardQuery.data?.board.id);

  if (!getBoardQuery.data || !getProjectQuery.data || !getTaskQuery.data)
    return;

  const {
    data: { project },
  } = getProjectQuery;
  const {
    data: { board },
  } = getBoardQuery;
  const {
    data: { task },
  } = getTaskQuery;

  const breadcrumbLinks: BreadcrumbLink[] = [
    {
      label: project.name,
      route: `/projects/${project.slug}`,
    },
    {
      label: board.name,
      route: `/projects/${project.slug}/boards/${board.slug}`,
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh pl-2 pr-4 py-4.5  max-w-7xl mx-auto">
      <PageBreadcrumbs links={breadcrumbLinks} currentPage={task.title} />
      <div className="px-8">
        <div className="flex justify-between pb-8">
          <div className="flex flex-col  gap-2  group/header ">
            <h1
              title="Edit board"
              className="text-3xl font-semibold text-start "
            >
              {task.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Created at{" "}
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {/* ACTIONS */}
            <Link to={`/projects/${project.slug}/boards/${board.slug}`}>
              <Button variant={"link"}>
                <ArrowLeft />
                Go back to board
              </Button>
            </Link>
            <EditTaskDialog task={task}>
              <Button variant={"outline"}>
                <Pencil />
                Edit information
              </Button>
            </EditTaskDialog>

            <DeleteTaskDialog task={task} boardId={board.id}>
              <Button variant={"destructive"}>
                <Trash />
                Delete
              </Button>
            </DeleteTaskDialog>
          </div>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "8fr 4fr" }}>
          <div className=" flex flex-col gap-4 ">
            <h2 className=" font-semibold">Description</h2>
            <p className="leading-6 ">{task.description}</p>
            <Separator className="my-3" />

            {/* SUBTASKS SECTION */}
            <div className="flex flex-col gap-4">
              <ManageSubtasksForm taskId={task.id} />
            </div>
          </div>

          {/* PROPERTIES */}
          <div className="px-4 h-fit ">
            <TaskProperties task={task} />
          </div>
        </div>
      </div>
    </div>
  );
};
