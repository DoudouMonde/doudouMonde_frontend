import { useEffect, useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { childApi } from "../apis/childApi";

// src/domains/child/components/ChildList.tsx (Container)

export const useChildList = () => {
  // 모달 및 편집 상태는 여기에 유지
  const [editingChild, setEditingChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [children, setChildren] = useState<ChildItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleProfileClick = (childId: number) => {
    const target = children.find((child) => child.id === childId);
    if (target) {
      setEditingChild(target);
      setIsProfileModalOpen(!!target); //느낌표 두 개는 무슨 의미지?
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

  const handleEditSave = () => {
    handleModalClose();
  };

  useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await childApi.getChildList();

        setChildren(response);
        console.log("아이 목록 조회:", response);
      } catch (err) {
        console.error("아이 목록 조회 실패:", err);
        setError("아이 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChildren();
  }, []);

  return {
    editingChild,
    setEditingChild,
    isProfileModalOpen,
    setIsProfileModalOpen,
    handleProfileClick,
    handleModalClose,
    handleEditSave,
    handleAddChildClick,
    children,
    setChildren,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
};
