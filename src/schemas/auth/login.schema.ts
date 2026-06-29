import { RegisterSchema } from "@/schemas/auth/register.schema";

export const LoginSchema = RegisterSchema.omit({ name: true });
