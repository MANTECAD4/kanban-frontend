import "./index.css";
import { RouterProvider } from "react-router";
import { appRouter } from "@/providers/Router";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanstackProvider } from "@/providers/tanstack/TanstackProvider";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <TanstackProvider>
        <ThemeProvider>
          <TooltipProvider>
            <RouterProvider router={appRouter} />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </TanstackProvider>
    </>
  );
}

export default App;
