import { submitLogin } from "@/features/auth/actions/submit-login.action";
import type { LoginResponse } from "@/interfaces/login-response.interface";
import { useAuthStore } from "@/providers/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSubmitLoginQuery = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: submitLogin,
    onSuccess: (data) => {
      const {
        accessToken,
        message,
        data: { user },
      } = data as LoginResponse;
      setSession({ accessToken, ...user });
      toast.success(message);
      navigate("/");
    },
  });
};
