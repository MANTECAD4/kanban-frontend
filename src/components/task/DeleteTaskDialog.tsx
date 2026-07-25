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
import type { TaskEntity } from "@/dtos/task.dto";
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask";

interface Props {
  children: ReactNode;
  task: TaskEntity;
  boardId: number;
}

export const DeleteTaskDialog: FC<Props> = ({ children, task, boardId }) => {
  const { submitTaskDeletion } = useDeleteTask(boardId);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete "{task.title}" task
          </DialogTitle>
          {/* <DialogDescription className="px-5">
            This action cannot be undone.
          </DialogDescription> */}
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
            onClick={() => submitTaskDeletion(task.id)}
          >
            Yes, Delete task.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
