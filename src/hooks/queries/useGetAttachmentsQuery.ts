import { getAttachmentsAction } from "@/actions/attachments/get-attachments.action";
import { useQuery } from "@tanstack/react-query";

export const useGetAttachmentsQuery = (taskId: number = 0) => {
  return useQuery({
    queryKey: ["in-task", taskId, "attachments"],
    queryFn: () => getAttachmentsAction(taskId),
    enabled: taskId !== 0,
  });
};
