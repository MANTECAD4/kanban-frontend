import { useState, type FC, type ReactNode } from "react";

import { Button } from "@/components/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/ui/dialog";

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
} from "@/components/shared/reui/stepper";
import { ArrowLeft, ArrowRight, ListTodo, NotepadText } from "lucide-react";
import { AddTaskForm } from "@/components/task/AddTaskForm";
import { ManageSubtasksForm } from "@/components/task/ManageSubtasksForm";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { TagsSelector } from "@/components/task/TagsSelector";
import { Separator } from "@/components/shared/ui/separator";

interface Props {
  children: ReactNode;
  category: {
    name: string;
  };
  className?: string;
}

type AddTaskDIalogProps = Props;
interface Step {
  title: string;
  icon: IconName;
  content: ReactNode;
}

const steps: Step[] = [
  {
    title: "Task Data",
    icon: "notepad-text",
    content: <AddTaskForm />,
  },
  {
    title: "Tags",
    icon: "tags",
    content: <TagsSelector />,
  },
  {
    title: "Subtasks (Optional)",
    icon: "list-todo",
    content: <ManageSubtasksForm />,
  },
];

export const AddTaskDialog: FC<AddTaskDIalogProps> = ({
  children,
  category: { name },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [stepperPage, setStepperPage] = useState<number>(1);

  const handleBackBtn = () => {
    setStepperPage((page) => (page <= 1 ? 1 : page - 1));
  };
  const handleNextBtn = () => {
    setStepperPage((page) => (page >= steps.length ? steps.length : page + 1));
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
                      <DynamicIcon name={step.icon} className="size-3.5" />
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
          <Separator className="my-3" />
          <DialogFooter className="">
            <Button
              type="submit"
              //@ts-expect-error
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
