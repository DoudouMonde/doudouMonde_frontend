import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import React, { createContext, useContext } from "react";

type ChildListContextType = {
  editingChild: ChildItemResponse | null;
  setEditingChild: React.Dispatch<
    React.SetStateAction<ChildItemResponse | null>
  >;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleProfileClick: (childId: number) => void;
  handleModalClose: () => void;
  handleAddChildClick: () => void;
  children: ChildItemResponse[];
  setChildren: React.Dispatch<React.SetStateAction<ChildItemResponse[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

//Context 생성
export const ChildListContext = createContext<ChildListContextType | null>(
  null
);

//Consumer 커스텀 훅 생성
export const useChildListContext = () => {
  const context = useContext(ChildListContext);
  if (!context) {
    throw new Error("Context는 Provider 안에서만 사용 가능합니다.");
  }
  return context;
};
