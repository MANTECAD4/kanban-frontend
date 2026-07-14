import { type FC, type ReactNode } from "react";

import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Calendar1Icon,
  Save,
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/shared/ui/separator";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shared/ui/toggle-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/shared/ui/field";
import { Label } from "@/components/shared/ui/label";
import { Input } from "@/components/shared/ui/input";
import { Textarea } from "@/components/shared/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/shared/ui/radio-group";
import { TaskPriority } from "@/interfaces/project.interface";
import { TaskTag } from "@/dtos/task.dto";
import { useAddTask } from "@/hooks/tasks/useAddTask";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { CalendarIcon } from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/shared/ui/calendar";
import { colors } from "../../utils/icon-colors";

interface Props {
  children: ReactNode;
  category: {
    name: string;
    categoryId: number;
  };
}

type AddTaskDIalogProps = Props;

export const AddTaskDialog: FC<AddTaskDIalogProps> = ({
  children,
  category,
}) => {
  const { register, control, errors, reset, handleSubmitForm } = useAddTask(
    category.categoryId,
  );
  return (
    <Dialog onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-md px-5 flex flex-col gap-5"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <DialogHeader className=" mb-4">
            <DialogTitle>Add task for category "{category.name}"</DialogTitle>
          </DialogHeader>
          {/* <Pattern /> */}
          <FieldGroup className="flex flex-col gap-3">
            <Field data-invalid={Boolean(errors.title)}>
              <Label htmlFor="title">Title</Label>
              <Input
                {...register("title")}
                className=""
                placeholder="Implement Responsive Design"
              />
              {errors.title && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.title.message}
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={Boolean(errors.description)}>
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Adapt dashboard page for small screen sizes"
                className=""
              />
              {errors.description && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.description.message}
                </FieldDescription>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field className="" data-invalid={Boolean(errors.dueDay)}>
                <Label htmlFor="start-date">Due date</Label>
                <Controller
                  control={control}
                  name="dueDay"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="due-date"
                          variant="outline"
                          data-empty={!value}
                          className="justify-start text-left font-normal data-[empty=true]:text-foreground/80"
                        >
                          <Calendar1Icon />
                          {value ? (
                            format(value, "PPP")
                          ) : (
                            <span>Pick a value</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={value}
                          onSelect={onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.dueDay && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.dueDay.message}
                  </FieldDescription>
                )}
              </Field>
              <Field className="" data-invalid={Boolean(errors.dueTime)}>
                <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
                <Input
                  {...register("dueTime")}
                  type="time"
                  step="1"
                  className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                {errors.dueTime && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.dueTime.message}
                  </FieldDescription>
                )}
              </Field>
            </div>
            <Field
              data-invalid={Boolean(errors.priority)}
              className="flex flex-col gap-2 mt-2"
            >
              <Label htmlFor="priority">Task priority</Label>
              <Controller
                control={control}
                name="priority"
                render={({ field: { value, onBlur, onChange, ref } }) => (
                  <RadioGroup
                    onValueChange={onChange}
                    value={value}
                    ref={ref}
                    onBlur={onBlur}
                    orientation="horizontal"
                    className="flex"
                  >
                    {Object.entries(TaskPriority).map(([label, value]) => (
                      <Field
                        key={label}
                        orientation="horizontal"
                        className="w-fit"
                      >
                        <RadioGroupItem value={value} id="desc-r1" />
                        <FieldContent>
                          <FieldLabel className="" htmlFor="desc-r1">
                            {label}
                          </FieldLabel>
                        </FieldContent>
                      </Field>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.priority && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.priority.message}
                </FieldDescription>
              )}
            </Field>
            <Field
              className="flex flex-col gap-4 mt-2"
              data-invalid={Boolean(errors.tags)}
            >
              <Label htmlFor="description">Tags</Label>
              <Controller
                control={control}
                name="tags"
                render={({ field: { value, onBlur, onChange, ref } }) => (
                  <ToggleGroup
                    type="multiple"
                    size="sm"
                    variant="outline"
                    className="flex flex-wrap gap-2"
                    onValueChange={onChange}
                    value={value}
                    ref={ref}
                    onBlur={onBlur}
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
                )}
              />
              {errors.tags && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.tags.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <Separator className="my-4" />
          <DialogFooter className="">
            <DialogClose asChild>
              <Button variant={"outline"}>
                <XCircle /> Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <Save /> Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
