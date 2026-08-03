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
import type { AttachmentEntity } from "@/dtos/attatchment.dto";
import { useDeleteAttachment } from "@/hooks/attachments/useDeleteAttachment";

interface Props {
  children: ReactNode;
  attachment: AttachmentEntity;
}

export const DeleteAttachmentDialog: FC<Props> = ({ children, attachment }) => {
  const { handleAttachmentDeletion } = useDeleteAttachment();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete Attachment
          </DialogTitle>
          <DialogDescription className="px-5">
            You're about to delete the following attachment:
            <p className="pl-3  text-sm  text-foreground my-3">
              {attachment.originalName}
            </p>{" "}
            This action cannot be undone.
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
            onClick={() => handleAttachmentDeletion(attachment.id)}
          >
            Yes, Delete Attachment.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
