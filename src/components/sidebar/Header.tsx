import { AddBoardDialog } from "@/components/board/AddBoardDialog";
import { AddProjectDialog } from "@/components/project/AddProjectDialog";
import { Button } from "@/components/shared/ui/button";

import { SidebarMenuButton } from "@/components/shared/ui/sidebar";
import { Kanban, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export const Header = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="flex gap-2 mt-2.5 items-center ">
        <Button
          variant={"ghost"}
          className="w-full justify-start py-5"
          onClick={() => nav("/")}
        >
          <Kanban className="stroke-foreground stroke-2 size-5" />
          <p className="truncate text-lg font-semibold">My Kanban</p>
        </Button>
      </div>
      <AddBoardDialog>
        {/* Trigger Element as children*/}
        <SidebarMenuButton className="flex bg-primary-sidebar cursor-pointer truncate">
          <Plus />
          <p className="">Create Board</p>
        </SidebarMenuButton>
      </AddBoardDialog>
    </>
  );
};
