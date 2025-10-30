import { useEffect, useState } from "react";

import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";
import { ChildEditModal } from "./ChildEditModal";
import { childApi } from "../apis/childApi";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

// const MOCK_CHILDREN: ChildItemResponse[] = [
//   {
//     id: 1,
//     name: "도윤",
//     profile: "CAT",
//     birthday: "2025-10-10",
//     gender: "MALE" as const,
//   },
//   {
//     id: 2,
//     name: "서아",
//     profile: "RABBIT",
//     birthday: "2025-10-10",
//     gender: "FEMALE" as const,
//   },
//   {
//     id: 3,
//     name: "하준",
//     profile: "DOG",
//     birthday: "2025-10-10",
//     gender: "MALE" as const,
//   },
// ];

export const ChildList = () => {
  // 🔁 로컬 대체 상태  // 🔁 로컬 대체 상태
  // const childrenData: ChildItemResponse[] = MOCK_CHILDREN;

  const [children, setChildren] = useState<ChildItemResponse[]>([]);
  const [editingChild, setEditingChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //아이 목록 조회. API 호출
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

  if (isLoading) {
    return (
      <PageContainer>
        <MainContainer>
          <p>아이 목록을 불러오는 중...</p>
        </MainContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <MainContainer>
          <p className="text-red-100">{error}</p>
        </MainContainer>
      </PageContainer>
    );
  }

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
