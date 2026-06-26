import { Button } from "@/shared/components/ui/button";
import { IconPicker } from "@/shared/components/ui/icon-picker";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/shared/components/ui/dialog";
import { Separator } from "@/shared/components/ui/separator";
import { useState, type FC, type ReactNode } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Cat, Lightbulb } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  DynamicIcon,
  dynamicIconImports,
  type IconName,
} from "lucide-react/dynamic";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";
import { Field, FieldLabel } from "@/shared/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
interface Props {
  children: ReactNode;
}

type AddProjectDialogProps = Props & React.ComponentProps<typeof Dialog>;

const colors = [
  {
    name: "red",
    bg: "bg-red-200",
    stroke: "stroke-red-900",
    border: "border-red-900",
  },
  {
    name: "orange",
    bg: "bg-orange-200",
    stroke: "stroke-orange-900",
    border: "border-orange-900",
  },
  {
    name: "yellow",
    bg: "bg-yellow-200",
    stroke: "stroke-yellow-900",
    border: "border-yellow-900",
  },
  {
    name: "green",
    bg: "bg-green-200",
    stroke: "stroke-green-900",
    border: "border-green-900",
  },
  {
    name: "sky",
    bg: "bg-sky-200",
    stroke: "stroke-sky-900",
    border: "border-sky-900",
  },
  {
    name: "cyan",
    bg: "bg-cyan-200",
    stroke: "stroke-cyan-900",
    border: "border-cyan-900",
  },
  {
    name: "indigo",
    bg: "bg-indigo-200",
    stroke: "stroke-indigo-900",
    border: "border-indigo-900",
  },
  {
    name: "purple",
    bg: "bg-purple-200",
    stroke: "stroke-purple-900",
    border: "border-purple-900",
  },
  {
    name: "pink",
    bg: "bg-pink-200",
    stroke: "stroke-pink-900",
    border: "border-pink-900",
  },
  {
    name: "gray",
    bg: "bg-gray-200",
    stroke: "stroke-gray-900",
    border: "border-gray-900",
  },
];

export const AddProjectDialog: FC<AddProjectDialogProps> = ({
  children,
  ...props
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("folder-kanban");
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-bold text-md">Create project</h4>
            <p className="text-xs">Group related boards within a project</p>
          </div>
          <div className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="name">Project Name</FieldLabel>
              <Input
                id="name"
                defaultValue=""
                className=""
                placeholder="Kanban App"
              />
            </Field>
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="name">Description</FieldLabel>
              <Textarea
                id="name"
                defaultValue=""
                className=""
                placeholder="An application for easy and intuitive task management"
              />
            </Field>
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="name">Icon</FieldLabel>
              <IconPicker
                className="h-8 "
                value={selectedIcon}
                onValueChange={(value) => setSelectedIcon(value)}
              />
            </Field>
            <Field>
              <FieldLabel>Icon color</FieldLabel>
              <ToggleGroup
                className="flex gap-2 flex-wrap"
                variant="default"
                type="single"
                onValueChange={(value) => setSelectedColor(value)}
                value={selectedColor}
              >
                {colors.map((color) => (
                  <ToggleGroupItem
                    key={color.name}
                    className={cn(
                      selectedColor === color.name
                        ? "opacity-100"
                        : "opacity-40",
                      " hover:opacity-100 transition-opacity p-0",
                    )}
                    value={color.name}
                    aria-label={`Select ${color.name}`}
                    title={color.name}
                  >
                    <DynamicIcon
                      name={selectedIcon}
                      className={cn(
                        color.bg,
                        color.stroke,
                        color.border,
                        "border-2, size-7 p-1 rounded-full",
                      )}
                    />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          </div>
        </div>
        <Separator />
        <div className="flex justify-end gap-3">
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
