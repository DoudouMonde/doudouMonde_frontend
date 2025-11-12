import { create } from "zustand";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";

interface ChildListUIState {
  editingChild: ChildItemResponse | null;
  isEditModalOpen: boolean;
  avatarTarget: ChildItemResponse | null;
  isAvatarPickerOpen: boolean;
  isCreateModalOpen: boolean;

  // actions
  openEditModal: (child: ChildItemResponse) => void;
  closeEditModal: () => void;
  openAvatarPicker: (child: ChildItemResponse) => void;
  closeAvatarPicker: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

export const useChildListStore = create<ChildListUIState>((set) => ({
  editingChild: null,
  isEditModalOpen: false,
  avatarTarget: null,
  isAvatarPickerOpen: false,
  isCreateModalOpen: false,

  openEditModal: (child) => set({ editingChild: child, isEditModalOpen: true }),
  closeEditModal: () => set({ editingChild: null, isEditModalOpen: false }),
  openAvatarPicker: (child) =>
    set({ avatarTarget: child, isAvatarPickerOpen: true }),
  closeAvatarPicker: () =>
    set({ avatarTarget: null, isAvatarPickerOpen: false }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
}));
