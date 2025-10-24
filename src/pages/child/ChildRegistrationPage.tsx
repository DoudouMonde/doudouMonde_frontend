import React from "react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Background } from "@/shared/components/Background";
import { TopBar } from "@/shared/components/TopBar";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

import { useChildRegistration } from "@/domains/child/hooks/useChildRegistration";
import { ChildFormFields } from "@/domains/child/components/ChildFormFields";
import { SaveButton } from "@/shared/components/Button/SaveButton";
//생성한 Provider, Cosumer 훅 import 
import { ChildRegistrationProvider, useChildRegistrationContext } from "@/domains/child/contexts/ChildRegistrationContext";

//2. Page 컴포넌트는 Provider만 렌더링하도록 분리
export const ChildRegistrationPage = () => {
  return (
    <ChildRegistrationProvider>
      <ChildRegistrationView/>
    </ChildRegistrationProvider>
  )
}
//3. 기존의 Page의 JSX는 View 컴포넌트로 분리
const ChildRegistrationView = () => {
  //4. useChildRegistration 대신 Context 훅 사용
  const {
    handleSave,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleAddAnotherChild,
    handleComplete,
  } = useChildRegistrationContext();

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 등록" />
        <form onSubmit={handleSave}>
          <ContentSection>
            {/* 이전에 Props로 넘겼던 것을 이제 안 넘겨도 된다/  */}
            <ChildFormFields/>
            <SaveButton onClick={handleSave} text={"등록하기"} />
          </ContentSection>
        </form>
      </MainContainer>

      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsBottomSheetOpen(false)}
        />
      )}

      {isBottomSheetOpen && (
        <BottomSheet
          onClick1={handleAddAnotherChild}
          onClick2={handleComplete}
          title=" 아이 정보가 저장됐어요."
          content="다른 아이도 이어서 등록할까요?"
          field1="다른 아이 등록하기"
          field2="완료"
        />
      )}
    </PageContainer>
  );
};
