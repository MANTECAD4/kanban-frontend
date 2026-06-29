import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/register.schema";
import type { RegisterState } from "@/interfaces/auth.interface";
import { useSubmitRegisterQuery } from "@/queries/auth/useSubmitRegisterQuery";

export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterState>({
    resolver: zodResolver(RegisterSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const submitRegisterMutation = useSubmitRegisterQuery();

  const onSubmitForm: SubmitHandler<RegisterState> = (data) => {
    submitRegisterMutation.mutate(data);
  };

  return {
    showPassword,
    setShowPassword,
    register,
    errors,
    handleSubmit,
    onSubmitForm,
  };
};
