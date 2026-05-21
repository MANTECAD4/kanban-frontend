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
import { ArrowRight, Eye, EyeOff } from "lucide-react";

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
      <div className="flex flex-col gap-2 mb-7 md:mb-15">
        <h1 className="text-center text-[clamp(1.8rem,4vw,2.25rem)] font-semibold">
          Login
        </h1>
        <p className="text-center text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FieldGroup className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email", {
                  required: { value: true, message: "An email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                })}
                // id="email"
                autoComplete="email"
                type="email"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <FieldDescription className="text-xs font-semibold text-red-800">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Should be at least 8 characters",
                    },
                  })}
                  placeholder="**********"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label={"Show password toggle"}
                    title={!showPassword ? "Show password" : "Hide password"}
                    size="icon-xs"
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Eye className="" />
                    ) : (
                      <EyeOff className="" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <FieldDescription className="text-xs font-semibold text-red-800">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <div className="mt-5 flex flex-col lg:gap-2 items-center">
            <Button size="lg" className="w-10/12" type="submit">
              Sumbit
            </Button>
            <Link to="/auth/register" className="w-10/12 ">
              <Button size="lg" className="w-full" variant={"link"}>
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
