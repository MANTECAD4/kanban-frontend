import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { useTaskItem } from "@/hooks/task-management/useTaskItem";
import { useParams } from "react-router";

interface Props {
  category: CategoryEntity;
  index: number;
  task: TaskEntity;
}

export const useTaskCard = (props: Props) => {
  const { handleRef, ref } = useTaskItem(props);
  const { boardSlug = "" } = useParams();

  return {
    handleRef,
    ref,
    boardSlug,
  };
};
