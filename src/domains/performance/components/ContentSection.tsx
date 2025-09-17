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
  console.log("contentData", contentData);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="w-full">
        <p className="body-inter-b text-black mb-4 ml-[19px] ">
          관련 영어 콘텐츠
        </p>
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
        <h3 className="body-inter-r text-black mb-4 ml-[19px] ">
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
        <h3 className="text-black body-hak-b">관련 영어 콘텐츠</h3>
        <div className="flex items-center justify-center h-[200px] bg-gray-200 rounded-lg mx-[19px]">
          <div className="text-secondary-100">관련 콘텐츠가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <section className="p-4 w-full">
      {/* 섹션 제목 */}
      <p className="text-black body-hak-b">관련 영어 콘텐츠</p>

      {/* 콘텐츠 목록 */}
      <ul className="space-y-0">
        {contentData.contents.map((content: EnglishContent) => (
          <li
            key={content.id}
            onClick={() => handleVideoClick(content.youtubeUrl)}
            className="flex gap-4 items-start py-3 border-b-[0.5px] border-secondary-100"
          >
            {/* <div className="flex gap-4 items-start py-4"> */}
            {/* 썸네일 */}
            <div className="w-[166px] h-[93px] bg-gray-200  overflow-hidden transition-transform group-hover:scale-105">
              <img
                src={content.thumbnailUrl}
                alt={content.englishTitle}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/placeholder-video.png";
                }}
              />
            </div>
            {/* 제목 */}
            <div
              className="flex-1 min-w-0 cursor-pointer group"
              onClick={() => handleVideoClick(content.youtubeUrl)}
            >
              <h4 className="text-black transition-colors body-inter-sm">
                {content.englishTitle}
              </h4>
              <YoutubeIcon className="w-8 h-8" />
            </div>{" "}
          </li>
        ))}
      </ul>
    </section>
  );
};
