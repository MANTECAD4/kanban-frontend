import { getCategoriesAction } from "@/actions/category/get-categories.action";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const useBoardContentManagement = (boardId: number = 0) => {
  const {
    data: categoriesData,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: () => getCategoriesAction(boardId),
    queryKey: ["in-board", boardId, "categories"],
    enabled: boardId !== 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [boardColumns, setBoardColumns] = useState<Record<string, any>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  useEffect(() => {
    if (categoriesData && !isFetching) {
      const columns: Record<string, any> = {};
      categoriesData.categories.forEach(
        (category) => (columns[category.name] = category.tasks),
      );
      setBoardColumns(columns);
      setColumnOrder(() => Object.keys(columns));
    }
  }, [categoriesData, isFetching]);

  return {
    isFetching,
    boardColumns,
    categoriesData,
    setBoardColumns,
    setColumnOrder,
    columnOrder,
    containerRef,
  };
};
