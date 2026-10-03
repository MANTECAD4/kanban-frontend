import { useAuthStore } from "@/providers/store/auth.store";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  element: ReactNode;
}
export const PrivateRoute: FC<Props> = ({ element }) => {
  const authStatus = useAuthStore((state) => state.authStatus);

  if (authStatus === "not-authenticated" || authStatus === "checking-status") {
    return <Navigate to="/auth/login" replace />;
  }
  return element;
};
