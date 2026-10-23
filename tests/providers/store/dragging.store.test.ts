import { useDraggingStore } from "@/providers/store/dragging.store";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("Dragging Task & Column Store", () => {
  test(`should return default values`, () => {
    const { result } = renderHook(() => useDraggingStore());

    expect(result.current.isDraggingColumn).toBe(false);
    expect(result.current.isDraggingTask).toBe(false);
    expectTypeOf(result.current.clearDraggings).toBeFunction();
    expectTypeOf(result.current.setIsDraggingColumn).toBeFunction();
    expectTypeOf(result.current.setIsDraggingTask).toBeFunction();
  });

  test(`"setIsDraggingColumn" & "setIsDraggingTask" changes both values, respectivly`, () => {
    const { result } = renderHook(() => useDraggingStore());

    act(() => {
      result.current.setIsDraggingColumn(true);
    });
    act(() => {
      result.current.setIsDraggingTask(true);
    });

    expect(result.current.isDraggingColumn).toBe(true);
    expect(result.current.isDraggingTask).toBe(true);
  });

  test(`"clearDraggings" sets both values to false`, () => {
    const { result } = renderHook(() => useDraggingStore());

    act(() => {
      result.current.setIsDraggingColumn(true);
    });
    act(() => {
      result.current.setIsDraggingTask(true);
    });

    act(() => {
      result.current.clearDraggings();
    });

    expect(result.current.isDraggingColumn).toBe(false);
    expect(result.current.isDraggingTask).toBe(false);
  });
});
