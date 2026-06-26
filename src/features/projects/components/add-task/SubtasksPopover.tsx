import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Separator } from "@/shared/components/ui/separator";
import { Trash, Plus, ClosedCaption, X } from "lucide-react";
import { useState, type FC, type PropsWithChildren } from "react";
import { clsx } from "clsx";

const initialSubtasks = [
  "Fix z-index issue in modal",
  "Change add task form presentation",
  "Add animations",
];

export const SubtasksPopover: FC<PropsWithChildren> = ({ children }) => {
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="relative w-80 border border-foreground"
        side="bottom"
        align="center"
      >
        <PopoverClose className="absolute top-2 right-2 ">
          <Button
            variant={"outline"}
            className=" aspect-square rounded-full size-6"
          >
            <X size="icon-sm" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
