import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes";

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
