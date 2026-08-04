import type { FC } from "react";
import { DeleteCategoryDialog } from "@/components/category/DeleteCategoryDialog";
import { EditCategoryPopover } from "@/components/category/EditCategoryPopover";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialItem,
  SpeedDialLabel,
  SpeedDialTrigger,
} from "@/components/shared/ui/speed-dial";
import { AddTaskDialog } from "@/components/task/AddTaskDialog";
import type { CategoryEntity } from "@/dtos/category.dto";
import { EllipsisVertical, Pencil, Plus, Trash } from "lucide-react";

interface Props {
  category: CategoryEntity;
}

export const CategorySpeedDial: FC<Props> = ({ category }) => {
  return (
    <SpeedDial side="bottom">
      <SpeedDialTrigger
        variant="ghost"
        className="transition-transform duration-200 ease-out data-[state=closed]:rotate-0 data-[state=open]:rotate-90 size-8"
      >
        <EllipsisVertical />
      </SpeedDialTrigger>
      <SpeedDialContent forceMount>
        <SpeedDialItem>
          <SpeedDialLabel className="text-xs">Add task</SpeedDialLabel>
          <AddTaskDialog category={category}>
            <SpeedDialAction variant="default" className="size-9 ">
              <Plus />
            </SpeedDialAction>
          </AddTaskDialog>
        </SpeedDialItem>
        <SpeedDialItem>
          <SpeedDialLabel className="text-xs">Edit category</SpeedDialLabel>
          <EditCategoryPopover category={category}>
            <SpeedDialAction variant="default" className="size-9 ">
              <Pencil />
            </SpeedDialAction>
          </EditCategoryPopover>
        </SpeedDialItem>
        <SpeedDialItem>
          <SpeedDialLabel className="text-xs">Delete category</SpeedDialLabel>

          <DeleteCategoryDialog category={category}>
            <SpeedDialAction variant="default" className="size-9 ">
              <Trash />
            </SpeedDialAction>
          </DeleteCategoryDialog>
        </SpeedDialItem>
      </SpeedDialContent>
    </SpeedDial>
  );
};
