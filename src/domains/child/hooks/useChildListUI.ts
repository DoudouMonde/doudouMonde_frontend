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

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const byId = useMemo(
    () => new Map(children.map((c) => [c.id, c])),
    [children]
  );

  //modal

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

  const handleEditSave = async () => {
    closeEditModal();
  };

  //avatar

  const resetAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
  };

  const openAvatarPicker = (childId: number) => {
    if (!isEditModalOpen) return; // 편집 모달이 열려 있을 때만
    const target = byId.get(childId) ?? null;
    setAvatarTarget(target);
    setIsAvatarPickerOpen(!!target);
  };

  //프로필 사진 모달에서 취소 눌렀을 때 -> 모달 창 띄우기
  const cancelAvatarPicker = () => {
    setConfirmOpen(true);
  };

  //모달창에서 취소 확인을 눌렀을 때
  // ✅ 확인 눌렀을 때 실제 닫기 로직
  const confirmCloseAvatarPicker = () => {
    setIsAvatarPickerOpen(false);
    setAvatarTarget(null);
    setConfirmOpen(false);
  };

  //프로필 사진 모달에서 저장 눌렀을 때
  const handleAvaterEditSave = async () => {
    //변경사항 저장하는 api 호출
    //update api를 만들어야겟군
    //아바타 피커 모달창 닫기
    setIsAvatarPickerOpen(false);
  };

  //add child
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
    cancelAvatarPicker,
    handleAvaterEditSave,

    //confirm
    confirmCloseAvatarPicker,
    isConfirmOpen,
    setConfirmOpen,

    //add Child
    handleAddChildClick,
  };
}
