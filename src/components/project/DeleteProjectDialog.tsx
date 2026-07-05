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
import type { Project } from "@/dtos/project.dto";
import React, { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  project: Project;
}

export const DeleteProjectDialog: FC<Props> = ({
  children,
  project: { name },
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="">
        <DialogHeader>
          <DialogTitle>Delete "{name}" project</DialogTitle>
          <DialogDescription>
            All your boards and tasks will be lost forever!
          </DialogDescription>
          <Separator className="my-3" />
          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"}>Cancel</Button>
            </DialogClose>
            <Button variant={"destructive"}>Delete</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
