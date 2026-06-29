import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8)
    .regex(/\d/, { error: "Must contain at least one number" })
    .regex(/[a-zA-Z]/, {
      error: "Must contain at least one letter",
    })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Must contain at least one special character",
    }),
});
