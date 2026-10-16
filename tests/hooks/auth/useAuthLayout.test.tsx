import { loadSession } from "@/actions/auth/load-session.action";
import { useAuthLayout } from "@/hooks/auth/useAuthLayout";
import { useAuthStore } from "@/providers/store/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, test, vi } from "vitest";

vi.mock("@/providers/store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

vi.mock("@/actions/auth/load-session.action", () => ({
  loadSession: vi.fn(),
}));

const client = new QueryClient();
const TestQueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe("useAuthLayout", () => {
  test(`should not try to get session data if status is 'not-authenticated'`, async () => {
    const setSessionMock = vi.fn();
    const setAuthStatusMock = vi.fn();
    vi.mocked(useAuthStore).mockImplementationOnce(() => setSessionMock);
    vi.mocked(useAuthStore).mockImplementationOnce(() => setAuthStatusMock);
    vi.mocked(useAuthStore).mockImplementationOnce(() => "not-authenticated");
    renderHook(useAuthLayout, { wrapper: TestQueryProvider });
    await waitFor(() => expect(loadSession).not.toHaveBeenCalled());
  });

  test(`should call load session if auth status is 'checking-credentials'. Sets session if it's successful`, async () => {
    const mockSuccessfulResponse = {
      ok: false,
      message: "",
      data: {
        user: {
          id: 0,
          email: "",
          name: "",
        },
      },
      accessToken: "",
    };
    vi.mocked(loadSession).mockResolvedValue(mockSuccessfulResponse);
    const setSessionMock = vi.fn();
    const setAuthStatusMock = vi.fn();
    vi.mocked(useAuthStore).mockImplementationOnce(() => setSessionMock);
    vi.mocked(useAuthStore).mockImplementationOnce(() => setAuthStatusMock);
    vi.mocked(useAuthStore).mockImplementationOnce(() => "checking-status");

    renderHook(useAuthLayout, { wrapper: TestQueryProvider });

    await waitFor(() => {
      expect(loadSession).toHaveBeenCalled();
      expect(setSessionMock).toHaveBeenCalledWith({
        accessToken: mockSuccessfulResponse.accessToken,
        ...mockSuccessfulResponse.data.user,
      });
    });
  });

  test('should set auth status to "not-authenticated" if session loading is not successful', async () => {
    vi.mocked(loadSession).mockImplementation(() => {
      throw "";
    });

    const setAuthStatusMock = vi.fn();
    vi.mocked(useAuthStore).mockImplementationOnce(() => vi.fn());
    vi.mocked(useAuthStore).mockImplementationOnce(() => setAuthStatusMock);
    vi.mocked(useAuthStore).mockImplementationOnce(() => "checking-status");

    renderHook(useAuthLayout, { wrapper: TestQueryProvider });

    await waitFor(() =>
      expect(setAuthStatusMock).toHaveBeenCalledWith("not-authenticated"),
    );
  });
});
