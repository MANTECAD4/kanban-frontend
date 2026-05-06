import { AuthLayout } from "@/features/auth/layouts/AuthLayout";
import { Register } from "@/features/auth/pages/Register";
import { createBrowserRouter, Navigate } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <div>regiter</div> },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
]);
