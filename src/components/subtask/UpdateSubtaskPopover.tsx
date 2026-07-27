import { Button } from "@/components/shared/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/shared/ui/field";
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
import { Save, XCircle } from "lucide-react";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  subtask: { id: number; description: string };
}

export const UpdateSubtaskPopover: FC<Props> = ({
  children,
  subtask: { description, id },
}) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="max-w-xs" align="center" side="left">
          <PopoverHeader>
            <PopoverTitle>Edit description</PopoverTitle>
            <PopoverDescription>
              Type a new description for this subtask.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup className="gap-8">
            <Field orientation="horizontal">
              {/* <FieldLabel htmlFor="width" className="">
                New value
              </FieldLabel> */}
              <Input
                id="width"
                placeholder="Fix form issue"
                defaultValue={description}
              />
            </Field>
          </FieldGroup>
          <Separator />
          <div className="grid grid-cols-2 gap-3">
            <PopoverClose asChild>
              <Button size={"lg"} variant={"outline"}>
                <XCircle />
                Cancel
              </Button>
            </PopoverClose>
            <Button size={"lg"}>
              <Save />
              Save changes
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
