import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";
import { ChildEditModal } from "./ChildEditModal";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

interface ChildListUIProps {
  children: ChildItemResponse[];
  isLoading: boolean;
  error: string | null;
  editingChild: ChildItemResponse | null;
  isProfileModalOpen: boolean;
  onProfileClick: (childId: number) => void;
  onModalClose: () => void;
  onAddChildClick: () => void;
}

export const ChildListUI = ({
  children,
  isLoading,
  error,
  editingChild,
  isProfileModalOpen,
  onProfileClick,
  onModalClose,
  onAddChildClick,
}: ChildListUIProps) => {
  // 로딩/에러 상태 UI 렌더링
  if (isLoading) {
    return (
      <PageContainer>
        <MainContainer>
          <p>아이 목록을 불러오는 중...</p>
        </MainContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <MainContainer>
          <p className="text-red-100">{error}</p>
        </MainContainer>
      </PageContainer>
    );
  }

  // 메인 UI 렌더링
  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 정보" />
        <ContentSection>
          <ChildProfileList
            childrenData={children}
            onClickProfile={onProfileClick}
            onAddChildClick={onAddChildClick}
          />
        </ContentSection>
      </MainContainer>

      {isProfileModalOpen && editingChild && (
        <ChildEditModal child={editingChild} onClose={onModalClose} />
      )}
    </PageContainer>
  );
};
