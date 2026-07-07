import { IconColor } from "@/dtos/project.dto";
import { iconNames } from "lucide-react/dynamic";
import z from "zod";

export const BoardSchema = z.object({
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

  projectId: z.number().int().min(1),
});

export const SubmitBoardSchema = BoardSchema.omit({
  id: true,
  slug: true,
  projectId: true,
});

export type BoardEntity = z.infer<typeof BoardSchema>;
export type SubmitBoardState = z.infer<typeof SubmitBoardSchema>;
