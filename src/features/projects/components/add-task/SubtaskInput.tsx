import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Trash } from "lucide-react";
import React, { useState, type FC } from "react";

interface Props {
  subtask: string;
  setSubtasks: Function;
}

export const SubtaskInput: FC<Props> = ({ subtask, setSubtasks }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <div
      key={subtask}
      className="flex justify-between gap-2 items-center rounded-md py-1.5 text-sm"
    >
      <Input
        value={subtask}
        readOnly={!isSelected}
        className="text-xs font-semibold text-foreground/80"
        onDoubleClick={() => setIsSelected(false)}
      />
      <Button
        className="size-7 aspect-square rounded-full"
        variant="destructive"
      >
        <Trash />
      </Button>
    </div>
  );
};
