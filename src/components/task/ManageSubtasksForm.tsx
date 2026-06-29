import { Button } from "@/components/shared/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { Input } from "@/components/shared/ui/input";
import { Separator } from "@/components/shared/ui/separator";
import { Plus, StickyNoteX } from "lucide-react";
const subtasks = [
  "Fix z-index issue in modal",
  "Change add task form presentation",
  "Add animations",
];
export const ManageSubtasksForm = () => {
  return (
    <div className="grid gap-4  w-full">
      <div className="space-y-2">
        {/* <div className="flex justify-between mb-6">
          <h4 className="leading-none font-medium">Add subtask</h4>
        </div> */}
        <div className="flex justify-between gap-2">
          <Input
            id="title"
            name="title"
            className="placeholder:text-foreground/40"
            placeholder="Implement Responsive Design"
          />
          <Button
            variant="default"
            className="rounded-full aspect-square size-7"
          >
            <Plus />
          </Button>
        </div>
      </div>
      {/* <Separator /> */}
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <StickyNoteX />
          </EmptyMedia>
          <EmptyTitle>No Subtasks Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any subtasks yet. Get started by creating
            some of them.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      {/* <div className="flex flex-col gap-2 pr-1 max-h-50 overflow-y-scroll custom-scrollbar ">
        {subtasks.map((subtask) => (
          <div
            key={subtask}
            className="flex justify-between gap-2 items-center rounded-md py-1.5 text-sm"
          >
            <Input
              value={subtask}
              readOnly
              className="text-xs font-semibold text-foreground/80"
            />

            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Save />
              </Button>
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
              <Button variant="outline" size="icon">
                <Trash />
              </Button>
            </ButtonGroup>
          </div>
        ))}
      </div> */}
      <Separator />
    </div>
  );
};
