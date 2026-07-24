import { createTaskAction } from "@/actions/task/create-task.action";
import {
  FormTaskSchema,
  TaskPriority,
  type FormTaskState,
} from "@/dtos/task.dto";
import { slugify } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { set, addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useAddTask = (categoryId: number) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormTaskState>({
    resolver: zodResolver(FormTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDay: addDays(new Date(), 7),
      dueTime: "23:59:00",
      priority: TaskPriority.Medium,
      tags: [],
    },
  });

  const createTaskQuery = useMutation({
    mutationFn: createTaskAction,
    onSuccess: () => {
      toast.success(`Task created successfully`);
    },
  });

  const handleSubmitForm = handleSubmit(({ dueDay, dueTime, ...rest }) => {
    const slug = slugify(rest.title);
    const [hours, minutes, seconds] = dueTime
      .split(":")
      .map((num) => Number(num));
    const dueDate = set(dueDay, {
      hours,
      minutes,
      seconds,
      milliseconds: 0,
    });

    createTaskQuery.mutate({ ...rest, slug, dueDate, categoryId });
  });

  return {
    register,
    control,
    errors,
    reset,
    handleSubmitForm,
  };
};
