import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout.jsx"
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
]);

export default router;