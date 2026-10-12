import { PublicRoute } from "@/providers/router/PublicRoute";
import { useAuthStore } from "@/providers/store/auth.store";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

const navigateMock = vi.fn((_props: { to: string }) => (
  <div data-testid="navigate-mock" />
));

vi.mock("react-router", () => ({
  Navigate: (props: { to: string }) => navigateMock(props),
}));

vi.mock("@/providers/store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

describe("Public Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockComponent = (
    <div data-testid="mock-component">im a mock component lol</div>
  );

  test("should render target element if user is not authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue("not-authenticated");
    render(<PublicRoute element={mockComponent} />);

    expect(screen.getByTestId("mock-component")).toBeDefined();
  });

  test("should not render target element if user is authenticated & redirects using Navigate", () => {
    vi.mocked(useAuthStore).mockReturnValue("authenticated");
    render(<PublicRoute element={mockComponent} />);

    expect(screen.queryByTestId("mock-component")).toBeNull();
    expect(screen.getByTestId("navigate-mock")).toBeDefined();
    expect(navigateMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: "/" }),
    );
  });
});
