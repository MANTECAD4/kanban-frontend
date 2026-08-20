import type { IconColorKeys } from "@/dtos/project.dto";
import type { TaskPriority } from "@/dtos/task.dto";

export interface IconColorComponents {
  bg: string;
  stroke: string;
  border: string;
  text: string;
  shadow: string;
}

export const iconColors: Record<IconColorKeys, IconColorComponents> = {
  RED: {
    bg: "bg-red-200 dark:bg-red-950",
    stroke: "stroke-red-400",
    border: "border-red-400",
    text: "text-red-600 dark:text-red-400",
    shadow: "shadow-lg shadow-red-300 dark:shadow-red-700",
  },
  ORANGE: {
    bg: "bg-orange-200 dark:bg-orange-950",
    stroke: "stroke-orange-400",
    border: "border-orange-400",
    text: "text-orange-600 dark:text-orange-400",
    shadow: "shadow-lg shadow-orange-300 dark:shadow-orange-700",
  },
  YELLOW: {
    bg: "bg-yellow-200 dark:bg-yellow-950",
    stroke: "stroke-yellow-400",
    border: "border-yellow-400",
    text: "text-yellow-600 dark:text-yellow-400",
    shadow: "shadow-lg shadow-yellow-300 dark:shadow-yellow-700",
  },
  GREEN: {
    bg: "bg-green-200 dark:bg-green-950",
    stroke: "stroke-green-400",
    border: "border-green-400",
    text: "text-green-600 dark:text-green-400",
    shadow: "shadow-lg shadow-green-300 dark:shadow-green-700",
  },
  SKY: {
    bg: "bg-sky-200 dark:bg-sky-950",
    stroke: "stroke-sky-400",
    border: "border-sky-400",
    text: "text-sky-600 dark:text-sky-400",
    shadow: "shadow-lg shadow-sky-300 dark:shadow-sky-700",
  },
  CYAN: {
    bg: "bg-cyan-200 dark:bg-cyan-950",
    stroke: "stroke-cyan-400",
    border: "border-cyan-400",
    text: "text-cyan-600 dark:text-cyan-400",
    shadow: "shadow-lg shadow-cyan-300 dark:shadow-cyan-700",
  },
  INDIGO: {
    bg: "bg-indigo-200 dark:bg-indigo-950",
    stroke: "stroke-indigo-400",
    border: "border-indigo-400",
    text: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-lg shadow-indigo-300 dark:shadow-indigo-700",
  },
  PURPLE: {
    bg: "bg-purple-200 dark:bg-purple-950",
    stroke: "stroke-purple-400",
    border: "border-purple-400",
    text: "text-purple-600 dark:text-purple-400",
    shadow: "shadow-lg shadow-purple-300 dark:shadow-purple-700",
  },
  PINK: {
    bg: "bg-pink-200 dark:bg-pink-950",
    stroke: "stroke-pink-400",
    border: "border-pink-400",
    text: "text-pink-600 dark:text-pink-400",
    shadow: "shadow-lg shadow-pink-300 dark:shadow-pink-700",
  },
  GRAY: {
    bg: "bg-gray-600",
    stroke: "stroke-gray-400",
    border: "border-gray-400",
    text: "text-gray-300",
    shadow: "shadow-lg shadow-gray-300",
  },
};

export const PriorityColorsText: Record<TaskPriority, string> = {
  Low: "text-success",
  Medium: "text-blue-600",
  High: "text-yellow-600",
  Urgent: "text-red-600",
};
export const PriorityColorsBg: Record<TaskPriority, string> = {
  Low: "bg-success",
  Medium: "bg-blue-600",
  High: "bg-yellow-600",
  Urgent: "bg-red-600",
};
