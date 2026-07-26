import { Button } from "@/components/shared/ui/button";
import { ButtonGroup } from "@/components/shared/ui/button-group";
import { Input } from "@/components/shared/ui/input";
import { Checkbox } from "@/components/shared/ui/checkbox";
import { Pencil, Plus, Trash } from "lucide-react";
import { useSubtasksForm } from "@/hooks/subtask/useSubtasksForm";
import type { FC } from "react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/shared/ui/field";
const subtasks = [
  "Fix z-index issue in modal",
  "Change add task form presentation",
  "Add animations",
  "Improve performance",
  "Implement task query",
];

interface Props {
  taskId: number;
}
export const ManageSubtasksForm: FC<Props> = ({ taskId }) => {
  const { errors, clearErrors, register, submitSubtask } =
    useSubtasksForm(taskId);
  return (
    <div className="grid gap-4  w-full">
      <div className="space-y-2">
        {/* <div className="flex justify-between mb-6">
          <h4 className="leading-none font-medium">Add subtask</h4>
        </div> */}
        <form onSubmit={submitSubtask}>
          <div className="flex justify-between gap-2">
            <Field>
              <Input
                {...register("description")}
                aria-invalid={Boolean(errors.description)}
                className=""
                placeholder="Implement Responsive Design"
                onBlur={() => {
                  clearErrors();
                }}
              />
              {errors.description && (
                <FieldDescription
                  className={"text-xs font-semibold text-destructive"}
                >
                  {errors.description.message}
                </FieldDescription>
              )}
            </Field>
            <Button variant="ghost" type="submit" className="">
              Add subtask
              <Plus />
            </Button>
          </div>
        </form>
      </div>
      {/* <Separator /> */}
      {/* <Empty>
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
      </Empty> */}

      <div className="flex flex-col gap-1.5 pr-1 max-h-40 overflow-y-scroll custom-scrollbar ">
        {subtasks.map((subtask) => (
          <div
            key={subtask}
            className="flex gap-2 items-center rounded-md py-1 text-sm "
          >
            <Checkbox />
            <Input
              value={subtask}
              readOnly
              className=" font-semibold text-foreground/80  bg-transparent! border-0"
              // disabled
            />

            <ButtonGroup>
              <Button variant="outline" size="icon">
                <Pencil />
              </Button>
              <Button variant="outline" size="icon">
                <Trash />
              </Button>
            </ButtonGroup>
          </div>
        ))}
      </div>
    </div>
  );
};
