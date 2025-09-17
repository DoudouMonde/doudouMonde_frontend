import { useState } from "react";
import { AddressSearchInput } from "./index";
import { SelectedAddress } from "@/shared/types/location";

// 사용 예시 컴포넌트
export const AddressSearchExample = () => {
  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddress | null>(null);

  const handleSelect = (address: SelectedAddress) => {
    setSelectedAddress(address);
    console.log("선택된 주소:", address);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">주소 검색 예시</h2>

      <AddressSearchInput
        placeholder="주소를 검색해주세요"
        onSelect={handleSelect}
      />

      {selectedAddress && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-sm mb-2">선택된 주소 정보:</h3>
          <div className="space-y-1 text-sm">
            <p>
              <strong>장소명:</strong> {selectedAddress.placeName}
            </p>
            <p>
              <strong>도로명주소:</strong> {selectedAddress.roadAddressName}
            </p>
            <p>
              <strong>지번주소:</strong> {selectedAddress.addressName}
            </p>
            <p>
              <strong>카테고리:</strong> {selectedAddress.categoryName}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedAddress.phone || "없음"}
            </p>
            <p>
              <strong>위도:</strong> {selectedAddress.latitude}
            </p>
            <p>
              <strong>경도:</strong> {selectedAddress.longitude}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
