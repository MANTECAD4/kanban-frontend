import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { getProjectBySlugAction } from "@/actions/project/get-project.by-slug.action";
import { Badge } from "@/components/shared/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shared/ui/breadcrumb";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Progress } from "@/components/shared/ui/progress";
import { Separator } from "@/components/shared/ui/separator";
import { SidebarTrigger } from "@/components/shared/ui/sidebar";
import { ManageSubtasksForm } from "@/components/task/ManageSubtasksForm";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  Flag,
  ListTodo,
  Paperclip,
  Pencil,
  Siren,
  Tags,
  Trash,
} from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { Link, useParams } from "react-router";

export const TaskPage = () => {
  const { projectSlug = "", boardSlug = "" } = useParams();
  const getProjectQuery = useQuery({
    queryFn: () => getProjectBySlugAction(projectSlug),
    queryKey: ["projects", projectSlug],
    enabled: projectSlug !== "",
  });
  const getBoardQuery = useQuery({
    queryFn: () =>
      getBoardBySlugAction(boardSlug, getProjectQuery.data?.project.id ?? 0),
    queryKey: ["boards", boardSlug],
    enabled: projectSlug !== "" && getProjectQuery.data !== undefined,
  });

  if (!getBoardQuery.data || !getProjectQuery.data) return;

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
              <BreadcrumbPage>My task</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="px-8">
        <div className="flex flex-col items-start gap-2 pb-8 group/header">
          <div className="flex items-center gap-1 border border-primary text-primary bg-primary/20 py-1 px-2 rounded-full">
            <DynamicIcon name={"loader"} className="size-3.5" />
            <p className="text-xs">In progress</p>
          </div>
          <h1 title="Edit board" className="text-3xl font-semibold text-start ">
            {getBoardQuery.data.board.name}
          </h1>
          <p className="text-xs text-muted-foreground">
            Created at Tue, Jul 28, 2026
          </p>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: "8fr 4fr" }}>
          <div className=" flex flex-col gap-4 ">
            <h2 className=" font-semibold">Description</h2>
            <p className="leading-6 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id fuga
              quas cupiditate impedit, neque debitis voluptatem eaque sint
              dolorem. Quibusdam explicabo voluptas nobis accusantium tenetur
              vel itaque animi est deserunt?
            </p>
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
                  <p>High</p>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between  py-2">
                <div className="flex gap-1 items-center">
                  <Calendar className="size-4" />
                  <p>Due date</p>
                </div>
                <p>Tue, Jul 28, 2026</p>
              </div>
              <Separator />
              <div className="flex justify-between  py-2">
                <div className="flex gap-1 items-center">
                  <Clock className="size-4" />
                  <p>Due time</p>
                </div>
                <p>4:30 PM</p>
              </div>
              <Separator />
              <div className="py-2">
                <div className="flex gap-1 items-center">
                  <Tags className="size-4" />
                  <p>Tags</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant={"outline"}>UI</Badge>
                  <Badge variant={"outline"}>UX</Badge>
                  <Badge variant={"outline"}>Feature</Badge>
                  <Badge variant={"outline"}>CSS</Badge>
                  <Badge variant={"outline"}>Security</Badge>
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
