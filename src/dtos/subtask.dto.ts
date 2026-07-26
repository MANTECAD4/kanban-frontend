import z from "zod";

export const SubtaskSchema = z.object({
  id: z.int().min(1),
  description: z.string().nonempty(),
  isCompleted: z.boolean(),
  taskId: z.int().min(1),
});

export const SubmitSubtaskSchema = z.object({
  description: z.string().trim().nonempty(),
});
export const ChangeSubtaskStatusSchema = z.object({
  isCompleted: z.boolean(),
});

export type SubtaskEntity = z.infer<typeof SubtaskSchema>;
export type SubmitSubtaskState = z.infer<typeof SubmitSubtaskSchema>;
export type ChangeSubtaskStatusDto = z.infer<typeof ChangeSubtaskStatusSchema>;

export type CreateSubtaskResponse = {
  ok: boolean;
  message: string;
  subtask: SubtaskEntity;
};
