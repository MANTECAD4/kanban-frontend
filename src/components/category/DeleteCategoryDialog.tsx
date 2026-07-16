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
import type { CategoryEntity } from "@/dtos/category.dto";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";

interface Props {
  children: ReactNode;
  category: CategoryEntity;
  boardId: number;
}

export const DeleteCategoryDialog: FC<Props> = ({
  children,
  category: { name, id: categoryId },
  boardId,
}) => {
  const { submitCategoryDeletion } = useDeleteCategory(boardId);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Delete "{name}" category
          </DialogTitle>
          <DialogDescription className="px-5">
            When you delete a category, you lose access to all tasks that are
            currently grouped by that category. This action cannot be undone.
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
            onClick={() => submitCategoryDeletion(categoryId)}
          >
            Yes, Delete category.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
