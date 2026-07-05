import {
  SubmitProjectSchema,
  IconColor,
  type SubmitProjectState,
  type Project,
} from "@/dtos/project.dto";
import { useCreateProjectQuery } from "@/queries/project/useCreatetProjectQuery";
import { useUpdateProjectQuery } from "@/queries/project/useUpdateProjectQuery";
import { getSlugFromName } from "@/utils/getSlugFromName";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export const useUpdateProject = ({
  id: projectId,
  slug,
  ...initialState
}: Project) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SubmitProjectState>({
    resolver: zodResolver(SubmitProjectSchema),
  });

  useEffect(() => {
    if (initialState) {
      reset({ ...initialState });
    }
  }, [initialState]);

  const updateProjectMutation = useUpdateProjectQuery();

  const onSubmitForm: SubmitHandler<SubmitProjectState> = async (data) => {
    const newSlug = getSlugFromName(data.name);
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
