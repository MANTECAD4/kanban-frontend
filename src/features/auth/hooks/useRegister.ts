import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/features/auth/schemas/register.schema";
import type { RegisterState } from "@/features/auth/interfaces/kanban/auth.interface";

export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterState>({
    resolver: zodResolver(RegisterSchema),
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<RegisterState> = (data) => {
    console.log(data);
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
