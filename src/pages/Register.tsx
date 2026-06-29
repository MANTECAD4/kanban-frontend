import { Link } from "react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/shared/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/shared/ui/input-group";

import { Button } from "@/components/shared/ui/button";
import { ArrowLeft, Eye, EyeOff, KeyRound, Mail, User } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";
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
        <p className="text-center text-xs text-gray-500 dark:text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet className="">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <FieldGroup className="flex flex-col gap-6">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("name")}
                  id="name"
                  className="placeholder:text-gray-500 "
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={Boolean(errors.name)}
                  required
                />
                <InputGroupAddon>
                  <User className="text-foreground/50" />
                </InputGroupAddon>
              </InputGroup>
              {errors.name && (
                <FieldDescription className="text-xs font-semibold text-destructive">
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...register("email")}
                  className="placeholder:text-gray-500"
                  type="email"
                  placeholder="example@gmail.com"
                  aria-invalid={Boolean(errors.email)}
                />
                <InputGroupAddon>
                  <Mail className="text-foreground/50" />
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
                  placeholder={showPassword ? "password" : "**********"}
                  className="placeholder:text-gray-500 "
                  type={showPassword ? "text" : "password"}
                  aria-invalid={Boolean(errors.password)}
                />
                <InputGroupAddon>
                  <KeyRound className="text-foreground/50" />
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
                      <Eye className="text-foreground/60" />
                    ) : (
                      <EyeOff className="text-foreground/60" />
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
            <Button className="w-10/12" type="submit" size={"lg"}>
              <User />
              Create Account
            </Button>
            <Link to="/auth/login" className="w-10/12">
              <Button className="w-full" size={"lg"} variant={"outline"}>
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
