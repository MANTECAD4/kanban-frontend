import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { getTaskBySlugAction } from "@/actions/task/get-task-by-slug.action";
import { Badge } from "@/components/shared/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import { EditTaskDialog } from "@/components/task/EditTaskDialog";
import { ManageSubtasksForm } from "@/components/task/ManageSubtasksForm";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  Flag,
  ListTodo,
  Pencil,
  Siren,
  Tags,
} from "lucide-react";
import { Link, useParams } from "react-router";

export const TaskPage = () => {
  const { projectSlug = "", boardSlug = "", taskSlug = "" } = useParams();
  const getProjectQuery = useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["projects", projectSlug],
    enabled: projectSlug !== "",
  });
  const getBoardQuery = useQuery({
    queryFn: () =>
      getBoardBySlugAction(boardSlug, getProjectQuery.data?.project.id ?? 0),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "" && getProjectQuery.data !== undefined,
  });
  const getTaskQuery = useQuery({
    queryFn: () =>
      getTaskBySlugAction(getBoardQuery.data?.board.id ?? 0, taskSlug),
    queryKey: ["tasks", taskSlug],
    enabled: projectSlug !== "" && getBoardQuery.data !== undefined,
  });

  if (!getBoardQuery.data || !getProjectQuery.data || !getTaskQuery.data)
    return;
  return (
    <div className="flex flex-col min-h-dvh pl-2 pr-4 py-4.5  max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger className="" />

        <Separator orientation="vertical" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={`/projects/${projectSlug}`} className="text-gray-400">
                {getProjectQuery.data.project.name}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to={`/projects/${projectSlug}/boards/${boardSlug}`}
                className="text-gray-400"
              >
                {getBoardQuery.data.board.name}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{getTaskQuery.data.task.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
          <EditTaskDialog task={getTaskQuery.data.task}>
            <Button variant={"outline"}>
              <Pencil />
              Edit task information
            </Button>
          </EditTaskDialog>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "8fr 4fr" }}>
          <div className=" flex flex-col gap-4 ">
            <h2 className=" font-semibold">Description</h2>
            <p className="leading-6 ">{getTaskQuery.data.task.description}</p>
            <Separator className="my-3" />
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <ListTodo />
                  <h2 className="font-semibold">Subtasks</h2>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  2/5 done
                </span>
              </div>
              <Progress value={78} className="h-1.5" />
              <ManageSubtasksForm />
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
