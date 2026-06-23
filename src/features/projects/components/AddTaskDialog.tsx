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
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/shared/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState, type FC, type ReactNode } from "react";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import { Textarea } from "@/shared/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";

interface Props {
  children: ReactNode;
  category: {
    name: string;
  };
  className?: string;
}

type AddTaskDIalogProps = Props;

export const AddTaskDialog: FC<AddTaskDIalogProps> = ({
  children,
  category: { name },
}) => {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
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
            <Field>
              <Label htmlFor="date">Due date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-70 justify-start text-left font-normal data-[empty=true]:text-foreground/80"
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </Field>
            <Label htmlFor="priority">Task priority</Label>
            <RadioGroup defaultValue="comfortable" className="w-fit flex">
              <Field orientation="horizontal">
                <RadioGroupItem value="default" id="desc-r1" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r1">Low</FieldLabel>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="comfortable" id="desc-r2" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r2">Medium</FieldLabel>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="compact" id="desc-r3" />
                <FieldContent>
                  <FieldLabel htmlFor="desc-r3">High</FieldLabel>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="urgent" id="urgent" />
                <FieldContent>
                  <FieldLabel htmlFor="urgent">Urgent</FieldLabel>
                </FieldContent>
              </Field>
            </RadioGroup>
          </FieldGroup>
          <div className="overflow-x-scroll custom-scrollbar--transparent pb-1">
            {/* <div className="flex gap-2">
              <Badge variant="outline">UI</Badge>
              <Badge variant="outline">Bug</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Web Design</Badge>
              {Object.values(TaskPriority).map((priorityLevel) => (
                <PriorityBadge priority={priorityLevel} />
              ))} 
            </div>*/}
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <ToggleGroup type="multiple" size="sm" variant="outline">
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="top"
                  aria-label="Toggle top"
                >
                  UI
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="bottom"
                  aria-label="Toggle bottom"
                >
                  Bug
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="left"
                  aria-label="Toggle left"
                >
                  React
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="right"
                  aria-label="Toggle right"
                >
                  Web Design
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>
          </div>
          <div className="overflow-x-scroll custom-scrollbar--transparent pb-1">
            {/* <div className="flex gap-2">
              <Badge variant="outline">UI</Badge>
              <Badge variant="outline">Bug</Badge>
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Web Design</Badge>
              {Object.values(TaskPriority).map((priorityLevel) => (
                <PriorityBadge priority={priorityLevel} />
              ))} 
            </div>*/}
            <Field>
              <FieldLabel>Tags</FieldLabel>
              <ToggleGroup type="multiple" size="sm" variant="outline">
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="top"
                  aria-label="Toggle top"
                >
                  UI
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="bottom"
                  aria-label="Toggle bottom"
                >
                  Bug
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="left"
                  aria-label="Toggle left"
                >
                  React
                </ToggleGroupItem>
                <ToggleGroupItem
                  className="rounded-full px-3 "
                  value="right"
                  aria-label="Toggle right"
                >
                  Web Design
                </ToggleGroupItem>
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
