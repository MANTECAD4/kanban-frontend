import { type FC, type ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/components/shared/ui/dialog";
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
import { useAddProject } from "@/hooks/project/useAddProject";
import { Palette } from "lucide-react";
import { IconColor } from "@/dtos/project.dto";
import { Controller } from "react-hook-form";

interface Props {
  children: ReactNode;
}

type AddProjectDialogProps = Props & React.ComponentProps<typeof Dialog>;

export const AddProjectDialog: FC<AddProjectDialogProps> = ({
  children,
  ...props
}) => {
  const {
    colors,
    errors,
    onSubmitForm,
    register,
    reset,
    handleSubmit,
    control,
  } = useAddProject();
  return (
    <Dialog {...props} onOpenChange={() => reset()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-bold text-md">Create project</h4>
              <p className="text-xs">Group related boards within a project</p>
            </div>
            <div className="flex flex-col gap-4">
              <Field
                className="flex flex-col gap-2"
                data-invalid={Boolean(errors.name)}
              >
                <FieldLabel htmlFor="name">Project Name</FieldLabel>
                <Input
                  {...register("name")}
                  className=""
                  placeholder="Kanban App"
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
                      aria-invalid={Boolean(errors.icon)}
                      modal
                    />
                  )}
                />
                {errors.icon && (
                  <FieldDescription className="text-xs font-semibold text-destructive">
                    {errors.icon.message}
                  </FieldDescription>
                )}
              </Field>
              <Field datatype-invalid={Boolean(errors.iconColor)}>
                <FieldLabel>Icon color</FieldLabel>
                <Controller
                  control={control}
                  name="iconColor"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ToggleGroup
                      className="flex gap-2 flex-wrap"
                      variant="default"
                      type="single"
                      onValueChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      ref={ref}
                      aria-invalid={Boolean(errors.iconColor)}
                    >
                      {Object.keys(IconColor).map((color) => {
                        color as IconColor;
                        return (
                          <ToggleGroupItem
                            key={color}
                            className={cn(
                              value === color ? "opacity-100" : "opacity-40",
                              " hover:opacity-100 transition-opacity p-0 rounded-full",
                            )}
                            value={color}
                            aria-label={`Select ${color}`}
                            title={color}
                          >
                            <Palette
                              className={cn(
                                colors[color].bg,
                                colors[color].stroke,
                                colors[color].border,
                                "border-2, size-7 p-1 rounded-full",
                              )}
                            />
                          </ToggleGroupItem>
                        );
                      })}
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
          <Separator className="my-3" />
          <div className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
