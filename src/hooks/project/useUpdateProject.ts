import { updateProjectAction } from "@/actions/project/update-project.action";
import {
  SubmitProjectSchema,
  type SubmitProjectState,
  type ProjectEntity,
} from "@/dtos/project.dto";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";

import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useUpdateProject = ({
  id: projectId,
  slug,
  ...initialState
}: ProjectEntity) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubmitProjectState>({
    resolver: zodResolver(SubmitProjectSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialState) {
      reset({ ...initialState });
    }
  }, [initialState]);

  const updateProjectMutation = useMutation({
    mutationFn: updateProjectAction,
    onSuccess: (data) => {
      const {
        project: { slug: newSlug },
        message,
      } = data;
      toast.success(message);
      navigate(`/projects/${slug}`);
      if (slug !== newSlug) {
        kanbanQueryClient.removeQueries({
          queryKey: ["projects", slug],
        });
      }
      kanbanQueryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const onSubmitForm: SubmitHandler<SubmitProjectState> = async (data) => {
    const newSlug = slugify(data.name);
    updateProjectMutation.mutate({
      projectData: { ...data, slug: newSlug },
      projectId,
    });
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
