import { submitRegisterData } from "@/features/auth/actions/submit-register.action";
import type { RegisterResponse } from "@/interfaces/register-response.interface";
import { useAuthStore } from "@/providers/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useSubmitRegisterQuery = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: submitRegisterData,
    onSuccess: (data) => {
      const {
        accessToken,
        message,
        data: { user: userData },
      } = data as RegisterResponse;
      setSession({ accessToken, ...userData });
      toast.success(message);
      navigate("/");
    },
  });
};
