import { createBoardAction } from "@/actions/boards/create-board.action";
import { SubmitBoardSchema, type SubmitBoardState } from "@/dtos/board.dtos";
import { IconColorKeys } from "@/dtos/project.dto";
import { useAuthStore } from "@/providers/store/auth.store";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { getApiError } from "@/utils/getApiError";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCreateBoard = () => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SubmitBoardState>({
    resolver: zodResolver(SubmitBoardSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "folder",
      iconColor: IconColorKeys.RED,
    },
  });

  const userId = useAuthStore((s) => s.id);

  const createBoardMutation = useMutation({
    mutationFn: createBoardAction,
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["user", userId, "boards"],
      });
    },
    onError: (error) => {
      const { code = "", message = "", title = "" } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const onSumbitForm = handleSubmit((data) => {
    const slug = slugify(data.name);
    toast.promise(createBoardMutation.mutateAsync({ ...data, slug }), {
      loading: "Creating board...",
    });
  });

  return {
    register,
    control,
    errors,
    reset,
    onSumbitForm,
  };
};
