import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/kanban/components/sidebar/AppSidebar";

import { Outlet } from "react-router";

export const KanbanLayout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <main className="w-full">
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};
