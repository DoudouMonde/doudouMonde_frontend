import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";
import { signupApi } from "@/domains/auth/apis/signupApi";
import { SignupRequest, ChildRequest } from "@/domains/auth/types/signup";
import { AddressSearchInput } from "@/shared/components";
import { Background } from "@/shared/components/Background";
import { LocationConsentModal } from "@/shared/components/Modal/LocationConsentModal";
import { TopBar } from "@/shared/components/TopBar";
import { SaveButton } from "@/shared/components/Button/SaveButton";
import {
  MainContainer,
  PageContainer,
  ContentSection,
} from "@/shared/components/Layout";

type Coords = { latitude: number | null; longitude: number | null };

export function RegionRegistrationPage() {
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [coords, setCoords] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(true); // 위치 동의 모달
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태

  const regions = [
    { value: "SEOUL", label: "서울" },
    { value: "GYEONGGI", label: "경기도" },
    { value: "GANGWON", label: "강원도" },
    { value: "CHUNGCHEONG", label: "충청도" },
    { value: "JEOLLA", label: "전라도" },
    { value: "GYEONGSANG", label: "경상도" },
    { value: "JEJU", label: "제주도" },
  ];

  const handleRegionSelect = (region: string) => setSelectedRegion(region);

  // ✅ 카카오 역지오코딩: road_address 우선, 없으면 address 사용
  async function reverseGeocodeKakao(lat: number, lng: number) {
    setIsLoadingAddress(true);

    // ⚠️ 프론트에서 REST 키를 쓰면 노출 위험. 가능하면 백엔드 프록시(/api/geocode/reverse)로 호출 권장.
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    if (!apiKey) {
      console.warn("주소 자동완성을 사용할 수 없습니다. 직접 입력해주세요.");
      setIsLoadingAddress(false);
      return;
    }

    try {
      const resp = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
        { headers: { Authorization: `KakaoAK ${apiKey}` } }
      );
      if (!resp.ok) throw new Error("역지오코딩 실패");

      const data = await resp.json();
      const doc = data?.documents?.[0];
      const addr = doc?.road_address ?? doc?.address;
      if (!addr) throw new Error("주소 없음");

      const regionName: string = addr.region_1depth_name; // ex) 서울특별시
      const detail: string =
        doc?.road_address?.address_name ?? doc?.address?.address_name ?? "";

      setSelectedRegion(regionName);
      setDetailedAddress(detail);
    } catch (e) {
      console.error("주소 정보를 가져올 수 없습니다:", e);
    } finally {
      setIsLoadingAddress(false);
    }
  }

  // ✅ 현재 위치 한 번에 가져와서 주소까지 세팅
  async function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      console.warn("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      return;
    }
    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ latitude: lat, longitude: lng });
        await reverseGeocodeKakao(lat, lng);
        setIsLocating(false);
        setShowLocationModal(false); // 성공 시 모달 닫기

        // 주소 변환이 실패했을 경우 기본값 사용
      },
      (err) => {
        console.error("위치 정보 가져오기 실패:", err);
        // 권한 거부 / 타임아웃 등
        const message =
          err.code === err.PERMISSION_DENIED
            ? "위치 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요."
            : "위치 정보를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.";
        console.warn(message);
        setIsLocating(false);
        // 위치 정보를 가져올 수 없어도 계속 진행
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      }
    );
  }

  // 모달에서 위치 동의 버튼 클릭
  function handleLocationConsent() {
    setShowLocationModal(false);
    handleUseCurrentLocation();
  }

  // 모달에서 직접 입력하기 버튼 클릭
  function handleManualInput() {
    setShowLocationModal(false);
    // 수동 입력 모드로 전환
  }
  // 내비게이션

  async function handleNext() {
    if (!selectedRegion) return;

    setIsSubmitting(true);

    try {
      // localStorage에서 아이 정보 가져오기
      const savedChildData = localStorage.getItem("childData");
      if (!savedChildData) {
        throw new Error("아이 정보를 찾을 수 없습니다.");
      }

      const childData: ChildRequest = JSON.parse(savedChildData);

      // 실제 위치 정보 사용 (없으면 기본값)
      const longitude = coords.longitude || 127.0276; // 서울 강남 기본값
      const latitude = coords.latitude || 37.4979; // 서울 강남 기본값
      const address = detailedAddress.trim() || `${selectedRegion} 지역`;

      alert(
        `📍 사용할 위치 정보: ${JSON.stringify({
          longitude,
          latitude,
          address,
        })}`
      );
      console.log("📍 사용할 위치 정보:", { longitude, latitude, address });

      // 위치 정보와 아이 정보를 함께 백엔드에 전송
      const signupData: SignupRequest = {
        longitude,
        latitude,
        address,
        sido: selectedRegion,
        children: [childData],
      };

      const response = await signupApi.signup(signupData);

      // 성공 시 localStorage 정리 및 홈 페이지로 이동
      localStorage.removeItem("childData");
      navigate(PATH.HOME);
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <Background />
      {/* Location Consent Modal */}
      {showLocationModal && (
        <LocationConsentModal
          open={showLocationModal}
          onClose={() => setShowLocationModal(false)}
          onConsent={handleLocationConsent}
          onManual={handleManualInput}
          isLocating={isLocating}
          isLoadingAddress={isLoadingAddress}
        />
      )}
      <MainContainer>
        {/* Header */}
        <TopBar title="지역 등록" />
        {/* 메인 컨텐츠 */}
        <ContentSection>
          <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-6 pb-8 w-full h-auto">
            <div className="flex flex-col gap-2">
              <p className="title-hak">지역 선택</p>
              <p className="subtitle-b text-secondary-100">
                우리 지역의 인기공연을 추천받을 수 있어요
              </p>

              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                  {isLoadingAddress && (
                    <span className="ml-2 text-xs text-green-600">
                      자동으로 불러오는 중…
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(e) => handleRegionSelect(e.target.value)}
                    className="   w-full
                  h-[35px]
                  bg-white/50
                  border-[0.3px]
                  border-[#D9D9D9]
                  rounded-[20px]
                  pl-[16px]
                  pr-4
                  font-inter
                  text-xs
                  font-normal
                  text-gray-900
                  placeholder:text-[#8C8C8C]
                  placeholder:tracking-[-0.03em]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-100/30
                  focus:border-green-100
                  transition-all
                  duration-200
                  min-w-0
                  appearance-none
                  "
                    // className="p-4 pr-10 w-full bg-gray-200 rounded-lg border appearance-none border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
                  >
                    <option value="" disabled>
                      지역을 선택해주세요
                    </option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute inset-y-0 right-0 items-center pr-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-secondary-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <p className="title-hak">상세 주소</p>
              <p className="subtitle-b text-secondary-100">
                공연장까지의 경로 정보를 받을 수 있어요{" "}
              </p>
              <AddressSearchInput />
            </div>
          </div>
        </ContentSection>
      </MainContainer>

      {/* Next */}
      <SaveButton
        onClick={handleNext}
        disabled={!selectedRegion || isSubmitting}
        text={"확인"}
      />
    </PageContainer>
  );
}
