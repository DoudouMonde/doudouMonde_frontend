import { useNavigate } from "react-router-dom";
import Arrow from "@/assets/icons/Arrow";
// import { useMemberNameQuery } from "@/domains/auth/queries/useMemberNameQuery";
import { useState } from "react";
// import { useUpdateMemberAddressMutation } from "@/domains/auth/queries/useUpdateMemberAddressMutation";
import { AddressModal } from "@/shared/components/Modal/AddressModal";
import { ActionListSection } from "@/shared/components/Section/ActionListSection";

import {
  PageContainer,
  MainContainer,
  ContentSection,
} from "@/shared/components/Layout";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";

export const MemberInfoPage = () => {
  const navigate = useNavigate();
  // const { data: memberName } = useMemberNameQuery();
  // const updateAddressMutation = useUpdateMemberAddressMutation();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");

  const regions = [
    { value: "SEOUL", label: "서울" },
    { value: "GYEONGGI", label: "경기도" },
    { value: "GANGWON", label: "강원도" },
    { value: "CHUNGCHEONG", label: "충청도" },
    { value: "JEOLLA", label: "전라도" },
    { value: "GYEONGSANG", label: "경상도" },
    { value: "JEJU", label: "제주도" },
  ];

  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleCloseAddressModal = () => setIsAddressModalOpen(false);
  const handleRegionSelect = (region: string) => setSelectedRegion(region);

  const handleBackClick = () => navigate(-1);

  return (
    <PageContainer>
      <Background />
      <MainContainer>
        <TopBar title="회원 정보" />
        <ContentSection>
          {/* 카카오톡 계정 연동 */}
          <div className="flex flex-col justify-center gap-2 bg-gray-200/70 rounded-[20px] p-7 w-full h-[120px]">
            <p className="title-hak">김출신</p>
            <p className="subtitle">카카오톡 계정 연동 중</p>
          </div>
          {/* 계정정보 */}

          {/* 계정정보 섹션 */}
          <ActionListSection
            title="이야기마을북"
            items={[
              {
                label: "주문하기",
                onClick: handleOpenAddressModal,
              },
              {
                label: "주소 관리",
                onClick: handleOpenAddressModal,
              },
            ]}
          />

          {/* 정보 관리 섹션 */}
          <ActionListSection
            title="정보 관리"
            items={[
              { label: "거주지 변경", onClick: handleOpenAddressModal },
              { label: "로그아웃", onClick: handleOpenAddressModal },
              { label: "회원 탈퇴", onClick: handleOpenAddressModal },
            ]}
          />
        </ContentSection>

        {/* 주소 모달 */}
        {isAddressModalOpen && (
          <AddressModal
            open={isAddressModalOpen}
            onClose={handleCloseAddressModal}
            regions={regions}
            selectedRegion={selectedRegion}
            detailedAddress={detailedAddress}
            onRegionChange={setSelectedRegion}
            onDetailedAddressChange={setDetailedAddress}
            // 필요시 활성화
            // onSave={handleSaveAddress}
            // isSaving={updateAddressMutation.isPending}
          />
        )}
      </MainContainer>
    </PageContainer>
  );
};
