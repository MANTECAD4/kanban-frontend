import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/features/auth/layouts/AuthLayout";
import { Login } from "@/features/auth/pages/Login";
import { Register } from "@/features/auth/pages/Register";
import { KanbanLayout } from "@/features/kanban/layouts/KanbanLayout";
import { Dashboard } from "@/features/kanban/pages/Dashboard";
import { NotFound } from "@/pages/NotFound";
import { PrivateRoute } from "@/providers/router/PrivateRoute";
import { PublicRoute } from "@/providers/router/PublicRoute";

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
    element: <PrivateRoute element={<KanbanLayout />} />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
