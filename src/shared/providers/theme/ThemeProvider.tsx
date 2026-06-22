import { useThemeStore } from "@/shared/providers/store/theme.store";
import { useEffect, type PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    const root = window.document.documentElement;
    console.log("me ejecute");
    root.classList.remove("light", "dark");

    root.classList.add(theme);
  }, [theme]);
  return <>{children}</>;
};
