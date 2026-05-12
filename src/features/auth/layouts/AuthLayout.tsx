import { Outlet } from "react-router";
import styles from "../styles/AuthLayout.module.css";
export const AuthLayout = () => {
  return (
    <div className={`${styles["layout"]} flex items-center justify-center`}>
      <div
        className={`w-full min-h-dvh sm:min-h-auto  md:max-w-2xl lg:max-w-5xl bg-white shadow-2xl md:rounded-4xl overflow-hidden ${styles["register-container"]}`}
      >
        <div className=" my-5 lg:my-10 ">
          <Outlet />
        </div>
        <div
          className={`flex items-center justify-center ${styles["register-img"]}`}
        />
      </div>
    </div>
  );
};
