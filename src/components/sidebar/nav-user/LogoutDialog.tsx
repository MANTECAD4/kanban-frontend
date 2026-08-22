import { type FC, type ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";
import { Separator } from "@/components/shared/ui/separator";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { logoutAction } from "@/actions/auth/logout.action";
import { useAuthStore } from "@/providers/store/auth.store";

interface Props {
  children: ReactNode;
}

export const LogoutDialog: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      clearSession();
      navigate("/auth/login");
    },
  });

  const clearSession = useAuthStore((state) => state.clearSession);
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5">
        <DialogHeader>
          <div className="flex size-12 justify-center items-center rounded-full border border-destructive bg-destructive/15 mx-auto">
            <TriangleAlert className="stroke-destructive" />
          </div>
          <DialogTitle className="text-lg px-7 text-center my-4">
            Close session
          </DialogTitle>
          <DialogDescription className="px-5">
            Are you sure you want to close your session in this device?
          </DialogDescription>
        </DialogHeader>
        <Separator className="mb-2" />
        <DialogFooter>
          <DialogClose>
            <Button size="lg" variant={"outline"}>
              No, Cancel it.
            </Button>
          </DialogClose>
          <Button size="lg" variant={"destructive"} onClick={handleLogout}>
            Yes, Close session.
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
