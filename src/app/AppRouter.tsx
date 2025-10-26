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
  CharTypeSelectPage,
  CharEmotionSelectPage,
  CharAccSelectPage,
  CharacterPreviewPage,
  ReviewDetailPage,
  ReviewListPage,
  HomePage,
  LoginRedirectPage,
  StoryVillageBookPage,
} from "@/pages";
import { BottomNavigationLayout } from "@/app/layout";
import { PATH } from "@/shared/constants";
import { ChildExamplePage } from "@/domains/child/example/page/ChildExamplePage";

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
  /**예시페이지 필요없으면 삭제 */
  {
    path: "/child-registration/example",
    element: <ChildExamplePage />,
  },
  /**예시페이지 끝*/
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
    path: "story-village-book",
    element: <StoryVillageBookPage />,
  },
  {
    path: "performances/:performanceId",
    element: <PerformanceDetailPage />,
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
      // {
      //   path: "voice-review",
      //   element: <VoiceReviewPage />,
      // },
      {
        path: "character-type-select",
        element: <CharTypeSelectPage />,
      },
      {
        path: "character-emotion-select",
        element: <CharEmotionSelectPage />,
      },
      {
        path: "character-acc-select",
        element: <CharAccSelectPage />,
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
