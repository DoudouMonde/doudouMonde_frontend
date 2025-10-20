import React from "react";
import { CustomButton } from "@/shared/components/CustomButton";
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

export const ChildRegistrationPage = () => {
  const {
    control,
    setValue,
    formValues,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    handleSave,
    handleComplete,
    handleAddAnotherChild,
    isButtonActive,
  } = useChildRegistration();

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="아이 등록" />

        {/* 메인 컨텐츠 */}
        <form onSubmit={handleSave}>
          {" "}
          {/* 훅에서 정의된 handleSave 사용 */}
          <ContentSection>
            <ChildFormFields
              control={control}
              formValues={formValues}
              setValue={setValue}
            />
          </ContentSection>
        </form>
      </MainContainer>

      {/* 하단 고정 저장 버튼 */}
      <div className="fixed right-0 bottom-0 left-0 z-30 p-6">
        <CustomButton onClick={handleSave} isActive={isButtonActive}>
          저장하기
        </CustomButton>
      </div>

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
