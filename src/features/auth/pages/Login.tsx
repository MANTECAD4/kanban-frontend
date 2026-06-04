import { Link } from "react-router";
import { useLogin } from "@/features/auth/hooks/useLogin";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  SquareAsterisk,
} from "lucide-react";

export const Login = () => {
  const {
    setShowPassword,
    showPassword,
    errors,
    handleSubmit,
    onSubmitForm,
    register,
  } = useLogin();

  return (
    <>
      <div className="flex flex-col gap-2 mb-7 md:mb-13">
        <h1 className="text-center text-[clamp(1.8rem,4vw,2.25rem)] font-semibold">
          Login
        </h1>
        <p className="text-center text-xs text-gray-700 dark:text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FieldGroup className="flex flex-col gap-6">
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("email")}
                  className="placeholder:text-gray-700 dark:placeholder:text-gray-200"
                  // id="email"
                  autoComplete="email"
                  type="email"
                  placeholder="example@gmail.com"
                  aria-invalid={Boolean(errors.email)}
                />
                <InputGroupAddon>
                  <Mail className="text-foreground/60" />
                </InputGroupAddon>
              </InputGroup>
              {errors.email && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("password")}
                  className="placeholder:text-gray-700 dark:placeholder:text-gray-200"
                  placeholder="**********"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  type={showPassword ? "text" : "password"}
                />
                <InputGroupAddon>
                  <KeyRound className="text-foreground/60" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label={"Show password toggle"}
                    title={!showPassword ? "Show password" : "Hide password"}
                    size="icon-xs"
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="text-foreground" />
                    ) : (
                      <EyeOff className="text-foreground" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <div className="mt-10 flex flex-col gap-3 items-center">
            <Button size="lg" className="w-10/12" type="submit">
              Sumbit
            </Button>
            <Link to="/auth/register" className="w-10/12 ">
              <Button size="lg" className="w-full" variant={"outline"}>
                Create an account
                <ArrowRight className="" />
              </Button>
            </Link>
          </div>
        </form>
      </FieldSet>
    </>
  );
};
