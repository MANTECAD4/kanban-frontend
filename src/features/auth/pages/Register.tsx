import { Link } from "react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRegister } from "@/features/auth/hooks/useRegister";
// import styles from "../styles/Register.module.css";

export const Register = () => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmitForm,
    setShowPassword,
    showPassword,
  } = useRegister();
  return (
    <>
      <div className="flex flex-col gap-2 mb-7 md:mb-15">
        <h1 className="text-center text-[clamp(1.8rem,4vw,2.25rem)] font-semibold">
          Register
        </h1>
        <p className="text-center text-xs text-gray-700 dark:text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet className="">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FieldGroup className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...register("name", {
                  required: { value: true, message: "A name is required" },
                  minLength: {
                    value: 3,
                    message: "Should be at least 3 characters long",
                  },
                })}
                id="name"
                className="placeholder:text-gray-700 dark:placeholder:text-gray-200"
                type="text"
                placeholder="John Doe"
                required
              />
              {errors.name && (
                <FieldDescription className="text-xs font-semibold text-red-800">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email",
                  },
                })}
                className="placeholder:text-gray-700 dark:placeholder:text-gray-200"
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
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Needs at least 8 characters",
                    },
                  })}
                  placeholder="**********"
                  className="placeholder:text-gray-700 dark:placeholder:text-gray-200"
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
            <Button className="w-10/12" type="submit" size={"lg"}>
              Create Account
            </Button>
            <Link to="/auth/login" className="w-10/12">
              <Button className="w-full" size={"lg"} variant={"link"}>
                <ArrowLeft className="" />
                Go back to Login
              </Button>
            </Link>
          </div>
        </form>
      </FieldSet>
    </>
  );
};
{
  /* <Alert className="max-w-md bg-red-200" variant={"destructive"}>
  <CheckCircle2Icon />
  <AlertTitle>Account updated successfully</AlertTitle>
  <AlertDescription>
    Your profile information has been saved. Changes will be reflected
    immediately.
  </AlertDescription>
</Alert> */
}

{
  /* <Field>
            <FieldLabel htmlFor="password-confirmation">
              Confirm password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password-confirmation"
                placeholder="**********"
                type={showPasswordConfirmation ? "text" : "password"}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Show password confirmation toggle"
                  title={showPasswordConfirmation ? "hide" : "show"}
                  size="icon-xs"
                  className="cursor-pointer"
                  onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                >
                  {showPasswordConfirmation ? <Eye className="" /> : <EyeOff />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription className="text-xs font-semibold text-red-800">
              Must be at least 8 characters long.
            </FieldDescription>
          </Field> */
}
