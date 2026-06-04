import { RegisterSchema } from "@/features/auth/schemas/register.schema";

export const LoginSchema = RegisterSchema.omit({ name: true });
