import React from "react";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { Background } from "@/shared/components/Background";
import { TopBar } from "@/shared/components/TopBar";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

//구현한 훅
import { useChildRegistration } from "@/domains/child/hooks/useChildRegistration";
import { ChildFormFields } from "@/domains/child/components/ChildFormFields";
import { SaveButton } from "@/shared/components/Button/SaveButton";

export const ChildRegistrationPage = () => {
  const {
    control,
    setValue,
    formValues,
    errors,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleSave,
    handleComplete,
    handleAddAnotherChild,
    isDuplicateName,
    isLimitReached,
    maxChildren,
  } = useChildRegistration();

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 등록" />

        {/* 메인 컨텐츠 */}
        <form onSubmit={handleSave}>
          {/* 훅에서 정의된 handleSave 사용 */}
          <ContentSection>
            <ChildFormFields
              control={control}
              formValues={formValues}
              setValue={setValue}
              errors={errors}
              isDuplicateName={isDuplicateName}
              isLimitReached={isLimitReached}
              maxChildrend={maxChildren}
            />
            <SaveButton onClick={handleSave} text={"등록하기"} />
          </ContentSection>
        </form>
        {/* 하단 고정 저장 버튼 */}
      </MainContainer>

      {/* 바텀시트 오버레이 */}
      {isBottomSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsBottomSheetOpen(false)}
        />
      )}

      {/* 바텀시트 */}
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
