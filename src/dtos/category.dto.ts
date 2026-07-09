import { iconNames } from "lucide-react/dynamic";
import z from "zod";

export const CategorySchema = z.object({
  id: z.int().min(1),
  name: z.string().min(3),
  icon: z.enum(iconNames, "Select a valid icon"),
});

export const SubmitCategorySchema = CategorySchema.omit({ id: true });

export type SubmitCategoryState = z.infer<typeof SubmitCategorySchema>;
export type CategoryEntity = z.infer<typeof CategorySchema>;
