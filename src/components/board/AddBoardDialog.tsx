import { useState, type FC, type ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/components/shared/ui/dialog";
import { type IconName } from "lucide-react/dynamic";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/shared/ui/field";
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
import { colors } from "@/utils/icon-colors";
import { Palette, Save } from "lucide-react";
import { useCreateBoard } from "@/hooks/boards/useCreateBoard";
import { Controller } from "react-hook-form";

interface Props {
  children: ReactNode;
  projectId: number;
}

type AddProjectDialogProps = Props & React.ComponentProps<typeof Dialog>;

export const AddBoardDialog: FC<AddProjectDialogProps> = ({
  children,
  projectId,
  ...props
}) => {
  const { register, control, errors, onSumbitForm, reset } =
    useCreateBoard(projectId);

  return (
    <Dialog {...props} onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={onSumbitForm} className="flex flex-col gap-3">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-bold text-md">Create board</h4>
              <p className="text-xs">Group related tasks within a board</p>
            </div>
            <div className="flex flex-col gap-4">
              <Field
                className="flex flex-col gap-2"
                data-invalid={Boolean(errors.name)}
              >
                <FieldLabel htmlFor="name">Board Name</FieldLabel>
                <Input
                  {...register("name")}
                  className=""
                  placeholder="Landing Page"
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                {errors.name && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>
              <Field
                className="flex flex-col gap-2"
                data-invalid={Boolean(errors.description)}
              >
                <FieldLabel htmlFor="name">Description</FieldLabel>
                <Textarea
                  {...register("description")}
                  className=""
                  placeholder="An application for easy and intuitive task management"
                  aria-invalid={Boolean(errors.description)}
                  required
                />
                {errors.description && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.description.message}
                  </FieldDescription>
                )}
              </Field>
              <Field
                className="flex flex-col gap-2"
                data-invalid={Boolean(errors.icon)}
              >
                <FieldLabel htmlFor="name">Icon</FieldLabel>
                <Controller
                  control={control}
                  name="icon"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <IconPicker
                      className="h-8 "
                      onValueChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      ref={ref}
                      modal
                      aria-invalid={Boolean(errors.icon)}
                    />
                  )}
                />
                {errors.icon && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.icon.message}
                  </FieldDescription>
                )}
              </Field>
              <Field data-invalid={Boolean(errors.iconColor)}>
                <FieldLabel>Icon color</FieldLabel>
                <Controller
                  control={control}
                  name="iconColor"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ToggleGroup
                      className="flex gap-2 flex-wrap"
                      variant="default"
                      type="single"
                      onBlur={onBlur}
                      ref={ref}
                      onValueChange={onChange}
                      value={value}
                      aria-invalid={Boolean(errors.iconColor)}
                    >
                      {Object.entries(colors).map(([name, color]) => (
                        <ToggleGroupItem
                          key={name}
                          className={cn(
                            value === name ? "opacity-100" : "opacity-40",
                            " hover:opacity-100 transition-opacity p-0",
                          )}
                          value={name}
                          aria-label={`Select ${name}`}
                          title={name}
                        >
                          <Palette
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
                  )}
                />
                {errors.iconColor && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.iconColor.message}
                  </FieldDescription>
                )}
              </Field>
            </div>
          </div>
          <Separator />
          <div className="flex justify-end gap-3">
            <DialogClose>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">
              <Save />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
