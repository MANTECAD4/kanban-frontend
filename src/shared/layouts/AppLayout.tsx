import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";
import { AppSidebar } from "@/shared/components/custom/sidebar/AppSidebar";

import { Outlet } from "react-router";

export const AppLayout = () => {
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
