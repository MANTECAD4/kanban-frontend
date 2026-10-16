import { useAuthStore } from "@/providers/store/auth.store";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("Auth Store", () => {
  test("should return expected default values & methods", () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.authStatus).toBe("checking-status");
    expect(result.current.accessToken).toBeNull();
    expect(result.current.id).toBeNull();
    expect(result.current.name).toBeNull();
    expect(result.current.email).toBeNull();
    expectTypeOf(result.current.setAccessToken).toBeFunction();
    expectTypeOf(result.current.setAuthStatus).toBeFunction();
    expectTypeOf(result.current.setSession).toBeFunction();
    expectTypeOf(result.current.clearSession).toBeFunction();
  });

  test(`'setAuthStatus' should change authentication status`, () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAuthStatus("authenticated");
    });

    expect(result.current.authStatus).toBe("authenticated");
  });

  test(`'setAccessToken' should change session's access token`, () => {
    const mockAccessToken = "this-represents-an-access-token";
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAccessToken(mockAccessToken);
    });

    expect(result.current.accessToken).toBe(mockAccessToken);
  });

  test(`'setSession' should change authentication status to 'authenticated' & establish user info`, () => {
    const mockAccessToken = "mock-access-token";
    const mockId = 1;
    const mockName = "nanel mtz";
    const mockEmail = "nanel@gmail.com";
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setSession({
        accessToken: mockAccessToken,
        id: mockId,
        name: mockName,
        email: mockEmail,
      });
    });

    expect(result.current.accessToken).toBe(mockAccessToken);
    expect(result.current.id).toBe(mockId);
    expect(result.current.name).toBe(mockName);
    expect(result.current.email).toBe(mockEmail);
    expect(result.current.authStatus).toBe("authenticated");
  });

  test(`'clearSession' clears user info & sets auth status to not-authenticated`, () => {
    const mockAccessToken = "mock-access-token";
    const mockId = 1;
    const mockName = "nanel mtz";
    const mockEmail = "nanel@gmail.com";
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setSession({
        accessToken: mockAccessToken,
        id: mockId,
        name: mockName,
        email: mockEmail,
      });
    });

    act(() => {
      result.current.clearSession();
    });

    expect(result.current.authStatus).toBe("not-authenticated");
    expect(result.current.accessToken).toBeNull();
    expect(result.current.id).toBeNull();
    expect(result.current.name).toBeNull();
    expect(result.current.email).toBeNull();
  });
});
