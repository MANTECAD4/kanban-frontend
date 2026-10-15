import { submitRegisterData } from "@/actions/auth/submit-register.action";
import { useRegister } from "@/hooks/auth/useRegister";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";
import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";

const navigateMock = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@/actions/auth/submit-register.action", () => ({
  submitRegisterData: vi.fn(),
}));

const setSessionMock = vi.fn();
vi.mock("@/providers/store/auth.store", () => ({
  useAuthStore: () => setSessionMock,
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
    promise: vi.fn(),
  },
}));

const testQueryClient = new QueryClient();
const testQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useRegister custom hook", () => {
  afterEach(() => vi.clearAllMocks());

  test("should return expected default values", () => {
    const { result } = renderHook(useRegister, { wrapper: testQueryProvider });

    expect(result.current.showPassword).toBe(false);
    expectTypeOf(result.current.setShowPassword).toBeFunction();
    expectTypeOf(result.current.register).toBeFunction();
    expectTypeOf(result.current.handleSubmit).toBeFunction();
    expectTypeOf(result.current.onSubmitForm).toBeFunction();
    expect(result.current.errors).toEqual({});
  });

  test("recieving a success response after calling onSubmitForm should set the session & navigate to root", async () => {
    const mockSuccessfulResponse = {
      ok: true,
      message: "User registered successfully",
      data: {
        user: {
          id: 1,
          email: "nanel@gmail.com",
          name: "nanel mtzz",
        },
      },
      accessToken: "this-should-be-a-token",
    };
    vi.mocked(submitRegisterData).mockResolvedValue(mockSuccessfulResponse);
    const { result } = renderHook(useRegister, { wrapper: testQueryProvider });

    await act(async () => {
      await result.current.onSubmitForm({
        name: mockSuccessfulResponse.data.user.name,
        email: mockSuccessfulResponse.data.user.email,
        password: "abc1234*",
      });
    });
    expect(setSessionMock).toHaveBeenCalledWith({
      accessToken: mockSuccessfulResponse.accessToken,
      ...mockSuccessfulResponse.data.user,
    });

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  //   test("reciving an error from mutationFn should trigger an error toast/notification", async () => {
  //     vi.mocked(submitRegisterData).mockImplementation(() => {
  //       throw "a random error";
  //     });
  //     const { result } = renderHook(useRegister, { wrapper: testQueryProvider });
  //     await act(async () => {
  //       await result.current.onSubmitForm({} as any);
  //     });
  //     expect(toast.error).toHaveBeenCalled();
  //     await expect(submitRegisterData).rejects.toThrow();
  //   });
});
