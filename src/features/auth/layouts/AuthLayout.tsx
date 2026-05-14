import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.css";
import { Lock, LockKeyhole, Pin } from "lucide-react";
export const AuthLayout = () => {
  return (
    <div
      className={`${styles["layout"]} min-h-dvh flex items-center justify-around`}
    >
      <div className=" bg-white/60 max-w-md backdrop-blur-sm shadow-2xl lg:py-15 relative">
        <Pin className="text-gray-500 fill-yellow-500 rotate-45 w-10 h-10 absolute top-2 left-[48%]" />
        <Outlet />
      </div>
      <div className="w-[50%] flex justify-center">
        <div className={`relative ${styles["register-img-container"]}`}>
          <img
            src="/images/unlock-illustration.svg"
            alt="auth image"
            className="object-fill max-h-[calc(80dvh)] "
          />

          <div
            className="absolute top-[15%] left-[17%] w-[12.5%] p-[12.5%] rounded-full bg-(--primary)
          "
          >
            <LockKeyhole className="absolute stroke-(--primary-foreground) top-1/2 left-1/2 -translate-1/2 h-1/4 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
