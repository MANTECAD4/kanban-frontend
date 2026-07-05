import { iconNames } from "lucide-react/dynamic";
import z from "zod";

export enum IconColor {
  RED = "RED",
  ORANGE = "ORANGE",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
  SKY = "SKY",
  CYAN = "CYAN",
  INDIGO = "INDIGO",
  PURPLE = "PURPLE",
  PINK = "PINK",
  GRAY = "GRAY",
}

export const ProjectSchema = z.object({
  id: z.number().int().min(1),
  slug: z.string().nonempty(),
  name: z
    .string()
    .trim()
    .min(3)
    .transform((value) => value.replace(/\s+/g, " ")),
  description: z
    .string()
    .trim()
    .nonempty()
    .transform((value) => value.replace(/\s+/g, " ")),
  icon: z.enum(iconNames, { error: "Select a valid icon" }),
  iconColor: z.enum(IconColor, { error: "Pick a valid color" }),
});

export type Project = z.infer<typeof ProjectSchema>;

export const SubmitProjectSchema = ProjectSchema.omit({ id: true, slug: true });
export type SubmitProjectState = z.infer<typeof SubmitProjectSchema>;
