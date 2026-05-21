import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginState } from "@/features/auth/interfaces/auth/login.interface";
import { useState } from "react";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginState>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<LoginState> = (data) => {
    console.log(data);
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
