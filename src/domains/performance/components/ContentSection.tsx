import { YoutubeIcon } from "@/assets/icons";

// 유튜브 썸네일 URL 생성 함수
const getYoutubeThumbnail = (
  videoId: string,
  quality:
    | "maxresdefault"
    | "hqdefault"
    | "mqdefault"
    | "default" = "maxresdefault"
) => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

// 유튜브 영상 URL 생성 함수
const getYoutubeUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

// 유튜브 영상으로 이동하는 함수
const handleVideoClick = (videoId: string) => {
  const youtubeUrl = getYoutubeUrl(videoId);
  window.open(youtubeUrl, "_blank", "noopener,noreferrer");
};

export const ContentSection = () => {
  const contentData = [
    {
      id: 1,
      title: "[Twinkle Catch! Teenie\nping]💎Opening Song💘",
      videoId: "dQw4w9WgXcQ", // 실제 유튜브 비디오 ID로 교체
      thumbnail: getYoutubeThumbnail("dQw4w9WgXcQ"),
    },
    {
      id: 2,
      title: "[Twinkle Catch! Teenie\nping] 💎Ep.01 TWIN...",
      videoId: "jNQXAC9IVRw", // 실제 유튜브 비디오 ID로 교체
      thumbnail: getYoutubeThumbnail("jNQXAC9IVRw"),
    },
  ];

  return (
    <div className="w-full">
      {/* 섹션 제목 */}
      <h3 className="text-base font-semibold text-black mb-4 ml-[19px] font-hakgyo">
        관련 영어 콘텐츠
      </h3>

      {/* 콘텐츠 목록 */}
      <div className="space-y-0">
        {contentData.map((content, index) => (
          <div key={content.id}>
            <div className="flex items-start gap-4 px-[19px] py-4">
              {/* 썸네일 */}
              <div
                className="relative flex-shrink-0 cursor-pointer group"
                onClick={() => handleVideoClick(content.videoId)}
              >
                <div className="w-[166px] h-[93px] bg-gray-200 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // 썸네일 로드 실패 시 기본 이미지로 대체
                      e.currentTarget.src = getYoutubeThumbnail(
                        content.videoId,
                        "hqdefault"
                      );
                    }}
                  />
                </div>
                {/* Youtube 아이콘 */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity group-hover:opacity-80">
                  <YoutubeIcon className="w-8 h-8" />
                </div>
              </div>

              {/* 제목 */}
              <div
                className="flex-1 min-w-0 cursor-pointer group"
                onClick={() => handleVideoClick(content.videoId)}
              >
                <h4 className="text-base text-black leading-[1.21] tracking-[-0.04em] font-inter whitespace-pre-line group-hover:text-gray-600 transition-colors">
                  {content.title}
                </h4>
              </div>
            </div>

            {/* 구분선 (마지막 아이템 제외) */}
            {index < contentData.length - 1 && (
              <div className="w-full h-[0.2px] bg-black mx-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
