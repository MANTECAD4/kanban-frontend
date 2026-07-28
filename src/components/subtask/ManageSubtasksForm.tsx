import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/input";
import { Plus, StickyNoteX } from "lucide-react";
import { useSubtasksForm } from "@/hooks/subtask/useSubtasksForm";
import type { FC } from "react";
import { Field, FieldDescription } from "@/components/shared/ui/field";
import { useQuery } from "@tanstack/react-query";
import { getSubtasksAction } from "@/actions/subtask/getSubtasksAction";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/ui/empty";
import { SubtaskItem } from "@/components/subtask/SubtaskItem";

interface Props {
  taskId: number;
}
export const ManageSubtasksForm: FC<Props> = ({ taskId }) => {
  const { errors, clearErrors, register, submitSubtask } =
    useSubtasksForm(taskId);

  const getSubtasksQuery = useQuery({
    queryKey: ["in-task", taskId, "subtasks"],
    queryFn: () => getSubtasksAction(taskId),
    staleTime: 0,
  });

  if (!getSubtasksQuery.data) return;

  const {
    data: { subtasks },
    isFetching,
  } = getSubtasksQuery;

  if (isFetching) return;
  return (
    <>
      <div className="grid gap-4  w-full">
        <div className="space-y-2">
          <form onSubmit={submitSubtask}>
            <div className="flex justify-between gap-2">
              <Field>
                <Input
                  {...register("description")}
                  aria-invalid={Boolean(errors.description)}
                  className=""
                  placeholder="Add user registration form"
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
        {subtasks.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <StickyNoteX />
              </EmptyMedia>
              <EmptyTitle>No Subtasks Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any subtasks yet. Get started by
                creating some of them.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col gap-1.5 pr-1 max-h-40 overflow-y-scroll custom-scrollbar ">
            {subtasks.map((subtask) => (
              <SubtaskItem key={subtask.id} subtask={subtask} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
