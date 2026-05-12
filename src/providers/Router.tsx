import { AuthLayout } from "@/features/auth/layouts/AuthLayout";
import { Login } from "@/features/auth/pages/Login";
import { Register } from "@/features/auth/pages/Register";
import { NotFound } from "@/pages/NotFound";
import { createBrowserRouter, Navigate } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
