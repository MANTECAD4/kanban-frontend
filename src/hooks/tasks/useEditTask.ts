import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormTaskSchema,
  type FormTaskState,
  type TaskEntity,
} from "../../dtos/task.dto";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateTaskDataAction } from "@/actions/task/update-task-data.action";
import { slugify } from "@/utils/slugify";
import { set } from "date-fns";
import { toast } from "sonner";
import { kanbanQueryClient } from "@/providers/tanstack/TanstackProvider";
import { useNavigate, useParams } from "react-router";
import { getApiError } from "@/utils/getApiError";

export const useEditTask = (task: TaskEntity) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormTaskState>({
    resolver: zodResolver(FormTaskSchema),
  });

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      tags: task.tags,
      dueDay: new Date(task.dueDate),
      dueTime: new Date(task.dueDate).toLocaleTimeString("en-GB", {
        timeStyle: "medium",
      }),
    });
  }, [task]);

  const navigate = useNavigate();

  const { boardSlug = "" } = useParams();
  const updateTaskMutation = useMutation({
    mutationFn: updateTaskDataAction,
    onSuccess: (data) => {
      if (data.task.slug !== task.slug) {
        kanbanQueryClient.removeQueries({ queryKey: ["tasks", task.slug] });
        navigate(`/boards/${boardSlug}/tasks/${data.task.slug}`);
      }
      toast.success(`Task "${task.title}" updated successfully`);
      kanbanQueryClient.invalidateQueries({
        queryKey: ["tasks", data.task.slug],
      });
    },
    onError: (error) => {
      const {
        title = "Server error",
        message = "Something went wrong. Try again later.",
      } = getApiError(error);
      toast.error(title, { description: message });
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    const slug = slugify(data.title);
    const [hours, minutes, seconds] = data.dueTime
      .split(":")
      .map((num) => Number(num));
    const dueDate = set(data.dueDay, {
      hours,
      minutes,
      seconds,
      milliseconds: 0,
    });
    toast.promise(
      updateTaskMutation.mutateAsync({
        ...data,
        dueDate,
        slug,
        taskId: task.id,
      }),
    );
  });

  return { register, reset, control, errors, handleSubmitForm };
};
