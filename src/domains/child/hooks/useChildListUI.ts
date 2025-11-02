import { useMemo, useState } from "react";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { useDialog } from "@/shared/dialog/useDialog";
import { useUpdateChildMutation } from "@/domains/child/queries/useUpdateChildMutation";
import { UpdateChildRequest } from "@/domains/child/types/childApiTypes";

export function useChildListUI(children: ChildItemResponse[]) {
  const { confirm, alert } = useDialog();
  const updateChild = useUpdateChildMutation();
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
  const handleEditSave = async (payload: UpdateChildRequest) => {
    if (!editingChild) return;

    try {
      await updateChild.mutateAsync({ childId: editingChild.id, payload });
      await alert({
        title: "저장 완료",
        message: "아이 정보가 저장되었습니다.",
        buttonText: "확인",
      });
      closeEditModal();
    } catch (e) {
      console.error(e);
      await alert({
        title: "오류",
        message: "저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
        buttonText: "확인",
      });
    }
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
  // 기존
  // const handleAvaterEditSave = async () => {

  // 수정
  const handleAvaterEditSave = async (payload: UpdateChildRequest) => {
    if (!editingChild) return;

    try {
      await updateChild.mutateAsync({
        childId: editingChild.id,
        payload, // ← 전체 필드 포함
      });

      await alert({
        title: "저장 완료",
        message: "프로필 사진이 저장되었습니다.",
        buttonText: "확인",
      });

      setIsAvatarPickerOpen(false);
    } catch (e) {
      console.error(e);
      await alert({
        title: "오류",
        message: "프로필 저장에 실패했습니다.",
        buttonText: "확인",
      });
    }
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
