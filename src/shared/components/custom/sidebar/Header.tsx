import { Button } from "@/shared/components/ui/button";
import { IconPicker } from "@/shared/components/ui/icon-picker";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarMenuButton } from "@/shared/components/ui/sidebar";
import { FolderKanban, Plus } from "lucide-react";

export const Header = () => {
  return (
    <>
      <div className="flex gap-2 mt-2.5 items-center">
        <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
          <FolderKanban className="stroke-foreground stroke-2 size-5" />
        </div>
        <div className="grid flex-1 leading-tight">
          <span className="truncate text-lg font-semibold">My Kanban</span>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton className="flex bg-primary-sidebar cursor-pointer truncate">
            <Plus />

            <p className="">Create project</p>
          </SidebarMenuButton>
        </PopoverTrigger>
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
    </>
  );
};
