import { useThemeStore } from "@/providers/store/theme.store";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";
import { persist } from "zustand/middleware";

// Use when
// import * as MyModudle from ...
// const mySpy = vi.spyOn(MyModule,'method-to-spy')
// doesn´t work
vi.mock("zustand/middleware", { spy: true });

describe("Theme store", () => {
  afterEach(() => vi.clearAllMocks());
  test("should return default values", () => {
    const { result } = renderHook(() => useThemeStore());

    expect(result.current.theme).toBeOneOf(["light", "dark"]);
    expectTypeOf(result.current.setTheme).toBeFunction();
  });

  test('should use "persist" middleware', async () => {
    vi.resetModules();

    await import("@/providers/store/theme.store");
    expect(persist).toHaveBeenCalled();
  });

  test(`"setTheme" should change theme value`, () => {
    const { result } = renderHook(() => useThemeStore());

    const newThemeValue = result.current.theme === "light" ? "dark" : "light";

    act(() => {
      result.current.setTheme(newThemeValue);
    });

    expect(result.current.theme).toBe(newThemeValue);
  });
});
