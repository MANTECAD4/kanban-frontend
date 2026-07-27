import { Button } from "@/components/shared/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/ui/field";
import { Input } from "@/components/shared/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { Separator } from "@/components/shared/ui/separator";
import { useUpdateSubtask } from "@/hooks/subtask/useUpdateSubtask";
import { Save, XCircle } from "lucide-react";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  subtask: { id: number; description: string };
}

export const UpdateSubtaskPopover: FC<Props> = ({ children, subtask }) => {
  const { register, errors, handleSubmitForm, reset } =
    useUpdateSubtask(subtask);

  return (
    <>
      <Popover onOpenChange={() => reset()}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="max-w-xs" align="center" side="left">
          <PopoverHeader>
            <PopoverTitle>Edit description</PopoverTitle>
            <PopoverDescription>
              Type a new description for this subtask.
            </PopoverDescription>
          </PopoverHeader>
          <form onSubmit={handleSubmitForm}>
            <FieldGroup className="gap-8">
              <Field data-invalid={Boolean(errors.description)}>
                {/* <FieldLabel htmlFor="width" className="">
                New value
              </FieldLabel> */}
                <Input
                  {...register("description")}
                  placeholder="Fix form issue"
                  aria-invalid={Boolean(errors.description)}
                />
                {errors.description && (
                  <FieldDescription className="font-semibold text-destructive text-xs">
                    {errors.description.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-3 mt-4">
              <PopoverClose asChild>
                <Button size={"lg"} variant={"outline"}>
                  <XCircle />
                  Cancel
                </Button>
              </PopoverClose>
              <Button size={"lg"} type="submit">
                <Save />
                Save changes
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
};
