import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { RegisterState } from "@/features/auth/interfaces/auth/register.interface";

export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterState>();

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
