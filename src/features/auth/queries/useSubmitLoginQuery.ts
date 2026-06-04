import { submitLogin } from "@/features/auth/actions/submit-login.action";
import { useMutation } from "@tanstack/react-query";

export const useSubmitLoginQuery = () =>
  useMutation({
    mutationFn: submitLogin,
  });
