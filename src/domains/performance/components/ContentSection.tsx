import { YoutubeIcon } from "@/assets/icons";
import { useEnglishContentsQuery } from "@/domains/performance/queries";
import { EnglishContent } from "@/domains/performance/types";

type Props = {
  performanceId: number;
};

// 유튜브 영상으로 이동하는 함수
const handleVideoClick = (youtubeUrl: string) => {
  window.open(youtubeUrl, "_blank", "noopener,noreferrer");
};

export const ContentSection = ({ performanceId }: Props) => {
  // API에서 영어 콘텐츠 가져오기
  const {
    data: contentData,
    isLoading,
    error,
  } = useEnglishContentsQuery(performanceId);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="w-full">
        <h3 className="text-base font-semibold text-black mb-4 ml-[19px] font-hakgyo">
          관련 영어 콘텐츠
        </h3>
        <div className="flex items-center justify-center h-[200px] bg-gray-200 rounded-lg mx-[19px]">
          <div className="text-secondary-100">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="w-full">
        <h3 className="text-base font-semibold text-black mb-4 ml-[19px] font-hakgyo">
          관련 영어 콘텐츠
        </h3>
        <div className="flex items-center justify-center h-[200px] bg-gray-200 rounded-lg mx-[19px]">
          <div className="text-red-500">콘텐츠를 불러올 수 없습니다.</div>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!contentData?.contents || contentData.contents.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-base font-semibold text-black mb-4 ml-[19px] font-hakgyo">
          관련 영어 콘텐츠
        </h3>
        <div className="flex items-center justify-center h-[200px] bg-gray-200 rounded-lg mx-[19px]">
          <div className="text-secondary-100">관련 콘텐츠가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 섹션 제목 */}
      <h3 className="text-base font-semibold text-black mb-4 ml-[19px] font-hakgyo">
        관련 영어 콘텐츠
      </h3>

      {/* 콘텐츠 목록 */}
      <div className="space-y-0">
        {contentData.contents.map((content: EnglishContent, index: number) => (
          <div key={content.id}>
            <div className="flex items-start gap-4 px-[19px] py-4">
              {/* 썸네일 */}
              <div
                className="relative flex-shrink-0 cursor-pointer group"
                onClick={() => handleVideoClick(content.youtubeUrl)}
              >
                <div className="w-[166px] h-[93px] bg-gray-200 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                  <img
                    src={content.thumbnailUrl}
                    alt={content.englishTitle}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // 썸네일 로드 실패 시 기본 이미지로 대체
                      e.currentTarget.src =
                        "/assets/images/placeholder-video.png";
                    }}
                  />
                </div>
                {/* Youtube 아이콘 */}
                <div className="absolute top-1/2 left-1/2 transition-opacity transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-80">
                  <YoutubeIcon className="w-8 h-8" />
                </div>
              </div>

              {/* 제목 */}
              <div
                className="flex-1 min-w-0 cursor-pointer group"
                onClick={() => handleVideoClick(content.youtubeUrl)}
              >
                <h4 className="text-base text-black leading-[1.21] tracking-[-0.04em] font-inter whitespace-pre-line group-hover:text-gray-600 transition-colors">
                  {content.englishTitle}
                </h4>
              </div>
            </div>

            {/* 구분선 (마지막 아이템 제외) */}
            {index < contentData.contents.length - 1 && (
              <div className="w-full h-[0.2px] bg-black mx-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
