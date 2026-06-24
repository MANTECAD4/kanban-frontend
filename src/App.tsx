import "./index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { DragDropProvider } from "@dnd-kit/react";
import { TanstackProvider } from "@/shared/providers/tanstack/TanstackProvider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { appRouter } from "@/shared/providers/router/Router";
import { ThemeProvider } from "@/shared/providers/theme/ThemeProvider";
import { SidebarProvider } from "@/shared/components/ui/sidebar";

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
