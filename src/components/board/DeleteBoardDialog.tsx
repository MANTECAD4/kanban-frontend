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
import type { BoardEntity } from "@/dtos/board.dtos";
import { useDeleteBoard } from "@/hooks/boards/useDeleteBoard";

interface Props {
  children: ReactNode;
  board: BoardEntity;
  projectSlug: string;
}

export const DeleteBoardDialog: FC<Props> = ({
  children,
  projectSlug,
  board,
}) => {
  const { submitBoardDeletion } = useDeleteBoard(projectSlug);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete "{board.name}" board
          </DialogTitle>
          <DialogDescription className="px-5">
            When you delete a board, you lose access to all its tasks. This
            action cannot be undone.
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
            onClick={() => submitBoardDeletion(board.id)}
          >
            Yes, Delete board.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
