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
import { useDeleteSubtask } from "@/hooks/subtask/useDeleteSubtask";
import type { SubtaskEntity } from "@/dtos/subtask.dto";

interface Props {
  children: ReactNode;
  subtask: SubtaskEntity;
}

export const DeleteSubtaskDialog: FC<Props> = ({ children, subtask }) => {
  const { handleSubtaskDeletion } = useDeleteSubtask();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete subtask
          </DialogTitle>
          <DialogDescription className="px-5">
            You're about to delete "{subtask.description}" subtask. This action
            cannot be undone.
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
            onClick={() => handleSubtaskDeletion(subtask.id)}
          >
            Yes, Delete subtask.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
