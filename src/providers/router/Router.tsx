import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { AppLayout } from "@/layouts/AppLayout";
import { NotFound } from "@/pages/NotFound";
import { PrivateRoute } from "@/providers/router/PrivateRoute";
import { PublicRoute } from "@/providers/router/PublicRoute";
import { BoardPage } from "@/pages/BoardPage";
import { TaskPage } from "@/pages/TaskPage";
import { Dashboard } from "@/pages/Dashboard";

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
      {
        index: true,
        element: <Dashboard />,
      },
      // {
      //   path: "projects/:projectSlug",
      //   element: <ProjectPage />,
      // },
      {
        path: "boards/:boardSlug",
        element: <BoardPage />,
      },
      {
        path: "boards/:boardSlug/tasks/:taskSlug",
        element: <TaskPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
