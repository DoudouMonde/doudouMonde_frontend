import { useEffect, useState } from "react";

import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { TopBar } from "@/shared/components/TopBar";
import { Background } from "@/shared/components/Background";
import { ChildProfileList } from "@/domains/child/components/ChildProfileList";

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

  const [selectedChild, setSelectedChild] = useState<ChildItemResponse | null>(
    null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProfileChildId, setEditingProfileChildId] = useState<
    number | null
  >(null);

  const handleProfileClick = (childId: number) => {
    setEditingProfileChildId(childId);
    setIsProfileModalOpen(true);
  };

  // childrenData가 변경될 때 children 상태 업데이트
  useEffect(() => {
    if (childrenData.length > 0) {
      setChildren(childrenData);
    }
  }, [childrenData]);

  useEffect(
    function initializeSelectedChild() {
      if (children.length === 0) return;
      setSelectedChild(children[0]);
    },
    [children]
  );

  return (
    <PageContainer>
      {/* 상단 바 */}
      <Background />

      {/* 메인 컨텐츠 */}
      <MainContainer>
        <TopBar title="아이 정보" />
        {/* 아이 프로필 */}
        <ContentSection>
          <ChildProfileList
            childrenData={children}
            onClickProfile={handleProfileClick}
          />
        </ContentSection>
      </MainContainer>
    </PageContainer>
  );
};
