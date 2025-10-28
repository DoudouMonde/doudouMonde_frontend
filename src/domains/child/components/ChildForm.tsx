import React from "react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Background } from "@/shared/components/Background";
import { TopBar } from "@/shared/components/TopBar";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

import { ChildFormFields } from "@/domains/child/components/ChildFormFields";
import { SaveButton } from "@/shared/components/Button/SaveButton";
import {
  useChildRegistrationContext,
} from "@/domains/child/contexts/ChildRegistrationContext";

export const ChildForm = () => {
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
            <ChildFormFields />
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