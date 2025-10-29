import { useEffect, useState } from "react";

import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";
import { ChildEditModal } from "./ChildEditModal";

import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

const MOCK_CHILDREN: ChildItemResponse[] = [
  { id: 1, name: "도윤", profile: "CAT" as const },
  { id: 2, name: "서아", profile: "RABBIT" as const },
  { id: 3, name: "하준", profile: "DOG" as const },
];

export const ChildList = () => {
  // 🔁 로컬 대체 상태  // 🔁 로컬 대체 상태
  const childrenData: ChildItemResponse[] = MOCK_CHILDREN;

  const [children, setChildren] = useState<ChildItemResponse[]>([]);
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
  };

  //아이 추가 버튼
  const handleAddChildClick = () => {
    //아이 추가 로직 구현
  };

  // childrenData가 변경될 때 children 상태 업데이트
  useEffect(() => {
    if (childrenData.length > 0) {
      setChildren(childrenData);
    }
  }, [childrenData]);
  return (
    <PageContainer>
      <Background />

      <MainContainer>
        <TopBar title="아이 정보" />
        <ContentSection>
          <ChildProfileList
            childrenData={children}
            onClickProfile={handleProfileClick}
            onAddChildClick={handleAddChildClick}
          />
        </ContentSection>
      </MainContainer>

      {isProfileModalOpen && editingChild && (
        <ChildEditModal child={editingChild} onClose={handleModalClose} />
      )}
    </PageContainer>
  );
};
