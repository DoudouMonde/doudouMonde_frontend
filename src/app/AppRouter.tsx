import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages/Home";
import Playroom from "@/pages/Playroom";
import Favorites from "@/pages/Favorites";
import MyPage from "@/pages/MyPage";
import ChildAndDateSelection from "@/pages/ChildAndDateSelection";
import ReviewWriting from "@/pages/ReviewWriting";
import VoiceReview from "@/pages/VoiceReview";
import { Layout } from "@/app";

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
        path: "child-date-selection",
        element: <ChildAndDateSelection />,
      },
      {
        path: "review-writing",
        element: <ReviewWriting />,
      },
      {
        path: "voice-review",
        element: <VoiceReview />,
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

export function AppRouter() {
  return <RouterProvider router={router} />;
}
