import { useBoardModeStore } from "@/providers/store/board-mode.store";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, test, vi } from "vitest";
import { persist } from "zustand/middleware";
vi.mock("zustand/middleware", { spy: true });

describe("Board Mode Store", () => {
  test("should return correct default values & methods", () => {
    const { result } = renderHook(() => useBoardModeStore());

    expect(result.current.boardMode).toBeOneOf(["kanban", "list"]);
    expectTypeOf(result.current.setBoardMode).toBeFunction();
  });

  test('should use "persist" zustand middleware', async () => {
    vi.resetModules();
    await import("@/providers/store/board-mode.store");
    const { result } = renderHook(() => useBoardModeStore());
    act(() => {
      result.current.setBoardMode("list");
    });
    expect(persist).toHaveBeenCalled();
  });

  test(`'setBoardMode' should change selected board mode`, () => {
    const { result } = renderHook(() => useBoardModeStore());

    act(() => {
      result.current.setBoardMode("list");
    });

    expect(result.current.boardMode).toBe("list");
  });
});
