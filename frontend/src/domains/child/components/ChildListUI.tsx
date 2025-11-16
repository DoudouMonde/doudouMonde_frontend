// /domains/child/components/ChildListUI.tsx
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";

import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

const ListFallback = () => {
  return <p>아이 목록을 불러오는 중...</p>;
};

const ListErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div>
      <p className="text-red-100">{error.message}</p>
      <button onClick={resetErrorBoundary} className="mt-2 underline">
        다시 시도
      </button>
    </div>
  );
};

export const ChildListUI = () => {
  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 정보" />
        <ContentSection>
          <ErrorBoundary fallbackRender={ListErrorFallback}>
            <Suspense fallback={<ListFallback />}>
              <ChildProfileList />
            </Suspense>
          </ErrorBoundary>
        </ContentSection>
      </MainContainer>
    </PageContainer>
  );
};
