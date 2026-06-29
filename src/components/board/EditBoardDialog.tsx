import { useState, type FC, type ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/components/shared/ui/dialog";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Field, FieldLabel } from "@/components/shared/ui/field";
import { Input } from "@/components/shared/ui/input";
import { Textarea } from "@/components/shared/ui/textarea";
import { IconPicker } from "@/components/shared/ui/icon-picker";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shared/ui/toggle-group";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/shared/ui/separator";
import { Button } from "@/components/shared/ui/button";

interface Props {
  children: ReactNode;
}

type AddProjectDialogProps = Props & React.ComponentProps<typeof Dialog>;

const colors = [
  {
    name: "red",
    bg: "bg-red-700/20",
    stroke: "stroke-red-700",
    border: "border-red-700",
  },
  {
    name: "orange",
    bg: "bg-orange-700/20",
    stroke: "stroke-orange-700",
    border: "border-orange-700",
  },
  {
    name: "yellow",
    bg: "bg-yellow-700/20",
    stroke: "stroke-yellow-700",
    border: "border-yellow-700",
  },
  {
    name: "green",
    bg: "bg-green-700/20",
    stroke: "stroke-green-700",
    border: "border-green-700",
  },
  {
    name: "sky",
    bg: "bg-sky-700/20",
    stroke: "stroke-sky-700",
    border: "border-sky-700",
  },
  {
    name: "cyan",
    bg: "bg-cyan-700/20",
    stroke: "stroke-cyan-700",
    border: "border-cyan-700",
  },
  {
    name: "indigo",
    bg: "bg-indigo-700/20",
    stroke: "stroke-indigo-700",
    border: "border-indigo-700",
  },
  {
    name: "purple",
    bg: "bg-purple-700/20",
    stroke: "stroke-purple-700",
    border: "border-purple-700",
  },
  {
    name: "pink",
    bg: "bg-pink-700/20",
    stroke: "stroke-pink-700",
    border: "border-pink-700",
  },
  {
    name: "gray",
    bg: "bg-gray-700/20",
    stroke: "stroke-gray-700",
    border: "border-gray-700",
  },
];

export const EditBoardDialog: FC<AddProjectDialogProps> = ({
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
            <h4 className="leading-none font-bold text-md">Create board</h4>
            <p className="text-xs">Group related tasks within a board</p>
          </div>
          <div className="flex flex-col gap-4">
            <Field className="flex flex-col gap-2">
              <FieldLabel htmlFor="name">Board Name</FieldLabel>
              <Input
                id="name"
                defaultValue=""
                className=""
                placeholder="Landing Page"
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
                onValueChange={(value: IconName) => setSelectedIcon(value)}
                modal
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
