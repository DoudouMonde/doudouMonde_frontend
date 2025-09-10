import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages/Home";
import Playroom from "@/pages/Playroom";
import Favorites from "@/pages/Favorites";
import MyPage from "@/pages/MyPage";
import SelectPerformance from "@/pages/SelectPerformance";
import ChildAndDateSelection from "@/pages/ChildAndDateSelection";
import ReviewWriting from "@/pages/ReviewWriting";
import VoiceReview from "@/pages/VoiceReview";
import CharacterCreation from "@/pages/CharacterCreation";
import CharacterPreview from "@/pages/CharacterPreview";
import ReviewDetail from "@/pages/ReviewDetail";
import ReviewList from "@/pages/ReviewList";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { PerformanceDetailPage } from "@/pages";
import { BottomNavigationLayout } from "@/app/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BottomNavigationLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
      {
        path: "performances/:performanceId",
        element: <PerformanceDetailPage />,
      },
    ],
  },

  {
    path: "/playroom",
    element: <PlayroomLayout />,
    children: [
      {
        index: true,
        element: <Playroom />,
      },
      {
        path: "select-performance",
        element: <SelectPerformance />,
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
        path: "character-creation",
        element: <CharacterCreation />,
      },
      {
        path: "character-preview",
        element: <CharacterPreview />,
      },
      {
        path: "reviews",
        element: <ReviewList />,
      },
      {
        path: "reviews/:reviewId",
        element: <ReviewDetail />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
