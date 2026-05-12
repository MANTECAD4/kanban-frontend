import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import styles from "../styles/Login.module.css";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className=" py-3.5 px-5 sm:px-10">
      <div className="flex flex-col gap-2 mb-6 md:mb-15">
        <h1 className="lg:text-center text-[clamp(1.4rem,4vw,2.25rem)] font-semibold">
          Login
        </h1>
        <p className="lg:text-center text-xs text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
          molestiae omnis quos.
        </p>
      </div>
      <FieldSet className="w-full">
        <FieldGroup className="flex flex-col gap-3.5">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="example@gmail.com" />
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
        </FieldGroup>
        <div className="mt-5 flex flex-col lg:gap-2 items-center">
          <Button className="w-10/12" type="submit">
            Sumbit
          </Button>
          <Link to="/auth/register" className="w-10/12 ">
            <Button className="w-full" variant={"link"}>
              Create an account
              <ArrowRight className="" />
            </Button>
          </Link>
        </div>
      </FieldSet>
    </div>
  );
};
