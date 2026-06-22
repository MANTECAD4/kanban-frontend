import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/shared/providers/store/auth.store";

interface Props {
  element: ReactNode;
}

export const PublicRoute: FC<Props> = ({ element }) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  return authStatus === "not-authenticated" ? element : <Navigate to="/" />;
};
