import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth/login.schema";
import type { LoginState } from "@/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { submitLogin } from "@/actions/auth/submit-login.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/providers/store/auth.store";

import { getApiError } from "@/utils/getApiError";

export const useLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();

  const submitLoginMutation = useMutation({
    mutationFn: submitLogin,
    onSuccess: (data) => {
      const {
        accessToken,
        message: _message,
        data: { user },
      } = data;
      setSession({ accessToken, ...user });
      toast.success(`Welcome back, ${user.name}`);
      navigate("/");
    },
    onError: (error) => {
      const { title, message, code } = getApiError(error);
      console.log({ error: code, message, title });
      toast.error(title, { description: message });
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmitForm: SubmitHandler<LoginState> = (data) => {
    toast.promise(submitLoginMutation.mutateAsync(data), {
      loading: "Checking credentials...",
    });
  };

  return {
    handleSubmit,
    showPassword,
    setShowPassword,
    register,
    onSubmitForm,
    errors,
  };
};
