import { type FC, type ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";

import { DueDateInput } from "@/features/projects/components/add-task/DueDateInput";
import { EditAssigneesFIeld } from "@/features/projects/components/add-task/EditAssigneesFIeld";
import { TaskPriority } from "@/features/projects/interfaces/projetc.interface";

interface Props {
  children: ReactNode;
  category: {
    name: string;
  };
  className?: string;
}

type AddTaskDIalogProps = Props;

const tags: string[] = ["UI", "React", "Web Design", "Backend", "API"];

export const AddTaskDialog: FC<AddTaskDIalogProps> = ({
  children,
  category: { name },
}) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="sm:max-w-sm"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add task for category "{name}"</DialogTitle>
            <DialogDescription className="text-xs text-foreground/80">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                className="placeholder:text-foreground/60"
                placeholder="Implement Responsive Design"
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type your message here."
              />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field className="">
                <Label htmlFor="due-date">Due date</Label>
                <DueDateInput />
              </Field>

              <Field className="">
                <Label htmlFor="asigness">Assignees</Label>
                <EditAssigneesFIeld />
              </Field>
            </div>
            <Label htmlFor="priority">Task priority</Label>
            <RadioGroup
              defaultValue={TaskPriority.Medium}
              className="w-fit flex"
            >
              {Object.entries(TaskPriority).map(([label, value]) => (
                <Field key={label} orientation="horizontal">
                  <RadioGroupItem value={value} id="desc-r1" />
                  <FieldContent>
                    <FieldLabel className="" htmlFor="desc-r1">
                      {label}
                    </FieldLabel>
                  </FieldContent>
                </Field>
              ))}
            </RadioGroup>
          </FieldGroup>
          <div className="overflow-x-scroll custom-scrollbar--transparent pb-1">
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <ToggleGroup type="multiple" size="sm" variant="outline">
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
            </Field>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
