import { DueDateInput } from "@/features/projects/components/add-task/DueDateInput";
import { EditAssigneesFIeld } from "@/features/projects/components/add-task/EditAssigneesFIeld";
import { TagsSelector } from "@/features/projects/components/add-task/TagsSelector";
import { TaskPriority } from "@/features/projects/interfaces/projetc.interface";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Textarea } from "@/shared/components/ui/textarea";
import { ChevronsUpDown } from "lucide-react";

export const AddTaskForm = () => {
  return (
    <FieldGroup className="flex flex-col gap-4">
      <Field>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          className="placeholder:text-foreground/40"
          placeholder="Implement Responsive Design"
        />
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Type your message here."
          className="placeholder:text-foregound/40"
        />
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Field className="">
          <Label htmlFor="start-date">Start date</Label>
          <DueDateInput />
        </Field>
        <Field className="">
          <Label htmlFor="due-date">Due date</Label>
          <DueDateInput />
        </Field>

        {/* <Field className="">
          <Label htmlFor="asigness">Assignees</Label>
          <EditAssigneesFIeld />
        </Field> */}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Label htmlFor="priority">Task priority</Label>
        <RadioGroup defaultValue={TaskPriority.Medium} className="w-fit flex">
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
      </div>
      <Field>
        <FieldLabel>Tags</FieldLabel>
        <TagsSelector />
      </Field>
    </FieldGroup>
  );
};
