import { differenceInDays, differenceInHours } from "date-fns";

export const getTimeBeforeDueDate = (d: Date) => {
  const dueDate = new Date(d);

  const daysDifference = differenceInDays(dueDate, new Date());
  const hoursDifference = differenceInHours(dueDate, new Date());
  console.log({ daysDifference, hoursDifference });

  if (daysDifference <= 0 && hoursDifference < 0) {
    return "Due date already expired";
  }

  if (daysDifference > 0) {
    return `${daysDifference} days left before expiration`;
  }

  return `${hoursDifference} hours left before expiration`;
};
