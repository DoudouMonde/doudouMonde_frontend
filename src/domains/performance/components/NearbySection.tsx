import { NearbyInfo, NearbyPlace } from "@/domains/performance/types";

// 더미 데이터
const nearbyInfo: NearbyInfo = {
  restaurants: [
    { name: "맘스터치 강남점", distance: "", hasHighChair: false },
    { name: "떡볶이 천국", distance: "", hasHighChair: false },
    { name: "키즈 레스토랑", distance: "", hasHighChair: false },
  ],
  kidsCafes: [
    { name: "점프점프 키즈카페", distance: "", hasHighChair: false },
    { name: "플레이그라운드", distance: "", hasHighChair: false },
    { name: "코코몽 키즈카페", distance: "", hasHighChair: false },
  ],
};

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
const PlaceItem = ({ place }: { place: NearbyPlace }) => (
  <li className="flex items-center justify-between px-0 py-2 border-b-[0.5px] border-secondary-100 min-h-[32px]">
    <div className="flex flex-1 items-center justify-between">
      {/* 장소명 */}
      <p className="text-black body-noto">{place.name}</p>

      {/* 카카오맵 아이콘 */}
      <KakaoMapIcon placeName={place.name} />
    </div>
  </li>
);

// 섹션 컴포넌트
const Section = ({
  title,
  places,
}: {
  title: string;
  places: NearbyPlace[];
}) => (
  <div className="pb-6">
    <p className="pb-4 text-black body-hak-b">{title}</p>
    <ul className="px-4 space-y-0">
      {places.map((place, index) => (
        <PlaceItem key={index} place={place} />
      ))}
    </ul>
  </div>
);

export const NearbySection = () => {
  return (
    <div className="p-4 flex flex-col gap-0">
      {/* 가볼만한 키즈카페 섹션 */}
      <Section title="가볼만한 키즈카페" places={nearbyInfo.kidsCafes} />
      {/* 아이와 가볼만한 맛집 섹션 */}
      <Section title="아이와 가볼만한 맛집" places={nearbyInfo.restaurants} />
    </div>
  );
};
