import { CirclePlus } from "lucide-react";
import React from "react";

export const AddTaskPlaceholder = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-card border border-gray-200 dark:border-gray-700 rounded-xl aspect-square">
      <CirclePlus className="size-1/4 stroke-gray-300 dark:stroke-gray-800" />
      <p>Add a new task</p>
    </div>
  );
};
