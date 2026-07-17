import { Button } from "@/components/shared/ui/button";

import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/shared/ui/field";
import { IconPicker } from "@/components/shared/ui/icon-picker";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/shared/ui/popover";
import { Separator } from "@/components/shared/ui/separator";
import type { CategoryEntity } from "@/dtos/category.dto";
import { useEditCategory } from "@/hooks/category/useEditCategory";
import { cn } from "@/lib/utils";
import { Save, XCircle } from "lucide-react";
import React, { type FC, type ReactNode } from "react";
import { Controller } from "react-hook-form";

interface Props {
  children: ReactNode;
  className?: string;
  category: CategoryEntity;
}

type AddCategortDialogProps = Props & React.ComponentProps<typeof Popover>;

export const EditCategoryPopover: FC<AddCategortDialogProps> = ({
  children,
  className,
  category,
  ...props
}) => {
  const { register, errors, reset, control, submitForm } =
    useEditCategory(category);
  return (
    <Popover {...props} onOpenChange={() => reset()}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className={cn(className, "sm:max-w-sm")}
        side="left"
        align="center"
      >
        <form className="flex flex-col gap-4" onSubmit={submitForm}>
          <PopoverHeader>
            <PopoverTitle className="text-sm">Add category</PopoverTitle>
            <PopoverDescription className="text-foreground text-xs">
              Add a new category for the tasks in this board.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup>
            <Field data-invalid={Boolean(errors.name)}>
              <div
                className="grid grid-cols-2"
                style={{ gridTemplateColumns: "1fr 4fr" }}
              >
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name")}
                  placeholder="Under inspection"
                  aria-invalid={Boolean(errors.name)}
                />
              </div>
              {errors.name && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={Boolean(errors.icon)}>
              <div
                className="grid grid-cols-2"
                style={{ gridTemplateColumns: "1fr 4fr" }}
              >
                <Label htmlFor="description">Icon</Label>
                <Controller
                  control={control}
                  name="icon"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <IconPicker
                      onValueChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      ref={ref}
                      aria-invalid={Boolean(errors.icon)}
                    />
                  )}
                />
              </div>
              {errors.icon && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.icon.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <Separator />
          <div className="flex gap-2 justify-end">
            <PopoverClose asChild>
              <Button variant="outline">
                <XCircle />
                Cancel
              </Button>
            </PopoverClose>
            <Button type="submit">
              <Save />
              Save changes
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
