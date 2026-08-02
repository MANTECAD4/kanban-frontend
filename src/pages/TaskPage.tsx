import { Button } from "@/components/shared/ui/button";
import { Separator } from "@/components/shared/ui/separator";
import { EditTaskDialog } from "@/components/task/EditTaskDialog";
import { ManageSubtasksForm } from "@/components/subtask/ManageSubtasksForm";
import {
  ArrowLeft,
  ClockIcon,
  Paperclip,
  Pencil,
  Plus,
  Download,
  Trash,
  XIcon,
} from "lucide-react";
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
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/shared/ui/attachment";
import { AddAttatchmentsDialog } from "@/components/subtask/AddAttatchmentsDialog";
import { useQuery } from "@tanstack/react-query";
import { getAttachmentsAction } from "@/actions/attachments/get-attachments.action";

export const TaskPage = () => {
  const getProjectQuery = useGetProjectQuery();
  const getBoardQuery = useGetBoardQuery(getProjectQuery.data?.project.id);
  const getTaskQuery = useGetTaskQuery(getBoardQuery.data?.board.id);
  const loadAttachmentsQuery = useQuery({
    queryKey: ["in-task", getTaskQuery.data?.task.id, "attachments"],
    queryFn: () => getAttachmentsAction(getTaskQuery.data!.task.id),
  });

  if (
    !getBoardQuery.data ||
    !getProjectQuery.data ||
    !getTaskQuery.data ||
    !loadAttachmentsQuery.data
  )
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
  const {
    data: { attachments },
  } = loadAttachmentsQuery;

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
    <div className="flex flex-col min-h-dvh pl-2 pr-4 pt-4.5 pb-8  max-w-6xl mx-auto">
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
        {/* <Separator className="my-6" /> */}

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex justify-between ">
            <div className="flex gap-2 items-center">
              <Paperclip className="size-4" />
              <h2>Attatchments</h2>
            </div>
            <AddAttatchmentsDialog task={task}>
              <Button variant={"ghost"} size="lg">
                <Plus />
                Add attatchment
              </Button>
            </AddAttatchmentsDialog>
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {attachments.map((attachment) => (
              <Attachment
                key={attachment.id}
                state="idle"
                className="w-full border-muted"
              >
                <AttachmentMedia variant={"image"}>
                  <ClockIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{attachment.originalName}</AttachmentTitle>
                  <AttachmentDescription>
                    {(attachment.size / (1024 * 1024)).toFixed(2)} MB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction aria-label="Remove selected-file.pdf">
                    <a
                      href={`${attachment.sourceUrl}?download=${attachment.originalName}`}
                      target="_blank"
                    >
                      <Download />
                    </a>
                  </AttachmentAction>
                  <AttachmentAction aria-label="Remove selected-file.pdf">
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
