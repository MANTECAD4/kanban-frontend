import "./index.css";
import { RouterProvider } from "react-router";
import { appRouter } from "@/providers/router/Router";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanstackProvider } from "@/providers/tanstack/TanstackProvider";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";

function App() {
  return (
    <>
      <TanstackProvider>
        <DragDropProvider>
          <ThemeProvider>
            <TooltipProvider>
              <RouterProvider router={appRouter} />
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </DragDropProvider>
      </TanstackProvider>
    </>
  );
}

export default App;
