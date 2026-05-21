import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.css";
import { LockKeyhole, Pin } from "lucide-react";

import { useLocation } from "react-router";
export const AuthLayout = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div
      className={`${styles["layout"]} min-h-dvh flex items-center justify-around`}
    >
      <div className=" bg-white/60 max-w-md backdrop-blur-sm shadow-2xl py-15 relative px-6 lg:px-10 mx-5">
        <Pin className="text-gray-500 fill-(--primary) rotate-45 w-9 h-9 absolute top-2 left-[50%] -translate-x-1/2" />
        <Outlet />
      </div>
      <div className="w-[40%] xl:w-[50%] hidden lg:flex justify-center">
        <div className={`relative ${styles["register-img-container"]}`}>
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
            <>
              <img
                src="/illustrations/register.svg"
                alt="auth image"
                className="object-fill max-h-[calc(80dvh)] "
              />
              {/* <div
                className="absolute top-[30.25%] left-[23.5%] w-[4%] p-[4%] rounded-full bg-(--primary)
          "
              >
                <LockKeyhole className="absolute stroke-white top-1/2 left-1/2 -translate-1/2 h-1/2 w-1/2" />
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
