import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.css";

import { useThemeStore } from "@/providers/store/theme.store";
import { cn } from "@/lib/utils";
import { ToggleThemeButton } from "@/components/custom/ToggleThemeButton";

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
      <div className="w-[40%] xl:w-[50%] hidden lg:block ">
        <div className="rounded-lg bg-background/40 w-full">
          <h2 className="text-[clamp(1.4rem,4vw,1.8rem)] font-normal">Hola</h2>
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
    </div>
  );
};
