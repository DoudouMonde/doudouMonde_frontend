import { NearbyFacility } from "@/domains/performance/types";
import { useNearbyFacilitiesQuery } from "@/domains/performance/queries";

// 카카오맵 아이콘 컴포넌트
const KakaoMapIcon = ({ facility }: { facility: NearbyFacility }) => {
  const handleKakaoMapClick = () => {
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

    const lat = facility.latitude;
    const lng = facility.longitude;

    const schemeUrl = `kakaomap://look?p=${lat},${lng}`;
    const webUrl = `https://m.map.kakao.com/scheme/look?p=${lat},${lng}`;

    if (isMobile) {
      window.location.href = schemeUrl;
      setTimeout(() => {
        window.location.replace(webUrl);
      }, 400);
    } else {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="w-[18px] h-[18px] cursor-pointer"
      onClick={handleKakaoMapClick}
    >
      <img
        src="/assets/icons/kakao_map_icon.svg"
        alt="카카오맵"
        className="w-full h-full"
      />
    </div>
  );
};

// 개별 장소 아이템 컴포넌트
const PlaceItem = ({ facility }: { facility: NearbyFacility }) => (
  <li className="flex items-center justify-between px-0 py-2 min-h-[32px]">
    <div className="flex flex-1 gap-2 justify-start items-center">
      {/* 장소명 */}
      <p className="text-black body-noto">{facility.name}</p>

      {/* 카카오맵 아이콘 */}
      <KakaoMapIcon facility={facility} />
    </div>
  </li>
);

// 섹션 컴포넌트
const Section = ({
  title,
  facilities,
}: {
  title: string;
  facilities: NearbyFacility[];
}) => (
  <div className="pb-6">
    <p className="p-4 text-black body-hak-b">{title}</p>
    <ul className="px-4 space-y-0 body-inter-r">
      {facilities.map((facility, index) => (
        <PlaceItem key={facility.id || index} facility={facility} />
      ))}
    </ul>
  </div>
);

interface NearbySectionProps {
  performanceId: number;
}

export const NearbySection = ({ performanceId }: NearbySectionProps) => {
  const {
    data: nearbyFacilities,
    isLoading,
    error,
  } = useNearbyFacilitiesQuery(performanceId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-0 p-4">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">인근시설 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-0 p-4">
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500">인근시설 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 p-4">
      {/* 가볼만한 키즈카페 섹션 */}
      <Section
        title="가볼만한 키즈카페"
        facilities={nearbyFacilities?.kidsCafes || []}
      />

      <Section
        title="아이와 가볼만한 맛집"
        facilities={nearbyFacilities?.restaurants || []}
      />
    </div>
  );
};
