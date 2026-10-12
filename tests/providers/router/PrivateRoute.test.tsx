import { PrivateRoute } from "@/providers/router/PrivateRoute";
import { useAuthStore } from "@/providers/store/auth.store";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

const mockComponentTestId = "mock-target-component";
const mockTargetComponent = <div data-testid={mockComponentTestId} />;

const mockNavigateTestId = "mock-navigate-component";
const navigateComponentMock = vi.fn((_props: { to: string }) => (
  <div data-testid={mockNavigateTestId} />
));

vi.mock("@/providers/store/auth.store", () => ({ useAuthStore: vi.fn() }));
vi.mock("react-router", () => ({
  Navigate: (props: { to: string }) => navigateComponentMock(props),
}));

describe("Private Route component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should render target element if user is authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue("authenticated");
    render(<PrivateRoute element={mockTargetComponent} />);
    expect(screen.getByTestId(mockComponentTestId)).toBeDefined();
  });

  test("should not render target element when user is not authenticated & redirects user to Login page", () => {
    vi.mocked(useAuthStore).mockReturnValue("not-authenticated");
    render(<PrivateRoute element={mockTargetComponent} />);

    expect(screen.queryByTestId(mockComponentTestId)).toBeNull();
    expect(screen.getByTestId(mockNavigateTestId)).toBeDefined();

    expect(navigateComponentMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: "/auth/login", replace: true }),
    );
  });
});
