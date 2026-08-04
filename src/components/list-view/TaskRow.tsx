import { Button } from "@/components/shared/ui/button";
import { Progress } from "@/components/shared/ui/progress";
import type { CategoryEntity } from "@/dtos/category.dto";
import type { TaskEntity } from "@/dtos/task.dto";
import { useTaskCard } from "@/hooks/kanban/useTaskCard";
import { Grip, Siren } from "lucide-react";
import type { FC } from "react";

interface Props {
  task: TaskEntity;
  index: number;
  category: CategoryEntity;
}
export const TaskRow: FC<Props> = ({ task, category, index }) => {
  const { handleRef, ref, boardSlug, projectSlug } = useTaskCard({
    task,
    category,
    index,
  });
  return (
    <div
      ref={ref}
      className="grid text-xs p-2 gap-3 items-center "
      style={{
        gridTemplateColumns: "5fr 60fr 8fr 12fr 15fr 8fr",
      }}
    >
      <div className=" ">
        <Button
          ref={handleRef}
          variant="ghost"
          size={"icon-sm"}
          className="cursor-grab"
        >
          <Grip />
        </Button>
      </div>
      <p className="text-sm">{task.title}</p>
      <div className="flex gap-2 items-center text-destructive ">
        <Siren className="size-4" />
        <p>High</p>
      </div>
      <div className="flex items-center gap-2 ">
        <Progress className="" value={66} />
      </div>
      <p className="">Mon, 15 May 2026</p>
      <p className="">11:59 P.M.</p>
    </div>
  );
};
