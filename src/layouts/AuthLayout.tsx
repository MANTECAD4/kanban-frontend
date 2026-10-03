import { Outlet } from "react-router";

import { cn } from "@/lib/utils";
import { ToggleThemeButton } from "@/components/shared/custom/ToggleThemeButton";
import { useAuthLayout } from "@/hooks/auth/useAuthLayout";

export const AuthLayout = () => {
  useAuthLayout();
  return (
    <div className={cn("flex flex-col gap-6 m-auto max-w-sm")}>
      <ToggleThemeButton />
      <Outlet />
    </div>
  );
};
