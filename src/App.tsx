import "./index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";
import { TanstackProvider } from "@/shared/providers/tanstack/TanstackProvider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { appRouter } from "@/shared/providers/router/Router";
import { ThemeProvider } from "@/shared/providers/theme/ThemeProvider";

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
