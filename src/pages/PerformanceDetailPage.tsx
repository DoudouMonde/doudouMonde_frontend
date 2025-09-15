import {
  useAddWishlistMutation,
  useRemoveWishlistMutation,
} from "@/domains/favorites/queries";
import {
  ContentSection,
  NearbySection,
  PerformanceOverview,
  PerformanceHeader,
  TransportSection,
} from "@/domains/performance/components";
import { usePerformanceDetailQuery } from "@/domains/performance/queries";
import { queryClient, queryKeys } from "@/shared/apis";
import { ButtonChip, SwitchCase } from "@/shared/components";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const PerformanceDetailPage = () => {
  const [activeTab, setActiveTab] = useState("transport");
  const { performanceId } = useParams();
  const { data: performanceDetail } = usePerformanceDetailQuery(
    Number(performanceId),
    {
      enabled: !!performanceId,
    }
  );
  const { mutate: addWishlistMutation } = useAddWishlistMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PERFORMANCE_DETAIL, performanceId],
      });
    },
  });
  const { mutate: removeWishlistMutation } = useRemoveWishlistMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.PERFORMANCE_DETAIL, performanceId],
      });
    },
  });

  if (!performanceDetail) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 items-center w-full bg-white pb-[80px]">
      {/* 상단 헤더 */}
      <PerformanceHeader />

      <div className="flex flex-col flex-1 w-full pt-[88px]">
        {/* 공연 정보 */}
        <PerformanceOverview />

        {/* 탭 메뉴 */}
        <div className="flex flex-col gap-4 w-full bg-gray-200 border-2">
          <ul className={`flex justify-between w-full`}>
            {[
              {
                label: "교통정보",
                value: "transport",
              },
              {
                label: "인근정보",
                value: "nearby",
              },
              {
                label: "관련 콘텐츠",
                value: "content",
              },
            ].map((item) => (
              <li
                className={`px-4 py-3 body-hak flex-1 text-center cursor-pointer transition-all duration-200  active:scale-95 ${
                  activeTab === item.value
                    ? "text-black bg-white border-b-[4px] border-b-black"
                    : "bg-gray-200 text-secondary-100 border-b-[1px] border-b-gray-100"
                } `}
                onClick={() => setActiveTab(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* 탭 콘텐츠 */}
          <div className="flex-1 w-full">
            <SwitchCase
              value={activeTab}
              case={{
                transport: (
                  <TransportSection performanceId={Number(performanceId)} />
                ),
                content: (
                  <ContentSection performanceId={Number(performanceId)} />
                ),
                nearby: <NearbySection />,
              }}
            />
          </div>
        </div>
      </div>

      <nav className="fixed flex-row bottom-0 px-5 left-0 gap-3 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex items-center justify-center shadow-[0_-0px_20px_rgba(0,0,0,0.25)]">
        <ButtonChip
          onClick={() => {
            if (performanceDetail?.isLike) {
              removeWishlistMutation(Number(performanceId));
            } else {
              addWishlistMutation({ performanceId: Number(performanceId) });
            }
          }}
          isActive={performanceDetail?.isLike || false}
        >
          보고싶어요
        </ButtonChip>

        <ButtonChip
          onClick={() => {}}
          isActive={performanceDetail?.isView || false}
        >
          봤어요
        </ButtonChip>
      </nav>
    </div>
  );
};
