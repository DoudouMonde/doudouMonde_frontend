import { useEffect, useState } from "react";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { childApi } from "../apis/childApi";

export const useChildList = () => {
  const [children, setChildren] = useState<ChildItemResponse[]>([]);

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

  return {
    children,
    isLoading,
    error,
    setChildren,
  };
};
