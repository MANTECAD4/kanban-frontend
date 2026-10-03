import { useEffect } from "react";

import { useAuthStore } from "@/providers/store/auth.store";
import { loadSession } from "@/actions/auth/load-session.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAuthLayout = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setAuthStatus = useAuthStore((state) => state.setAuthStatus);
  const authStatus = useAuthStore((state) => state.authStatus);

  const getSessionDataMutation = useMutation({
    mutationFn: loadSession,
    onSuccess: (sessionData) => {
      const {
        accessToken,
        data: { user },
      } = sessionData;
      setSession({ accessToken, ...user });
    },
    onError: () => {
      setAuthStatus("not-authenticated");
    },
  });

  useEffect(() => {
    if (authStatus === "checking-status") {
      toast.promise(getSessionDataMutation.mutateAsync, {
        loading: "Checking session...",
        // success: "Login Successful",
        // error: "Session closed. Please sign in.",
      });
    }
  }, [authStatus]);

  return {};
};
