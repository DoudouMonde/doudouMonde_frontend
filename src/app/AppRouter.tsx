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
import { BottomNavigationLayout } from "@/app/layout";
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
    path: "/home",
    element: <BottomNavigationLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH.PROFILE,
        element: <MyPage />,
      },
      {
        path: PATH.MEMBER_INFO,
        element: <MemberInfoPage />,
      },
      {
        path: PATH.CHILD_INFO,
        element: <ChildInfoPage />,
      },
      {
        path: "performances/:performanceId",
        element: <PerformanceDetailPage />,
      },
    ],
  },
  // 추가적인 직접 경로들 (fallback)
  {
    path: "/favorites",
    element: <FavoritesPage />,
    children: [
      {
        index: true,
        element: <FavoritesPage />,
      },
    ],
  },
  {
    path: "/mypage",
    element: <MyPage />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/member-info",
    element: <BottomNavigationLayout />,
    children: [
      {
        index: true,
        element: <MemberInfoPage />,
      },
    ],
  },
  {
    path: "/child-info",
    element: <BottomNavigationLayout />,
    children: [
      {
        index: true,
        element: <ChildInfoPage />,
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
