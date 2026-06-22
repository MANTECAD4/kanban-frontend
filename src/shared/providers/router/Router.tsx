import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/features/auth/layouts/AuthLayout";
import { Login } from "@/features/auth/pages/Login";
import { Register } from "@/features/auth/pages/Register";
import { AppLayout } from "@/shared/layouts/AppLayout";
import { NotFound } from "@/shared/pages/NotFound";
import { PrivateRoute } from "@/shared/providers/router/PrivateRoute";
import { PublicRoute } from "@/shared/providers/router/PublicRoute";
import { ProjectPage } from "@/features/projects/pages/ProjectPage";

export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoute element={<AuthLayout />} />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute element={<AppLayout />} />,
    children: [{ index: true, element: <ProjectPage /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
