import { getBoardBySlugAction } from "@/actions/boards/get-board-by-slug.action";
import { useCurrentBoardStore } from "@/providers/store/current-board.store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

export const useBoard = () => {
  const { boardSlug = "" } = useParams();

  const setCurrentBoard = useCurrentBoardStore((s) => s.setCurrentBoard);

  const getBoardQuery = useQuery({
    queryFn: () => getBoardBySlugAction(boardSlug),
    queryKey: ["boards", boardSlug],
    enabled: boardSlug !== "",
  });

  useEffect(() => {
    if (getBoardQuery.data?.board) {
      setCurrentBoard(getBoardQuery.data.board);
    }
  }, [getBoardQuery.data]);

  return {
    getBoardQuery,
  };
};
