import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.css";

import { useThemeStore } from "@/providers/store/theme.store";
import { cn } from "@/lib/utils";
import { ToggleThemeButton } from "@/components/custom/ToggleThemeButton";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/custom/FeatureCard";
import { FingerprintPattern, Grip, ListTodo } from "lucide-react";

export const AuthLayout = () => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div
      className={cn(
        styles["layout"],
        theme === "dark" ? styles["dark-mode"] : styles["light-mode"],
        " min-h-dvh flex items-center justify-around",
      )}
    >
      <ToggleThemeButton />
      <div className=" rounded-lg bg-background/60 max-w-md backdrop-blur-sm shadow-2xl py-13 relative px-6 lg:px-10 mx-5">
        <Outlet />
      </div>
      <div className="w-[55%] hidden lg:block  rounded-lg  px-5 py-10">
        <div className="mb-12 ">
          <h2 className="text-[clamp(1.4rem,4vw,1.8rem)] font-normal mb-5">
            Streamline your workflow with Kanban
          </h2>
          <p className="text-xs w-4/6">
            Plan, organize, and track your tasks effortlessly. Visualize
            progress, prioritize work, and keep projects moving forward with a
            simple and powerful Kanban board.
          </p>
          <Button className="mt-8 ml-4">Try Kanban for free!</Button>
        </div>
        <div className="flex justify-between ">
          <FeatureCard
            title="Secure Authentication"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus reiciendis architecto eligendi in."
            icon={<FingerprintPattern className="m-2 text-foreground" />}
          />
          <FeatureCard
            title="Drag & drop"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus reiciendis architecto eligendi in."
            className="-translate-y-10"
            icon={<Grip className="m-2 text-foreground" />}
          />
          <FeatureCard
            title="Task Management"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus reiciendis architecto eligendi in."
            className="-translate-y-20"
            icon={<ListTodo className="m-2 text-foreground" />}
          />
        </div>
      </div>
      {/* <div className={`relative ${styles["register-img-container"]}`}>
          {location.pathname.match(/login/i) ? (
            <>
              <img
                src="/illustrations/login.svg"
                alt="auth image"
                className="object-fill max-h-[calc(80dvh)] "
              />

              <div
                className="absolute top-[15%] left-[17%] w-[12.5%] p-[12.5%] rounded-full bg-(--primary)
          "
              >
                <LockKeyhole className="absolute stroke-white top-1/2 left-1/2 -translate-1/2 h-1/4 w-1/4" />
              </div>
            </>
          ) : (
            <img
              src="/illustrations/register.svg"
              alt="auth image"
              className="object-fill max-h-[calc(80dvh)] "
            />
          )}
        </div> */}
    </div>
  );
};
