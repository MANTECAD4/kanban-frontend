import { logoutAction } from "@/actions/auth/logout.action";
import { DropdownMenuItem } from "@/components/shared/ui/dropdown-menu";
import { useAuthStore } from "@/providers/store/auth.store";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const LogoutOption = () => {
  const clearSession = useAuthStore((state) => state.clearSession);
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      toast.success("Session successfully closed.");
    },
    onError: () => {
      toast.info("Local-session closed.");
    },
    onSettled: () => {
      kanbanQueryClient.clear();
      clearSession();
      navigate("/auth/login");
    },
  });

  const handleLogout = () => {
    toast.promise(logoutMutation.mutateAsync(), {
      loading: "Closing session...",
    });
  };
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
};
