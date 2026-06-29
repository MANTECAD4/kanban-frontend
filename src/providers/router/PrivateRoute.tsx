import { useAuthStore } from "@/providers/store/auth.store";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  element: ReactNode;
}
export const PrivateRoute: FC<Props> = ({ element }) => {
  const authStatus = useAuthStore((state) => state.authStatus);

  return authStatus === "authenticated" ? (
    element
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
