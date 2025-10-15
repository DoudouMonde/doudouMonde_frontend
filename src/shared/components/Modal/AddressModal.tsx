import Modal from "@/shared/components/Modal";
import { AddressSearchInput } from "@/shared/components";

type Region = { value: string; label: string };

type AddressModalProps = {
  open: boolean;
  onClose: () => void;

  regions: Region[];
  selectedRegion: string;
  detailedAddress: string;

  onRegionChange: (value: string) => void;
  onDetailedAddressChange: (value: string) => void;

  /** 저장 버튼이 필요한 경우 전달하세요 */
  onSave?: () => void;
  /** 저장 진행 중 상태가 있다면 전달 */
  isSaving?: boolean;
};

export function AddressModal({
  open,
  onClose,
  regions,
  selectedRegion,
  detailedAddress,
  onRegionChange,
  onDetailedAddressChange,
  onSave,
  isSaving = false,
}: AddressModalProps) {
  const canSave =
    !!onSave &&
    !!selectedRegion &&
    detailedAddress.trim().length > 0 &&
    !isSaving;

  return (
    <Modal open={open} onClose={onClose}>
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
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="p-4 w-full bg-gray-200 rounded-lg border border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
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
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700 body-inter-r">
          상세 주소
        </label>
        <input
          type="text"
          value={detailedAddress}
          onChange={(e) => onDetailedAddressChange(e.target.value)}
          placeholder="예: 중구 세종대로 110"
          className="p-4 w-full bg-gray-200 rounded-lg border border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
        >
          취소
        </button>

        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className={`flex-1 py-3 rounded-xl text-gray-200 ${
              !canSave ? "bg-gray-400" : "bg-green-200 hover:bg-green-600"
            }`}
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        )}
      </div>
    </Modal>
  );
}
