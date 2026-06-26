import { useState, type FC, type ReactNode } from "react";

import { DueDateInput } from "@/features/projects/components/add-task/DueDateInput";
import { EditAssigneesFIeld } from "@/features/projects/components/add-task/EditAssigneesFIeld";
import { TagsSelector } from "@/features/projects/components/add-task/TagsSelector";

import { TaskPriority } from "@/features/projects/interfaces/projetc.interface";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  ArrowLeft,
  ArrowRight,
  ChevronsUpDown,
  ListTodo,
  NotepadText,
} from "lucide-react";
import { SubtasksPopover } from "@/features/projects/components/add-task/SubtasksPopover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Pattern } from "@/components/examples/c-stepper-7";
import { AddTaskForm } from "@/features/projects/components/add-task/AddTaskForm";
import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/shared/components/reui/stepper";
import { ManageSubtasksForm } from "@/features/projects/components/add-task/ManageSubtasksForm";

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
  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    {
      title: "Task Data",
      icon: <NotepadText className="size-3.5" />,
      content: <AddTaskForm />,
    },
    {
      title: "Subtasks (Optional)",
      icon: <ListTodo className="size-3.5" />,
      content: <ManageSubtasksForm />,
    },
  ];

  const [stepperPage, setStepperPage] = useState<number>(1);

  const handleBackBtn = () => {
    setStepperPage((page) => (page <= 1 ? 1 : page - 1));
  };
  const handleNextBtn = () => {
    setStepperPage((page) => (steps.length ? steps.length : page + 1));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="sm:max-w-md px-5 flex flex-col gap-5"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-0">
            <DialogTitle>Add task for category "{name}"</DialogTitle>
          </DialogHeader>
          {/* <Pattern /> */}
          <Stepper value={stepperPage} className="w-full max-w-md space-y-8">
            <StepperNav className="">
              {steps.map((step, index) => (
                <StepperItem
                  key={index}
                  step={index + 1}
                  className="relative flex-1 items-start"
                >
                  <StepperTrigger
                    className="flex flex-col items-center gap-2"
                    asChild
                  >
                    <StepperIndicator className=" rounded-full">
                      {step.icon}
                    </StepperIndicator>
                    <StepperTitle>{step.title}</StepperTitle>
                    {/* <StepperDescription className="text-xs">
                {step.description}
              </StepperDescription> */}
                  </StepperTrigger>

                  {steps.length > index + 1 && (
                    <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-2.5 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                  )}
                </StepperItem>
              ))}
            </StepperNav>

            <StepperPanel className="text-sm">
              {steps.map((step, index) => (
                <StepperContent
                  key={index}
                  value={index + 1}
                  className="flex items-center justify-center"
                >
                  {step.content}
                </StepperContent>
              ))}
            </StepperPanel>
          </Stepper>
          <DialogFooter className="">
            <Button
              type="submit"
              disabled={stepperPage <= 1}
              onClick={handleBackBtn}
            >
              <ArrowLeft /> Back
            </Button>
            {}
            <Button type="submit" onClick={handleNextBtn}>
              Next <ArrowRight />
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

{
  /* <Tabs defaultValue="overview" className="w-full">
  <TabsList>
    <TabsTrigger value="main">Main Info</TabsTrigger>
    <TabsTrigger value="subtasks">Subtasks (optional)</TabsTrigger>
  </TabsList>
  <TabsContent value="main">
    <AddTaskForm />
  </TabsContent>
  <TabsContent value="subtasks">ola</TabsContent>
</Tabs> */
}
{
  /* <DialogDescription className="text-xs text-foreground/60">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */
}
