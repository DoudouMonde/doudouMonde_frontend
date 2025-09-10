import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PlayroomLayout } from "@/app/PlayroomLayout";
import {
  PerformanceDetailPage,
  PlayroomPage,
  FavoritesPage,
  MyPage,
  SelectPerformancePage,
  ChildAndDateSelectionPage,
  ReviewWritingPage,
  VoiceReviewPage,
  CharacterCreationPage,
  CharacterPreviewPage,
  ReviewDetailPage,
  ReviewListPage,
  HomePage,
} from "@/pages";
import { BottomNavigationLayout } from "@/app/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BottomNavigationLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
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
        element: <PlayroomPage />,
      },
      {
        path: "select-performance",
        element: <SelectPerformancePage />,
      },
      {
        path: "child-date-selection",
        element: <ChildAndDateSelectionPage />,
      },
      {
        path: "review-writing",
        element: <ReviewWritingPage />,
      },
      {
        path: "voice-review",
        element: <VoiceReviewPage />,
      },
      {
        path: "character-creation",
        element: <CharacterCreationPage />,
      },
      {
        path: "character-preview",
        element: <CharacterPreviewPage />,
      },
      {
        path: "reviews",
        element: <ReviewListPage />,
      },
      {
        path: "reviews/:reviewId",
        element: <ReviewDetailPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
