import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth/register.schema";
import type { RegisterState } from "@/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { submitRegisterData } from "@/actions/auth/submit-register.action";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/providers/store/auth.store";
import { getApiError } from "@/utils/getApiError";

export const useRegister = () => {
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
      toast.success(`Wecolme, ${userData.name}!!!`);
      navigate("/");
    },
    onError: (error) => {
      const { title = "", message = "", code = "" } = getApiError(error);
      console.log({ error: code, message, title });
      toast.error(title, { description: message });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterState>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleSubmitForm = handleSubmit((data) => {
    toast.promise(submitRegisterMutation.mutateAsync(data), {
      loading: "Creating user...",
    });
  });

  return {
    showPassword,
    setShowPassword,
    register,
    errors,

    handleSubmitForm,
  };
};
