import { useEffect } from "react";

import { useAuthStore } from "@/providers/store/auth.store";
import { useThemeStore } from "@/providers/store/theme.store";

import { FingerprintPattern, Grip, ListTodo } from "lucide-react";
import { loadSession } from "@/actions/auth/load-session.action";
import { useQuery } from "@tanstack/react-query";

const features = [
  {
    title: "Secure Authentication",
    description:
      "High-grade security with token-based authentication and encrypted data storage to keep your projects safe.",
    icon: <FingerprintPattern className="m-2 text-foreground" />,
    className: "",
  },
  {
    title: "Drag & drop",
    description:
      "Effortlessly move tasks between columns with intuitive drag-and-drop. Reorder priorities in seconds.",
    icon: <Grip className="m-2 text-foreground" />,
    className: "-translate-y-10",
  },
  {
    title: "Task Management",
    description:
      "Create, assign, and track tasks with due dates, labels, and progress tracking all in one place.",
    icon: <ListTodo className="m-2 text-foreground" />,
    className: "-translate-y-20",
  },
];

export const useAuthLayout = () => {
  const theme = useThemeStore((state) => state.theme);
  const setSession = useAuthStore((state) => state.setSession);
  const { status, data: sessionData } = useQuery({
    queryFn: loadSession,
    queryKey: ["load-session"],
  });
  useEffect(() => {
    if (status === "success") {
      const {
        accessToken,
        data: { user },
      } = sessionData;
      setSession({ accessToken, ...user });
    }
    return () => {};
  }, [status, sessionData]);
  return {
    theme,
    features,
  };
};
