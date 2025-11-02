// /domains/child/hooks/useChildListUI.ts
import { useMemo, useState } from "react";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useDialog } from "@/shared/dialog/useDialog";

export function useChildListUI(children: ChildItemResponse[]) {
  const { confirm, alert } = useDialog();

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

  // 저장
  const handleEditSave = async () => {
    // TODO: 실제 update API 호출
    // await childApi.updateChild(...)

    // 저장 완료 알림
    await alert({
      title: "저장 완료",
      message: "아이 정보가 저장되었습니다.",
      buttonText: "확인",
    });

    closeEditModal();
  };

  // 수정 취소 (확인 모달)
  const handleEditCancel = async () => {
    const ok = await confirm({
      title: "수정 취소",
      message: "입력한 내용이 저장되지 않습니다. 정말 취소할까요?",
      confirmText: "취소하기",
      cancelText: "계속 편집",
    });
    if (ok) {
      closeEditModal();
    }
  };

  // 아바타 선택 열기
  const openAvatarPicker = (childId: number) => {
    if (!isEditModalOpen) return;
    const target = byId.get(childId) ?? null;
    setAvatarTarget(target);
    setIsAvatarPickerOpen(!!target);
  };

  // 아바타 모달 취소 (확인 모달)
  const cancelAvatarPicker = async () => {
    const ok = await confirm({
      title: "변경 취소",
      message: "프로필 사진 변경을 취소하시겠습니까?",
      confirmText: "취소하기",
      cancelText: "계속 편집",
    });
    if (ok) {
      setIsAvatarPickerOpen(false);
      setAvatarTarget(null);
    }
  };

  // 아바타 저장
  const handleAvaterEditSave = async () => {
    // TODO: update avatar API
    setIsAvatarPickerOpen(false);
  };

  // add child
  const handleAddChildClick = () => {
    // 구현 필요
  };

  return {
    // modal
    editingChild,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    handleEditSave,
    handleEditCancel,
    setIsEditModalOpen,

    // avatar
    avatarTarget,
    isAvatarPickerOpen,
    openAvatarPicker,
    cancelAvatarPicker,
    handleAvaterEditSave,

    // add child
    handleAddChildClick,
  };
}
