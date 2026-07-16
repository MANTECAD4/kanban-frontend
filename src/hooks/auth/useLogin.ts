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

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>({
    resolver: zodResolver(LoginSchema),
  });
  const setSession = useAuthStore((state) => state.setSession);
  const navigate = useNavigate();

  const submitLoginMutation = useMutation({
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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onSubmitForm: SubmitHandler<LoginState> = (data) => {
    submitLoginMutation.mutate(data);
  };

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmitForm,
    errors,
  };
};
