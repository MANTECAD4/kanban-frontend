import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";
export const AuthLayout = () => {
  return (
    <div className={`${styles["layout"]} flex items-center justify-center p-7`}>
      <Outlet />
    </div>
  );
};
