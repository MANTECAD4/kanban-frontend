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

import { ArrowLeft, CheckCircle2Icon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
// import styles from "../styles/Register.module.css";

export const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="px-5 sm:px-10">
      <div className="flex flex-col gap-2 lg:mb-10">
        <h1 className="lg:text-center text-[clamp(1.4rem,4vw,2.25rem)] font-semibold">
          Register
        </h1>
        <p className="lg:text-center text-xs text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet className="">
        <FieldGroup className="flex flex-col gap-5">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              className="placeholder:text-gray-700"
              id="name"
              type="text"
              placeholder="John Doe"
              required
            />
            {/* <FieldDescription className="text-xs font-semibold text-red-800">
              Must be at least 8 characters long.
            </FieldDescription> */}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              className="placeholder:text-gray-700"
              id="email"
              type="email"
              placeholder="example@gmail.com"
            />
            {/* <FieldDescription className="text-xs font-semibold text-red-800">
              Must be at least 8 characters long.
            </FieldDescription> */}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password"
                placeholder="**********"
                className="placeholder:text-gray-700"
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
            {/* <FieldDescription className="text-xs font-semibold text-red-800">
              Must be at least 8 characters long.
            </FieldDescription> */}
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
      </FieldSet>
    </div>
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
