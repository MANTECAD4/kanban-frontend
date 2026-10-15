import { submitLogin } from "@/actions/auth/submit-login.action";
import { useLogin } from "@/hooks/auth/useLogin";
import type { SessionResponse } from "@/interfaces/session-response.interface";
// import { useAuthStore } from "@/providers/store/auth.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";
import { beforeEach, describe, expect, expectTypeOf, test, vi } from "vitest";

const navigateMock = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/actions/auth/submit-login.action", () => ({
  submitLogin: vi.fn(),
}));

const setSessionMock = vi.fn();
vi.mock("@/providers/store/auth.store", () => ({
  useAuthStore: () => setSessionMock,
}));

const testQueryClientProvider = ({ children }: PropsWithChildren) => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    promise: vi.fn(),
  },
}));

describe("useLogin Custom Hook", () => {
  beforeEach(() => vi.clearAllMocks());
  test("should return expected default values", () => {
    const { result } = renderHook(useLogin, {
      wrapper: testQueryClientProvider,
    });

    expect(result.current.showPassword).toBe(false);
    expect(result.current.errors).toEqual({});
    expectTypeOf(result.current.setShowPassword).toBeFunction();
    expectTypeOf(result.current.onSubmitForm).toBeFunction();
    expectTypeOf(result.current.register).toBeFunction();
  });

  test('onSubmitForm Method should set session, navigate to "/" & show a toast when request is succcessful', async () => {
    vi.mocked(toast.promise).mockRestore();
    const mockSubmitData = { email: "nanel@gmail.com", password: "12345" };
    const submitLoginResponseMock: SessionResponse = {
      ok: false,
      message: "Login successfull",
      data: {
        user: {
          id: 1,
          email: "nanel@gmail.com",
          name: "nanel mtzz",
        },
      },
      accessToken: "this-is-an-access-token",
    };

    vi.mocked(submitLogin).mockResolvedValue(submitLoginResponseMock);

    const { result } = renderHook(useLogin, {
      wrapper: testQueryClientProvider,
    });

    await act(async () => {
      await result.current.onSubmitForm(mockSubmitData);
    });

    expect(submitLogin).toHaveBeenCalled();
    expect(setSessionMock).toHaveBeenCalledWith({
      accessToken: submitLoginResponseMock.accessToken,
      email: submitLoginResponseMock.data.user.email,
      id: submitLoginResponseMock.data.user.id,
      name: submitLoginResponseMock.data.user.name,
    });

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  test("onSUbmitForm should show a toast when an error occurs", async () => {
    vi.mocked(toast.promise).mockRestore();
    vi.mocked(submitLogin).mockImplementation(async () => {
      throw "lol";
    });

    const { result } = renderHook(useLogin, {
      wrapper: testQueryClientProvider,
    });

    try {
      await act(async () => {
        result.current.onSubmitForm({ email: "", password: "" });
      });
    } catch (error) {
      expect(vi.mocked(toast.error)).toHaveBeenCalledWith(expect.any(String), {
        description: expect.any(String),
      });
    }
  });
});
