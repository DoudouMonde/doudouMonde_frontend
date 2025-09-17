import { NearbyFacility } from "@/domains/performance/types";
import { useNearbyFacilitiesQuery } from "@/domains/performance/queries";

// 카카오맵 아이콘 컴포넌트
const KakaoMapIcon = ({ placeName }: { placeName: string }) => {
  const handleKakaoMapClick = () => {
    const encodedPlaceName = encodeURIComponent(placeName);
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedPlaceName}`;
    window.open(kakaoMapUrl, "_blank");
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
      <p className="text-black body-noto">{facility.facilityName}</p>

      {/* 카카오맵 아이콘 */}
      <KakaoMapIcon placeName={facility.facilityName} />
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
        <PlaceItem key={facility.facilityId || index} facility={facility} />
      ))}
    </ul>
  </div>
);

interface NearbySectionProps {
  performanceId: number;
}

export const NearbySection = ({ performanceId }: NearbySectionProps) => {
  const {
    data: nearbyFacilitiesData,
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

  if (!nearbyFacilitiesData?.facilities?.length) {
    return (
      <div className="flex flex-col gap-0 p-4">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">인근시설 정보가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 시설 타입별로 분류
  const kidsCafes = nearbyFacilitiesData.facilities.filter(
    (facility) => facility.facilityType === "KIDS_CAFE"
  );
  const restaurants = nearbyFacilitiesData.facilities.filter(
    (facility) => facility.facilityType === "RESTAURANT"
  );

  return (
    <div className="flex flex-col gap-0 p-4">
      {/* 가볼만한 키즈카페 섹션 */}
      {kidsCafes.length > 0 && (
        <>
          <Section title="가볼만한 키즈카페" facilities={kidsCafes} />
          {restaurants.length > 0 && <hr className="border-secondary-100/30" />}
        </>
      )}

      {/* 아이와 가볼만한 맛집 섹션 */}
      {restaurants.length > 0 && (
        <Section title="아이와 가볼만한 맛집" facilities={restaurants} />
      )}
    </div>
  );
};
