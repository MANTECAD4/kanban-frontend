import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeProps {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
}

export type ThemeState = ThemeProps & ThemeActions;

const storeApi: StateCreator<ThemeState, [["zustand/devtools", never]]> = (
  set,
) => ({
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  setTheme: (theme: Theme) => set({ theme }, false, "setTheme"),
});

export const useThemeStore = create<ThemeState>()(
  persist(devtools(storeApi), { name: "theme-store" }),
);
