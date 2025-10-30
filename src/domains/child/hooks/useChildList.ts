import { useEffect, useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { childApi } from "../apis/childApi";

export const useChildList = () => {
  const [children, setChildren] = useState<ChildItemResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingChild, setEditingChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [avatarTarget, setAvatarTarget] = useState<ChildItemResponse | null>(
    null
  );

  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await childApi.getChildList();
        setChildren(res); // 또는 setChildren(res.children)
      } catch (e) {
        console.error(e);
        setError("아이 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const findChild = (id: number) => children.find((c) => c.id === id) ?? null;

  const resetAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
  };

  const openEditModal = (childId: number) => {
    console.log(childId);
    const target = findChild(childId);
    resetAvatarPicker();
    setEditingChild(target);
    setIsEditModalOpen(!!target); // !!: truthy → true, null → false
  };
  const closeEditModal = () => {
    resetAvatarPicker();
    setIsEditModalOpen(false);
    setEditingChild(null);
  };

  const openAvatarPicker = (childId: number) => {
    //편집 모달이 열려 있을 때만 전환
    if (!isEditModalOpen) return;

    const target = findChild(childId);
    setAvatarTarget(target);
    setIsAvatarPickerOpen(!!target);
  };
  const closeAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
  };

  // 저장
  const handleEditSave = () => {
    // TODO: patch 호출 등
    closeEditModal();
  };

  return {
    // data
    children,
    isLoading,
    error,

    // edit modal
    editingChild,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEditSave,

    // avatar picker
    avatarTarget,
    isAvatarPickerOpen,
    openAvatarPicker,
    closeAvatarPicker,

    // (기존) 추가 버튼
    handleAddChildClick: () => {},
  };
};
