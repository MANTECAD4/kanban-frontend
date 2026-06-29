import { submitRegisterData } from "@/actions/auth/submit-register.action";
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
      } = data;
      setSession({ accessToken, ...userData });
      toast.success(message);
      navigate("/");
    },
  });
};
