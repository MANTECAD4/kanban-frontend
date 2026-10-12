import { appRouter } from "@/providers/router/Router";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { createBrowserRouter, Navigate } from "react-router";
// import { AuthLayout } from "@/layouts/AuthLayout";
// import { LoginPage } from "@/pages/LoginPage";
// import { Register } from "@/pages/Register";
// import { PrivateRoute } from "@/providers/router/PrivateRoute";
// import { PublicRoute } from "@/providers/router/PublicRoute";
// import { BoardPage } from "@/pages/BoardPage";
// import { TaskPage } from "@/pages/TaskPage";
// import { Dashboard } from "@/pages/Dashboard";

const mockAuthLayout = vi.fn((_props: any) => (
  <div data-testid={"mock-auth-layout"} />
));
const mockLoginPage = vi.fn((_props: any) => (
  <div data-testid={"mock-login-page"} />
));
const mockRegister = vi.fn((_props: any) => (
  <div data-testid={"mock-register-page"} />
));
const mockPrivateRoute = vi.fn((_props: any) => (
  <div data-testid={"mock-private-route"} />
));
const mockPublicRoute = vi.fn((_props: any) => (
  <div data-testid={"mock-public-route"} />
));
const mockBoardPage = vi.fn((_props: any) => (
  <div data-testid={"mock-board-page"} />
));
const mockTaskPage = vi.fn((_props: any) => (
  <div data-testid={"mock-task-page"} />
));
const mockDashboard = vi.fn((_props: any) => (
  <div data-testid="mock-dashboard-page" />
));
const mockNotFound = vi.fn((_props: any) => (
  <div data-testid="mock-notfound-page" />
));

vi.mock("@/layouts/AuthLayout", () => ({
  AuthLayout: (props: any) => mockAuthLayout(props),
  default: (props: any) => mockAuthLayout(props),
}));
vi.mock("@/pages/LoginPage", () => ({
  LoginPage: (props: any) => mockLoginPage(props),
  default: (props: any) => mockLoginPage(props),
}));
vi.mock("@/pages/Register", () => ({
  Register: (props: any) => mockRegister(props),
  default: (props: any) => mockRegister(props),
}));
vi.mock("@/providers/router/PrivateRoute", () => ({
  PrivateRoute: (props: any) => mockPrivateRoute(props),
  default: (props: any) => mockPrivateRoute(props),
}));
vi.mock("@/providers/router/PublicRoute", () => ({
  PublicRoute: (props: any) => mockPublicRoute(props),
  default: (props: any) => mockPublicRoute(props),
}));
vi.mock("@/pages/BoardPage", () => ({
  BoardPage: (props: any) => mockBoardPage(props),
  default: (props: any) => mockBoardPage(props),
}));
vi.mock("@/pages/TaskPage", () => ({
  TaskPage: (props: any) => mockTaskPage(props),
  default: (props: any) => mockTaskPage(props),
}));
vi.mock("@/pages/Dashboard", () => ({
  Dashboard: (props: any) => mockDashboard(props),
  default: (props: any) => mockDashboard(props),
}));
vi.mock("@/pages/NotFound", () => ({
  NotFound: (props: any) => mockNotFound(props),
  default: (props: any) => mockNotFound(props),
}));

describe("App Router", () => {
  beforeEach(() => vi.clearAllMocks());

  test("should render Not Found Page when user navigates to an unknown route", async () => {
    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ["/not-mapped-route"],
    });
    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.getByTestId("mock-notfound-page")).toBeDefined(),
    );
  });
});
