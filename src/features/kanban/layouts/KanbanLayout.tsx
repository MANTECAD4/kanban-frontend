import { useAuthStore } from "@/providers/store/auth.store";
import { Outlet } from "react-router";

export const KanbanLayout = () => {
  return (
    <>
      <div>KanbanLayout</div>
      <Outlet />
    </>
  );
};
