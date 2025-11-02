// /domains/child/components/ChildListUI.tsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";
import { ChildEditModal } from "./ChildEditModal";
import { useChildList } from "@/domains/child/hooks/useChildList";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

function ListFallback() {
  return <p>아이 목록을 불러오는 중...</p>;
}

function ListErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      <p className="text-red-100">{error.message}</p>
      <button onClick={resetErrorBoundary} className="mt-2 underline">
        다시 시도
      </button>
    </div>
  );
}

export const ChildListUI = () => {
  const {
    children,
    isEditModalOpen,
    editingChild,
    closeEditModal,
    openEditModal,
    // avatar 관련도 필요하면 구조분해
  } = useChildList();

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 정보" />
        <ContentSection>
          <ErrorBoundary fallbackRender={ListErrorFallback}>
            <Suspense fallback={<ListFallback />}>
              <ChildProfileList
                children={children}
                onEditClick={openEditModal}
              />
              {isEditModalOpen && editingChild && (
                <ChildEditModal child={editingChild} onClose={closeEditModal} />
              )}
            </Suspense>
          </ErrorBoundary>
        </ContentSection>
      </MainContainer>
    </PageContainer>
  );
};
