import { type FC, type ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";
import { Separator } from "@/components/shared/ui/separator";
import type { ProjectEntity } from "@/dtos/project.dto";
import { useDeleteProject } from "@/hooks/project/useDeleteProject";

interface Props {
  children: ReactNode;
  project: ProjectEntity;
}

export const DeleteProjectDialog: FC<Props> = ({
  children,
  project: { name, id: projectId },
}) => {
  const { submitProjectDeletion } = useDeleteProject();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete "{name}" project
          </DialogTitle>
          <DialogDescription className="px-5">
            When you delete a project, you lose access to all its boards and
            tasks. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Separator className="mb-2" />
        <DialogFooter>
          <DialogClose>
            <Button size="lg" variant={"outline"}>
              No, Keep it.
            </Button>
          </DialogClose>
          <Button
            size="lg"
            variant={"destructive"}
            onClick={() => submitProjectDeletion(projectId)}
          >
            Yes, Delete project.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
