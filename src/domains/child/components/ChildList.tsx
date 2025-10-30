// src/domains/child/components/ChildList.tsx (Container)

import { useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useChildList } from "../hooks/useChildList"; // 훅 import
import { ChildListUI } from "./ChildListUI"; // UI 컴포넌트 import

export const ChildList = () => {
  const { children, isLoading, error } = useChildList(); // 로직 사용

  // 모달 및 편집 상태는 여기에 유지
  const [editingChild, setEditingChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleProfileClick = (childId: number) => {
    const childToEdit = children.find((child) => child.id === childId);
    if (childToEdit) {
      setEditingChild(childToEdit);
      setIsProfileModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsProfileModalOpen(false);
    setEditingChild(null);
    // 🌟 모달 닫을 때 목록 재조회 로직이 있다면 여기서 실행
  };

  const handleAddChildClick = () => {
    // ... 등록 모달 열기 로직
  };

  // 렌더링은 UI 컴포넌트에 위임
  return (
    <ChildListUI
      children={children}
      isLoading={isLoading}
      error={error}
      editingChild={editingChild}
      isProfileModalOpen={isProfileModalOpen}
      onProfileClick={handleProfileClick}
      onModalClose={handleModalClose}
      onAddChildClick={handleAddChildClick}
    />
  );
};
