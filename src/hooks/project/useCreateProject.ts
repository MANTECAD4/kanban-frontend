import {
  SubmitProjectSchema,
  IconColor,
  type SubmitProjectState,
} from "@/dtos/project.dto";
import { useCreateProjectQuery } from "@/queries/project/useCreatetProjectQuery";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

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
  const submitProjectQuery = useCreateProjectQuery();

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
