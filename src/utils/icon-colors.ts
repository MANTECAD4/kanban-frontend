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
    bg: "bg-red-900",
    stroke: "stroke-red-400",
    border: "border-red-400",
    text: "text-red-300",
    shadow: "shadow-lg shadow-red-600",
  },
  ORANGE: {
    bg: "bg-orange-900",
    stroke: "stroke-orange-400",
    border: "border-orange-400",
    text: "text-orange-300",
    shadow: "shadow-lg shadow-orange-600",
  },
  YELLOW: {
    bg: "bg-yellow-900",
    stroke: "stroke-yellow-400",
    border: "border-yellow-400",
    text: "text-yellow-300",
    shadow: "shadow-lg shadow-yellow-600",
  },
  GREEN: {
    bg: "bg-green-900",
    stroke: "stroke-green-400",
    border: "border-green-400",
    text: "text-green-300",
    shadow: "shadow-lg shadow-green-600",
  },
  SKY: {
    bg: "bg-sky-900",
    stroke: "stroke-sky-400",
    border: "border-sky-400",
    text: "text-sky-300",
    shadow: "shadow-lg shadow-sky-600",
  },
  CYAN: {
    bg: "bg-cyan-900",
    stroke: "stroke-cyan-400",
    border: "border-cyan-400",
    text: "text-cyan-300",
    shadow: "shadow-lg shadow-cyan-600",
  },
  INDIGO: {
    bg: "bg-indigo-900",
    stroke: "stroke-indigo-400",
    border: "border-indigo-400",
    text: "text-indigo-300",
    shadow: "shadow-lg shadow-indigo-600",
  },
  PURPLE: {
    bg: "bg-purple-900",
    stroke: "stroke-purple-400",
    border: "border-purple-400",
    text: "text-purple-300",
    shadow: "shadow-lg shadow-purple-600",
  },
  PINK: {
    bg: "bg-pink-900",
    stroke: "stroke-pink-400",
    border: "border-pink-400",
    text: "text-pink-300",
    shadow: "shadow-lg shadow-pink-600",
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
  Urgent: "text-destructive",
};
export const PriorityColorsBg: Record<TaskPriority, string> = {
  Low: "bg-success",
  Medium: "bg-blue-600",
  High: "bg-yellow-600",
  Urgent: "bg-destructive",
};
