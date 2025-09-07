import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@/app/Layout";
import Home from "@/pages/Home";
import Playroom from "@/pages/Playroom";
import Favorites from "@/pages/Favorites";
import MyPage from "@/pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "playroom",
        element: <Playroom />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
