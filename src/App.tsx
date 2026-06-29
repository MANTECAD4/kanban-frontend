import "./index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";
import { TanstackProvider } from "@/providers/tanstack/TanstackProvider";
import { TooltipProvider } from "@/components/shared/ui/tooltip";
import { appRouter } from "@/providers/router/Router";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import { SidebarProvider } from "@/components//shared/ui/sidebar";

function App() {
  return (
    <>
      <TanstackProvider>
        <DragDropProvider>
          <ThemeProvider>
            <SidebarProvider>
              <TooltipProvider>
                <RouterProvider router={appRouter} />
                <Toaster />
              </TooltipProvider>
            </SidebarProvider>
          </ThemeProvider>
        </DragDropProvider>
      </TanstackProvider>
    </>
  );
}

export default App;
