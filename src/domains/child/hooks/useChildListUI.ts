// /domains/child/hooks/useChildListUI.ts
import { useMemo, useState } from "react";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";

export function useChildListUI(children: ChildItemResponse[]) {
  const [editingChild, setEditingChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [avatarTarget, setAvatarTarget] = useState<ChildItemResponse | null>(
    null
  );
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);

  const byId = useMemo(
    () => new Map(children.map((c) => [c.id, c])),
    [children]
  );

  const resetAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
  };

  const openEditModal = (childId: number) => {
    resetAvatarPicker();
    const target = byId.get(childId) ?? null;
    setEditingChild(target);
    setIsEditModalOpen(!!target);
  };

  const closeEditModal = () => {
    resetAvatarPicker();
    setIsEditModalOpen(false);
    setEditingChild(null);
  };

  const openAvatarPicker = (childId: number) => {
    if (!isEditModalOpen) return; // 편집 모달이 열려 있을 때만
    const target = byId.get(childId) ?? null;
    setAvatarTarget(target);
    setIsAvatarPickerOpen(!!target);
  };

  const closeAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
  };

  const handleEditSave = async () => {
    // TODO: PATCH 호출 후 성공 시 모달 닫기/리패치 등
    closeEditModal();
  };

  const handleAddChildClick = () => {
    //구현 필요
  };

  return {
    // modal
    editingChild,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEditSave,
    // avatar
    avatarTarget,
    isAvatarPickerOpen,
    openAvatarPicker,
    closeAvatarPicker,
    //add Child
    handleAddChildClick,
  };
}
