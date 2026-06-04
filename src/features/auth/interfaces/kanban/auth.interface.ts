import type { LoginSchema } from "@/features/auth/schemas/login.schema";
import type { RegisterSchema } from "@/features/auth/schemas/register.schema";
import type z from "zod";

export type RegisterState = z.infer<typeof RegisterSchema>;
export type LoginState = z.infer<typeof LoginSchema>;
