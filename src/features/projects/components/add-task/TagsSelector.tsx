import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
const tags: string[] = ["UI", "React", "Web Design", "Backend", "API"];

export const TagsSelector = () => {
  return (
    <ToggleGroup
      type="multiple"
      size="sm"
      variant="outline"
      className="overflow-x-scroll custom-scrollbar--transparent pb-1"
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          key={tag}
          className="rounded-full px-3 "
          value={tag}
          aria-label="Toggle top"
        >
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
