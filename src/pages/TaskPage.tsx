import { Badge } from "@/components/shared/ui/badge";
import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import { Separator } from "@/components/shared/ui/separator";
import { EditTaskDialog } from "@/components/task/EditTaskDialog";
import { ManageSubtasksForm } from "@/components/subtask/ManageSubtasksForm";
import {
  Calendar,
  Clock,
  Flag,
  ListTodo,
  Pencil,
  Siren,
  Tags,
  Trash,
} from "lucide-react";
import { DeleteTaskDialog } from "@/components/task/DeleteTaskDialog";
import {
  PageBreadcrumbs,
  type BreadcrumbLink,
} from "@/components/shared/custom/PageBreadcrumb";
import { useGetProjectQuery } from "@/hooks/queries/useGetProjectQuery";
import { useGetBoardQuery } from "@/hooks/queries/useGetBoardQuery";
import { useGetTaskQuery } from "@/hooks/queries/useGetTaskQuery";

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
              {getTaskQuery.data.task.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Created at{" "}
              {new Date(getTaskQuery.data.task.createdAt).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <EditTaskDialog task={getTaskQuery.data.task}>
              <Button variant={"outline"}>
                <Pencil />
                Edit information
              </Button>
            </EditTaskDialog>

            <DeleteTaskDialog
              task={getTaskQuery.data.task}
              boardId={getBoardQuery.data.board.id}
            >
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
            <p className="leading-6 ">{getTaskQuery.data.task.description}</p>
            <Separator className="my-3" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <ListTodo className="size-5" />
                  <h2 className="font-semibold">Subtasks</h2>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  2/5 done
                </span>
              </div>
              <Progress value={78} className="h-1.5" />
              <ManageSubtasksForm taskId={getTaskQuery.data.task.id} />
            </div>
          </div>
          <div className="  rounded-2xl px-4 h-fit ">
            <h2 className=" font-semibold">Properties</h2>
            <div className="flex flex-col gap-3 text-xs mt-4">
              <div className="flex justify-between py-2">
                <div className="flex gap-1 items-center">
                  <Flag className="size-4" />
                  <p>Priority</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Siren className="size-4" />
                  <p>{getTaskQuery.data.task.priority}</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between  py-2">
                <div className="flex gap-1 items-center">
                  <Calendar className="size-4" />
                  <p>Due date</p>
                </div>
                <p className="font-semibold">
                  {new Date(getTaskQuery.data.task.dueDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between  py-2">
                <div className="flex gap-1 items-center">
                  <Clock className="size-4" />
                  <p>Due time</p>
                </div>
                <p className="font-semibold">
                  {new Date(getTaskQuery.data.task.dueDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "numeric",
                    },
                  )}
                </p>
              </div>
              <Separator />
              <div className="py-2">
                <div className="flex gap-1 items-center">
                  <Tags className="size-4" />
                  <p>Tags</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {getTaskQuery.data.task.tags.map((tag) => (
                    <Badge key={tag} variant={"outline"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Separator className="my-6" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Paperclip />
              <h2 className="font-semibold">Attatchments</h2>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              5 files
            </span>
          </div>
          <Progress value={78} className="h-1.5" />
          <ManageSubtasksForm />
        </div> */}
      </div>
    </div>
  );
};
