import { type FC } from "react";
import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Checkbox } from "@/components/shared/ui/checkbox";
import { cn } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";
import { type SubtaskEntity } from "@/dtos/subtask.dto";
import { UpdateSubtaskPopover } from "@/components/subtask/UpdateSubtaskPopover";
import { useSubtaskItem } from "@/hooks/subtask/useSubtaskItem";
import { DeleteSubtaskDialog } from "@/components/subtask/DeleteSubtaskDialog";

interface Props {
  subtask: SubtaskEntity;
}

export const SubtaskItem: FC<Props> = ({ subtask }) => {
  const { isCompleted, setIsCompleted } = useSubtaskItem({ subtask });
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
        {subtask.description}
      </div>

      <ButtonGroup>
        <UpdateSubtaskPopover
          subtask={{ id: subtask.id, description: subtask.description }}
        >
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        </UpdateSubtaskPopover>
        <DeleteSubtaskDialog subtask={subtask}>
          <Button variant="outline" size="icon">
            <Trash />
          </Button>
        </DeleteSubtaskDialog>
      </ButtonGroup>
    </div>
  );
};
