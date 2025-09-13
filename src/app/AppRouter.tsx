import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PlayroomLayout } from "@/app/PlayroomLayout";
import {
  LoginPage,
  RegionRegistrationPage,
  ChildRegistrationPage,
  PerformanceDetailPage,
  PlayroomPage,
  FavoritesPage,
  MyPage,
  MemberInfoPage,
  ChildInfoPage,
  SelectPerformancePage,
  ChildAndDateSelectionPage,
  ReviewWritingPage,
  VoiceReviewPage,
  CharacterCreationPage,
  CharacterPreviewPage,
  ReviewDetailPage,
  ReviewListPage,
  HomePage,
  LoginRedirectPage,
} from "@/pages";
import { BottomNavigationLayout } from "@/app/layout";
import { PATH } from "@/shared/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/region-registration",
    element: <RegionRegistrationPage />,
  },
  {
    path: "/child-registration",
    element: <ChildRegistrationPage />,
  },
  {
    path: "/home",
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
        path: "member-info",
        element: <MemberInfoPage />,
      },
      {
        path: "child-info",
        element: <ChildInfoPage />,
      },
      {
        path: "performances/:performanceId",
        element: <PerformanceDetailPage />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },

      {
        path: PATH.LOGIN_REDIRECT,
        element: <LoginRedirectPage />,
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
