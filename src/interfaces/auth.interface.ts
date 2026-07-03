import type { LoginSchema } from "@/schemas/auth/login.schema";
import type { RegisterSchema } from "@/schemas/auth/register.schema";
import type z from "zod";

export type RegisterState = z.infer<typeof RegisterSchema>;
export type LoginState = z.infer<typeof LoginSchema>;

export enum SessionCodes {
  MISSING_SESSION = "MISSING_SESSION",
  BAD_SESSION = "BAD_SESSION",
  SESSION_REVOKED = "SESSION_REVOKED",
}
