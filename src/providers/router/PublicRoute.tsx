import { useAuthStore } from "@/providers/store/auth.store";
import { type FC, type ReactNode } from "react";
import { Navigate } from "react-router";
interface Props {
  element: ReactNode;
}
export const PublicRoute: FC<Props> = ({ element }) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  return authStatus === "not-authenticated" ? element : <Navigate to="/" />;
};
