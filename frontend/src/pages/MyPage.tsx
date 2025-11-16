import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import { PATH } from "@/shared/constants/paths";
import { ActionListSection } from "@/shared/components/Section/ActionListSection";
import {
  PageContainer,
  ContentSection,
  MainContainer,
} from "@/shared/components/Layout";

import { Background } from "@/shared/components/Background";
import { TopBar } from "@/shared/components/TopBar";

// import { useMemberNameQuery } from "@/domains/auth/queries/useMemberNameQuery";

export const MyPage = () => {
  console.log("🎯 MyPage 컴포넌트가 렌더링되었습니다!");

  const navigate = useNavigate();
  // const { data: memberName } = useMemberNameQuery();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMemberInfoClick = () => {
    console.log("회원 정보 클릭:", PATH.MEMBER_INFO);
    navigate(PATH.MEMBER_INFO);
  };

  const handleChildInfoClick = () => {
    console.log("아이 정보 클릭:", PATH.CHILD_INFO);
    navigate(PATH.CHILD_INFO);
  };

  const handleStoryVillageBookClick = () => {
    console.log("이야기 마을북 클릭:", PATH.STORY_VILLAGE_BOOK);
    navigate(PATH.STORY_VILLAGE_BOOK);
  };

  const handleFavoritesClick = () => {
    console.log("보고싶어요 누른 작품 클릭:", PATH.WISHLIST);
    navigate(PATH.WISHLIST);
  };

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="마이페이지" />
        <ContentSection>
          {/* 카카오톡 계정 연동 */}
          <div className="flex flex-col justify-center gap-2 bg-gray-200/70 rounded-[20px] p-7 w-full h-[120px]">
            <p className="title-hak">김출신</p>
            <p className="subtitle">카카오톡 계정 연동 중</p>
          </div>
          {/* 계정정보 */}
          <ActionListSection
            title="계정"
            items={[
              {
                label: "회원 정보",
                onClick: handleMemberInfoClick,
              },
              {
                label: "아이 정보",
                onClick: handleChildInfoClick,
              },
            ]}
          />

          {/* 추가 기능 */}

          <ActionListSection
            title="추가 기능"
            items={[
              {
                label: "보고 싶어요 누른 작품",
                onClick: handleFavoritesClick,
              },
              {
                label: "이야기마을북",
                onClick: handleStoryVillageBookClick,
              },
            ]}
          />
        </ContentSection>
      </MainContainer>
    </PageContainer>
  );
};
