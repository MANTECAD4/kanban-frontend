import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import styles from "../styles/Register.module.css";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  return (
    <div
      className={`w-full min-h-dvh sm:min-h-auto sm:my-4 lg:my-0 md:max-w-2xl lg:max-w-4xl bg-white shadow-2xl md:rounded-4xl overflow-hidden ${styles["register-container"]}`}
    >
      <div
        className={` flex items-center justify-center ${styles["register-img"]}`}
      >
        {/* <div
          className="flex flex-col items-center justify-center p-4 h-40 backdrop-blur-xs brightness-90 rounded-2xl text-amber-50"
          style={{ backgroundColor: "rgba(127, 220, 130, 0.15)" }}
        >
          <LoaderCircle className="animate-spin w-11 h-11 mb-4" />
          <p className="text-lg">Checking credentials...</p>
        </div> */}
      </div>
      <div className=" my-5 lg:my-10 ">
        <div className=" p-3.5 sm:px-10">
          <div className="flex flex-col gap-2 mb-6 md:mb-12">
            <h1 className="lg:text-center text-[clamp(1.4rem,4vw,2.25rem)] font-semibold">
              Register
            </h1>
            <p className="lg:text-center text-xs text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
              molestiae omnis quos.
            </p>
          </div>
          <FieldSet className="w-full">
            <FieldGroup className="flex flex-col gap-3.5">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    placeholder="**********"
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
                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
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
                      onClick={() =>
                        setShowPasswordConfirmation((prev) => !prev)
                      }
                    >
                      {showPasswordConfirmation ? (
                        <Eye className="" />
                      ) : (
                        <EyeOff />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription className="text-xs">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
            </FieldGroup>
            <div className="mt-5 flex flex-col lg:gap-2 items-center">
              <Button className="w-10/12" type="submit">
                Create Account
              </Button>
              <Button className="w-10/12" variant={"link"}>
                <ArrowLeft className="" />
                Go back to Login
              </Button>
            </div>
          </FieldSet>
        </div>
      </div>
    </div>
  );
};
