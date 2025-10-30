// ChildListContext.ts
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { createContext, useContext } from "react";

export type ChildListContextType = {
  // data
  children: ChildItemResponse[];
  isLoading: boolean;
  error: string | null;

  // edit modal
  editingChild: ChildItemResponse | null;
  isEditModalOpen: boolean;
  openEditModal: (childId: number) => void;
  closeEditModal: () => void;
  handleEditSave: () => void;

  // avatar picker
  avatarTarget: ChildItemResponse | null;
  isAvatarPickerOpen: boolean;
  openAvatarPicker: (childId: number) => void;
  closeAvatarPicker: () => void;

  // add child
  handleAddChildClick: () => void;

  // 선택: 리스트 다시 불러오기 같은 유틸이 있다면
  // refresh?: () => Promise<void>;
};

// Context 생성
export const ChildListContext = createContext<ChildListContextType | null>(
  null
);

// Consumer 커스텀 훅
export const useChildListContext = () => {
  const ctx = useContext(ChildListContext);
  if (!ctx)
    throw new Error("ChildListContext는 Provider 안에서만 사용 가능합니다.");
  return ctx;
};
