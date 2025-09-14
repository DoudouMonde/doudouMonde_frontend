import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PlayroomLayout } from "@/app/PlayroomLayout";
import {
  IndexPage,
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
import { BottomNavigationLayout, PerformanceDetailLayout } from "@/app/layout";
import { PATH } from "@/shared/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/region-registration",
    element: <RegionRegistrationPage />,
  },
  {
    path: PATH.LOGIN_REDIRECT,
    element: <LoginRedirectPage />,
  },
  {
    path: PATH.CHILD_REGISTRATION,
    element: <ChildRegistrationPage />,
  },
  {
    path: "/",
    element: <BottomNavigationLayout />,
    children: [
      {
        path: PATH.HOME,
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
    ],
  },
  {
    path: "/",
    element: <PerformanceDetailLayout />,
    children: [
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
