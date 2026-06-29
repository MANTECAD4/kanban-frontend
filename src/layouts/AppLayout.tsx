import { AppSidebar } from "@/components/shared/custom/sidebar/AppSidebar";

import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <AppSidebar variant="floating" />
      <main className="w-full">
        <Outlet />
      </main>
    </>
  );
};
