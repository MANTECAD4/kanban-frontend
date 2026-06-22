import { submitLogin } from "@/features/auth/actions/submit-login.action";
import { useAuthStore } from "@/shared/providers/store/auth.store";
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
      } = data;
      setSession({ accessToken, ...user });
      toast.success(message);
      navigate("/");
    },
  });
};
