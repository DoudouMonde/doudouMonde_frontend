import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/icons/Back";
import Arrow from "@/assets/icons/Arrow";
import { useMemberNameQuery } from "@/domains/auth/queries/useMemberNameQuery";
import { useState } from "react";
import { useUpdateMemberAddressMutation } from "@/domains/auth/queries/useUpdateMemberAddressMutation";
import { AddressSearchInput } from "@/shared/components";

export const MemberInfoPage = () => {
  const navigate = useNavigate();
  const { data: memberName } = useMemberNameQuery();
  const updateAddressMutation = useUpdateMemberAddressMutation();

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

  const handleSaveAddress = async () => {
    if (!selectedRegion || !detailedAddress.trim()) return;
    try {
      await updateAddressMutation.mutateAsync({
        address: detailedAddress.trim(),
        sido: selectedRegion,
      });
      setIsAddressModalOpen(false);
    } catch (e) {
      console.error("주소 업데이트 실패", e);
    }
  };

  const handleBackClick = () => navigate(-1);

  return (
    <div className="overflow-y-auto w-full h-full">
      {/* 상단 바 */}
      <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-black title-hak">회원 정보</div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="px-6 py-4 pt-24">
        <div className="flex flex-col gap-6 justify-center w-full">
          {/* 카카오톡 계정 연동 */}
          <div className="flex flex-col justify-center gap-2 bg-gray-200/70 rounded-[20px] p-7 w-full h-[120px]">
            <p className="title-hak">{memberName ?? ""}</p>
            <p className="subtitle">카카오톡 계정 연동 중</p>
          </div>

          {/* 계정정보 */}
          <section>
            <p className="py-4 pl-2 text-black body-hak-b">이야기마을북</p>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full">
                <button
                  type="button"
                  className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60"
                  onClick={handleOpenAddressModal}
                >
                  <p className="body-inter-r">주문하기</p>
                  <Arrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* 정보 관리 */}
          <section>
            <p className="py-4 pl-2 text-black body-hak-b">정보 관리</p>
            <div className="flex flex-col justify-center">
              <div className="flex flex-col justify-center gap-6 bg-gray-200/70 rounded-[20px] p-5 w-full">
                <button
                  type="button"
                  className="flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100/60"
                  onClick={handleOpenAddressModal}
                >
                  <p className="body-inter-r">거주지 변경</p>
                  <Arrow className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 주소 모달 */}
      {isAddressModalOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/50">
          <div className="p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl shadow-xl">
            <div className="mb-4">
              <p className="title-hak">지역/주소 설정</p>
            </div>

            <div className="mb-4">
              <AddressSearchInput />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                지역 선택
              </label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => handleRegionSelect(e.target.value)}
                  className="p-4 pr-10 w-full bg-gray-200 rounded-lg border appearance-none border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
                >
                  <option value="" disabled>
                    지역을 선택해주세요
                  </option>
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
                <div className="flex absolute inset-y-0 right-0 items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                상세 주소
              </label>
              <input
                type="text"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="예: 중구 세종대로 110"
                className="p-4 w-full bg-gray-200 rounded-lg border border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCloseAddressModal}
                className="flex-1 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveAddress}
                disabled={
                  !selectedRegion ||
                  !detailedAddress.trim() ||
                  updateAddressMutation.isPending
                }
                className={`flex-1 py-3 rounded-xl text-gray-200 ${
                  !selectedRegion ||
                  !detailedAddress.trim() ||
                  updateAddressMutation.isPending
                    ? "bg-gray-400"
                    : "bg-green-200 hover:bg-green-600"
                }`}
              >
                {updateAddressMutation.isPending ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
