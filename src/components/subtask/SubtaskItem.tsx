import { useEffect, useState, type FC } from "react";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Checkbox } from "@/components/shared/ui/checkbox";
import { cn } from "@/lib/utils";
import { Pencil, Save, Trash } from "lucide-react";
import { type SubtaskEntity } from "@/dtos/subtask.dto";
import { useMutation } from "@tanstack/react-query";
import { updateSubtaskStatusAction } from "@/actions/subtask/updateSubtaskStatus.action";
import { toast } from "sonner";
import { UpdateSubtaskPopover } from "@/components/subtask/UpdateSubtaskPopover";

interface Props {
  subtask: SubtaskEntity;
}

export const SubtaskItem: FC<Props> = ({
  subtask: { description, isCompleted: originalIsCompleted, id: subtaskId },
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(originalIsCompleted);
  const updateStatusMutation = useMutation({
    mutationFn: updateSubtaskStatusAction,
    onError: (error) => {
      toast.error("Somethign went wrong");
    },
  });
  useEffect(() => {
    updateStatusMutation.mutate({ isCompleted, subtaskId });
  }, [isCompleted, subtaskId]);

  return (
    <div className="flex gap-2 items-center rounded-md py-1 text-sm ">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={() => setIsCompleted((value) => !value)}
      />
      <div
        className={cn(
          isCompleted ? "line-through" : "",
          "text-xs font-semibold text-foreground/80 w-full",
        )}
      >
        {description}
      </div>

      <ButtonGroup>
        <UpdateSubtaskPopover subtask={{ id: subtaskId, description }}>
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        </UpdateSubtaskPopover>
        <Button variant="outline" size="icon">
          <Trash />
        </Button>
      </ButtonGroup>
    </div>
  );
};
