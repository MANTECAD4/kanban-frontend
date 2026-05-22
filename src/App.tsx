import "./index.css";
import { RouterProvider } from "react-router";
import { appRouter } from "@/providers/Router";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={appRouter} />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
