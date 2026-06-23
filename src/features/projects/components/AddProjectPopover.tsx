import { Button } from "@/shared/components/ui/button";
import { IconPicker } from "@/shared/components/ui/icon-picker";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/shared/components/ui/popover";
import { Separator } from "@/shared/components/ui/separator";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

type AddProjectPopoverProps = Props & React.ComponentProps<typeof Popover>;

export const AddProjectPopover: FC<AddProjectPopoverProps> = ({
  children,
  ...props
}) => {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-70" side="bottom" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-bold text-md">Create project</h4>
            <p className="text-xs">Group related boards within a project</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="" className="h-8 w-45" />
            </div>
            <div className="flex items-center justify-between ">
              <Label htmlFor="icon">Icon</Label>
              <IconPicker className="h-8 w-45" />
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-end gap-3">
          <PopoverClose>
            <Button variant={"outline"}>Cancel</Button>
          </PopoverClose>
          <Button>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
