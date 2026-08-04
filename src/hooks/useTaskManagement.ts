import { getCategoriesAction } from "@/actions/category/get-categories.action";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const useTaskManagement = (boardId: number) => {
  const {
    data: categoriesData,
    isFetching,
    isFetched,
  } = useQuery({
    queryFn: () => getCategoriesAction(boardId),
    queryKey: ["in-board", boardId, "categories"],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [boardColumns, setBoardColumns] = useState<Record<string, any>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  useEffect(() => {
    if (categoriesData && isFetched) {
      const columns: Record<string, any> = {};
      categoriesData.categories.forEach(
        (category) => (columns[category.name] = category.tasks),
      );
      setBoardColumns(columns);
      setColumnOrder(() => Object.keys(columns));
    }
  }, [categoriesData, isFetched]);

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
