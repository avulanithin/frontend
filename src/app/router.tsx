import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.tsx";
import Dashboard from "../pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "emails", element: <div>Emails Page</div> },
      { path: "tasks", element: <div>Tasks Page</div> },
      { path: "calendar", element: <div>Calendar Page</div> },
    ],
  },
]);

export default router;
