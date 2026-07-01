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

export const CreateProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().nonempty(),
  icon: z.enum(iconNames, { error: "Select a valid icon" }),
  iconColor: z.enum(IconColor, { error: "Pick a valid color" }),
});

export type CreateProjectState = z.infer<typeof CreateProjectSchema>;
