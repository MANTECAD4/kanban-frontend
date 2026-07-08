import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFound } from "@/pages/NotFound";
import { PrivateRoute } from "@/providers/router/PrivateRoute";
import { PublicRoute } from "@/providers/router/PublicRoute";
import { BoardPage } from "@/pages/BoardPage";
import { ProjectPage } from "@/pages/ProjectPage";

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
    children: [
      { index: true, element: <div>dashboard</div> },
      {
        path: "projects/:projectSlug",
        element: <ProjectPage />,
      },
      {
        path: "projects/:projectSlug/boards/:boardSlug",
        element: <BoardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
