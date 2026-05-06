import "./index.css";
import { RouterProvider } from "react-router";
import { appRouter } from "@/providers/Router";

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
