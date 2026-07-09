import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shared/ui/toggle-group";
import { TaskTag } from "@/interfaces/task.interface";

export const TagsSelector = () => {
  return (
    <ToggleGroup
      type="multiple"
      size="sm"
      variant="outline"
      className="flex flex-wrap justify-center gap-3 pb-1"
    >
      {Object.values(TaskTag).map((tag) => (
        <ToggleGroupItem
          key={tag}
          className="rounded-full"
          value={tag}
          aria-label={`Toggle ${tag}`}
        >
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
