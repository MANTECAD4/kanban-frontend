import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/register.schema";
import type { RegisterState } from "@/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { submitRegisterData } from "@/actions/auth/submit-register.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/providers/store/auth.store";

export const useRegister = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterState>({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const submitRegisterMutation = useMutation({
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
