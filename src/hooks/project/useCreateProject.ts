import { createProjectAction } from "@/actions/project/create-project.action";
import {
  SubmitProjectSchema,
  IconColor,
  type SubmitProjectState,
} from "@/dtos/project.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useCreateProject = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubmitProjectState>({
    resolver: zodResolver(SubmitProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "folder",
      iconColor: IconColor.RED,
    },
  });

  const navigate = useNavigate();

  const submitProjectQuery = useMutation({
    mutationFn: createProjectAction,
    onSuccess: (data) => {
      const {
        message,
        project: { slug },
      } = data;
      toast.success(message);
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate(`/projects/${slug}`);
    },
  });

  const onSubmitForm: SubmitHandler<SubmitProjectState> = async (data) => {
    const slug = slugify(data.name);
    submitProjectQuery.mutate({ ...data, slug });
  };

  return {
    errors,
    control,
    onSubmitForm,
    register,
    handleSubmit,
    reset,
  };
};
