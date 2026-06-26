import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitLoginQuery } from "@/features/auth/queries/useSubmitLoginQuery";
import { LoginSchema } from "@/features/auth/schemas/login.schema";
import type { LoginState } from "@/features/auth/interfaces/kanban/auth.interface";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginState>({
    resolver: zodResolver(LoginSchema),
  });

  const submitLoginMutation = useSubmitLoginQuery();
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
