import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { Button } from "@/shared/components/ui/button";
import { useThemeStore } from "@/shared/providers/store/theme.store";
import { Moon, Sun } from "lucide-react";
export const ToggleThemeButton = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="flex fixed top-3 right-3 w-8 h-8 rounded-[50%] opacity-80"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>
          {theme === "dark" ? "Change to Light mode" : "Change to Dark mode"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
