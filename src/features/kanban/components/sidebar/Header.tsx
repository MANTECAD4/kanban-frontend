import { SidebarMenuButton } from "@/components/ui/sidebar";
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
      <SidebarMenuButton className="flex bg-primary-sidebar cursor-pointer truncate">
        <Plus />

        <p className="">Create project</p>
      </SidebarMenuButton>
    </>
  );
};
