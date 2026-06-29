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
import { Field, FieldGroup } from "@/components/shared/ui/field";
import { IconPicker } from "@/components/shared/ui/icon-picker";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { cn } from "@/lib/utils";
import React, { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

type AddCategortDialogProps = Props & React.ComponentProps<typeof Dialog>;

export const AddCategoryDialog: FC<AddCategortDialogProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className={cn(className, "sm:max-w-sm")}>
          <DialogHeader>
            <DialogTitle className="text-lg">Add category</DialogTitle>
            <DialogDescription className="text-foreground text-xs">
              Add a new category for the tasks in this board.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="category-name">Name</Label>
              <Input id="category-name" name="category-name" />
            </Field>
            <Field>
              <Label htmlFor="description">Description (optional)</Label>
              <Input id="description" name="description" />
            </Field>
            <Field>
              <Label htmlFor="description">Icon</Label>
              <IconPicker />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
