import type { BoardEntity } from "@/dtos/board.dtos";
import { IconColorKeys } from "@/dtos/project.dto";
import { useCurrentBoardStore } from "@/providers/store/current-board.store";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("Current Board Store", () => {
  const mockBoard: BoardEntity = {
    id: 1,
    slug: "test-boad",
    name: "Test Board",
    description: "a random board for testing",
    icon: "shuffle",
    iconColor: IconColorKeys.RED,
    meta: null,
  };
  test("should return initial values", () => {
    const { result } = renderHook(() => useCurrentBoardStore());
    expect(result.current.board).toBeNull();
    expectTypeOf(result.current.clearBoard).toBeFunction();
    expectTypeOf(result.current.setCurrentBoard).toBeFunction();
  });

  test(`"setBoard" should set current board`, () => {
    const { result } = renderHook(() => useCurrentBoardStore());

    act(() => {
      result.current.setCurrentBoard(mockBoard);
    });

    expect(result.current.board).toEqual(mockBoard);
  });

  test(`"clearBoard" sets current board back to null`, () => {
    const { result } = renderHook(() => useCurrentBoardStore());

    act(() => {
      result.current.setCurrentBoard(mockBoard);
    });

    act(() => {
      result.current.clearBoard();
    });

    expect(result.current.board).toBeNull();
  });
});
