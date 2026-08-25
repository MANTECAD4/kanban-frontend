import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { useGetTasksMetaByCompletionQuery } from "@/hooks/queries/useGetTasksMetaByCompletionQuery";
import { useMemo } from "react";

export const useTaskMetaByCompletion = () => {
  const getBoardsQuery = useGetBoardsQuery();
  const getTasksMetaByCompletionQuery = useGetTasksMetaByCompletionQuery();

  const [totalTasks, chartData, chartConfig] = useMemo(() => {
    let totalTasks;
    let chartData;
    let chartConfig: Record<string, { label: string; color: string }> = {};
    if (getTasksMetaByCompletionQuery.data) {
      const {
        data: {
          meta: { total, ...rest },
        },
      } = getTasksMetaByCompletionQuery;
      totalTasks = total;
      chartData = Object.entries(rest).map(
        ([completionCategory, numTasks], index) => ({
          completionCategory,
          numTasks,
          fill: `var(--chart-${index})`,
        }),
      );
      Object.keys(rest).forEach((completionCategory, index) => {
        console.log({ completionCategory, index });
        chartConfig[completionCategory] = {
          label:
            completionCategory === "notApplicable"
              ? "N/A"
              : completionCategory.toUpperCase(),
          color: `var(--chart-${index})`,
        };
      });
    }
    return [totalTasks, chartData, chartConfig];
  }, [getTasksMetaByCompletionQuery.data]);

  const numBoards = getBoardsQuery.data?.meta.total;
  return {
    // PROPS
    totalTasks,
    chartData,
    chartConfig,
    numBoards,

    // CONTROL PROPS
    isFetchingBoards: getBoardsQuery.isFetching,
    isFetchingTasksMeta: getTasksMetaByCompletionQuery.isFetching,
    isErrorBoards: getBoardsQuery.isError,
    isErrorTasksMeta: getTasksMetaByCompletionQuery.isError,
    refetchQuery: getTasksMetaByCompletionQuery.refetch,
  };
};
