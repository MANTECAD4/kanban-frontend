import { PriorityColorsBg } from "@/utils/icon-colors";
import { add } from "date-fns";

export const getUpcomingDateColor = (d: Date) => {
  const date = new Date(d);

  const now = new Date();

  if (date <= add(now, { days: 3 })) {
    return PriorityColorsBg.Urgent;
  }
  if (date <= add(now, { days: 7 })) {
    return PriorityColorsBg.High;
  }
  if (date <= add(now, { days: 15 })) {
    return PriorityColorsBg.Medium;
  }
  if (date <= add(now, { days: 30 })) {
    return PriorityColorsBg.Low;
  }
  return PriorityColorsBg.Low;
};
