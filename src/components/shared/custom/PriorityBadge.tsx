import type { FC } from "react";
import { Badge } from "@/components/shared/ui/badge";
import { Siren } from "lucide-react";
import { TaskPriority } from "@/dtos/task.dto";

interface Props {
  priority: TaskPriority;
}

export const PriorityBadge: FC<Props> = ({ priority }) => {
  if (priority === TaskPriority.Low) {
    return (
      <Badge
        className="bg-green-100 border-green-500 text-green-500"
        variant={"outline"}
      >
        <Siren />
        Low
      </Badge>
    );
  }
  if (priority === TaskPriority.Medium) {
    return (
      <Badge
        className="bg-blue-100 border-blue-500 text-blue-500"
        variant={"outline"}
      >
        <Siren />
        Medium
      </Badge>
    );
  }
  if (priority === TaskPriority.High) {
    return (
      <Badge
        className="bg-yellow-100 border-yellow-500 text-yellow-500"
        variant={"outline"}
      >
        <Siren />
        High
      </Badge>
    );
  }
  if (priority === TaskPriority.Urgent) {
    return (
      <Badge
        className="bg-red-100 border-red-500 text-red-500"
        variant={"outline"}
      >
        <Siren />
        Urgent
      </Badge>
    );
  }
};
