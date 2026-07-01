import {
  CreateProjectSchema,
  IconColor,
  type CreateProjectState,
} from "@/interfaces/project.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IconName } from "lucide-react/dynamic";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IconColorComponents {
  bg: string;
  stroke: string;
  border: string;
}
const colors: Record<string, IconColorComponents> = {
  RED: {
    bg: "bg-red-600/20",
    stroke: "stroke-red-600",
    border: "border-red-600",
  },
  ORANGE: {
    bg: "bg-orange-600/20",
    stroke: "stroke-orange-600",
    border: "border-orange-600",
  },
  YELLOW: {
    bg: "bg-yellow-600/20",
    stroke: "stroke-yellow-600",
    border: "border-yellow-600",
  },
  GREEN: {
    bg: "bg-green-600/20",
    stroke: "stroke-green-600",
    border: "border-green-600",
  },
  SKY: {
    bg: "bg-sky-600/20",
    stroke: "stroke-sky-600",
    border: "border-sky-600",
  },
  CYAN: {
    bg: "bg-cyan-600/20",
    stroke: "stroke-cyan-600",
    border: "border-cyan-600",
  },
  INDIGO: {
    bg: "bg-indigo-600/20",
    stroke: "stroke-indigo-600",
    border: "border-indigo-600",
  },
  PURPLE: {
    bg: "bg-purple-600/20",
    stroke: "stroke-purple-600",
    border: "border-purple-600",
  },
  PINK: {
    bg: "bg-pink-600/20",
    stroke: "stroke-pink-600",
    border: "border-pink-600",
  },
  GRAY: {
    bg: "bg-gray-600/20",
    stroke: "stroke-gray-600",
    border: "border-gray-600",
  },
};
3;
export const useAddProject = () => {
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("folder-kanban");

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateProjectState>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "cat",
      iconColor: IconColor.RED,
    },
  });

  const onSubmitForm: SubmitHandler<CreateProjectState> = (data) => {
    console.log({ data });
  };

  return {
    selectedColor,
    selectedIcon,
    colors,
    errors,
    control,
    setSelectedColor,
    setSelectedIcon,
    onSubmitForm,
    register,
    handleSubmit,
    reset,
  };
};
