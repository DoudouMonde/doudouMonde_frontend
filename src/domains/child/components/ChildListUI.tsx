import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";
import { ChildEditModal } from "./ChildEditModal";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";

export const ChildListUI = () => {
  const { isLoading, error, isEditModalOpen, editingChild, closeEditModal } =
    useChildListContext();

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
          <ChildProfileList />
        </ContentSection>
      </MainContainer>

      {isEditModalOpen && editingChild && (
        <ChildEditModal child={editingChild} onClose={closeEditModal} />
      )}
    </PageContainer>
  );
};
