import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/LoginPage";
import { Register } from "@/pages/Register";
// import { AppLayout } from "@/layouts/AppLayout";
import { PrivateRoute } from "@/providers/router/PrivateRoute";
import { PublicRoute } from "@/providers/router/PublicRoute";
import { BoardPage } from "@/pages/BoardPage";
import { TaskPage } from "@/pages/TaskPage";
import { Dashboard } from "@/pages/Dashboard";
import { lazy } from "react";

const LazyAppLayout = lazy(() => import("@/layouts/AppLayout"));
const LazyNotFound = lazy(() => import("@/pages/NotFound"));

export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicRoute element={<AuthLayout />} />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <LoginPage /> },
      { path: "*", element: <Navigate to="/auth/login" /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute element={<LazyAppLayout />} />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
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
    element: <LazyNotFound />,
  },
]);
