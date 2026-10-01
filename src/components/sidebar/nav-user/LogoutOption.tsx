import { logoutAction } from "@/actions/auth/logout.action";
import { DropdownMenuItem } from "@/components/shared/ui/dropdown-menu";
import { useAuthStore } from "@/providers/store/auth.store";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

export const LogoutOption = () => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutAction,
  });

  const clearSession = useAuthStore((state) => state.clearSession);
  const handleLogout = () => {
    clearSession();
    kanbanQueryClient.clear();
    logoutMutation.mutate();
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
};
