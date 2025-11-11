import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  ReviewDetailPage,
  ReviewListPage,
  HomePage,
  LoginRedirectPage,
  StoryVillageBookPage,
  ReviewStartPage,
} from "@/pages";
import { BottomNavigationLayout } from "@/app/layout";
import { PATH } from "@/shared/constants";
import { ChildExamplePage } from "@/domains/child/example/page/ChildExamplePage";
import { ReviewFunnelPage } from "@/pages/review/ReviewFunnelPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATH.REGION_REGISTRATION,
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
  // {
  //   path: "/child-registration/example",
  //   element: <ChildExamplePage />,
  // },
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
        path: PATH.WISHLIST,
        element: <FavoritesPage />,
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
    path: PATH.PLAYROOM,
    element: <PlayroomPage />,
  },
  { path: PATH.REVEIW_START, element: <ReviewStartPage /> },
  { path: "review-funnel", element: <ReviewFunnelPage /> },

  {
    path: PATH.REVIEW_LIST,
    element: <ReviewListPage />,
  },
  {
    path: "reviews/:reviewId",
    element: <ReviewDetailPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
