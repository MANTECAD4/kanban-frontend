import { useGetBoardsQuery } from "@/hooks/queries/useGetBoardsQuery";
import { useGetTasksMetaByPriority } from "@/hooks/queries/useGetTasksMetaByPriority";
import { useMemo } from "react";

export const useTaskMetaByPriority = () => {
  const getTasksMetaByPriorityQuery = useGetTasksMetaByPriority();
  const getBoardsQuery = useGetBoardsQuery();

  const [totalTasks, chartData, chartConfig] = useMemo(() => {
    let totalTasks;
    let chartData;
    let chartConfig: Record<string, { label: string; color: string }> = {};
    if (getTasksMetaByPriorityQuery.data) {
      const {
        data: {
          meta: { total, ...rest },
        },
      } = getTasksMetaByPriorityQuery;
      totalTasks = total;
      chartData = Object.entries(rest).map(([key, value], index) => ({
        priorityLevel: key,
        numTasks: value,
        fill: `var(--chart-${index})`,
      }));
      Object.keys(rest).forEach((key, index) => {
        chartConfig[key] = {
          label: key.toUpperCase(),
          color: `var(--chart-${index})`,
        };
      });
    }
    return [totalTasks, chartData, chartConfig];
  }, [getTasksMetaByPriorityQuery.data]);

  const numBoards = getBoardsQuery.data?.meta.total;
  return {
    // PROPS
    totalTasks,
    chartData,
    chartConfig,
    numBoards,
    isFetchingTasksMeta: getTasksMetaByPriorityQuery.isFetching,
    isFetchingBoards: getBoardsQuery.isFetching,
    isErrorTasksMeta: getTasksMetaByPriorityQuery.isError,
    isErrorBoards: getBoardsQuery.isError,
    refechQuery: getTasksMetaByPriorityQuery.refetch,
  };
};
