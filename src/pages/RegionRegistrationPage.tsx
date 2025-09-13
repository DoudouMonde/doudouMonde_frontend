import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";
import { signupApi } from "@/domains/auth/apis/signupApi";
import { SignupRequest, SIDO_MAPPING } from "@/domains/auth/types/signup";

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
  const [locationError, setLocationError] = useState("");
  const [showManual, setShowManual] = useState(false); // 수동 입력 토글
  const [showLocationModal, setShowLocationModal] = useState(true); // 위치 동의 모달
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태

  const regions = [
    "서울특별시",
    "경기도",
    "전라북도",
    "전라남도",
    "충청북도",
    "충청남도",
    "경상북도",
    "경상남도",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
  ];

  const handleRegionSelect = (region: string) => setSelectedRegion(region);

  // ✅ 카카오 역지오코딩: road_address 우선, 없으면 address 사용
  async function reverseGeocodeKakao(lat: number, lng: number) {
    setIsLoadingAddress(true);
    setLocationError("");

    // ⚠️ 프론트에서 REST 키를 쓰면 노출 위험. 가능하면 백엔드 프록시(/api/geocode/reverse)로 호출 권장.
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    if (!apiKey) {
      setLocationError(
        "주소 자동완성을 사용할 수 없습니다. 직접 입력해주세요."
      );
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
      console.error(e);
      setLocationError(
        "주소 정보를 가져올 수 없습니다. 수동으로 입력해주세요."
      );
    } finally {
      setIsLoadingAddress(false);
    }
  }

  // ✅ 현재 위치 한 번에 가져와서 주소까지 세팅
  async function handleUseCurrentLocation() {
    if (!("geolocation" in navigator)) {
      setLocationError("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      return;
    }
    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ latitude: lat, longitude: lng });
        await reverseGeocodeKakao(lat, lng);
        setIsLocating(false);
        setShowLocationModal(false); // 성공 시 모달 닫기

        // 주소 변환이 실패했을 경우 수동 입력 폼 표시
        setTimeout(() => {
          if (!selectedRegion || !detailedAddress) {
            setShowManual(true);
          }
        }, 100);
      },
      (err) => {
        console.error(err);
        // 권한 거부 / 타임아웃 등
        const message =
          err.code === err.PERMISSION_DENIED
            ? "위치 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요."
            : "위치 정보를 가져오지 못했습니다. 잠시 후 다시 시도해주세요.";
        setLocationError(message);
        setIsLocating(false);
        // 필요 시 수동 입력 노출
        setShowManual(true);
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
    setShowManual(true);
  }

  async function handleNext() {
    if (!selectedRegion || !detailedAddress.trim()) return;

    setIsSubmitting(true);

    try {
      // 위치 정보만 전송 (아이 정보는 ChildRegistrationPage에서 처리)
      const signupData: SignupRequest = {
        longitude: coords.longitude || 0,
        latitude: coords.latitude || 0,
        address: detailedAddress,
        sido:
          SIDO_MAPPING[selectedRegion as keyof typeof SIDO_MAPPING] || "SEOUL",
        children: [], // 빈 배열로 전송, 실제 아이 정보는 ChildRegistrationPage에서 추가
      };

      const response = await signupApi.signup(signupData);
      console.log("회원가입 성공:", response);

      // 위치 정보를 localStorage에 저장 (ChildRegistrationPage에서 사용)
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          longitude: coords.longitude,
          latitude: coords.latitude,
          address: detailedAddress,
          sido:
            SIDO_MAPPING[selectedRegion as keyof typeof SIDO_MAPPING] ||
            "SEOUL",
        })
      );

      // 성공 시 다음 페이지로 이동
      navigate(PATH.CHILD_REGISTRATION);
    } catch (error) {
      console.error("회원가입 실패:", error);
      setLocationError("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Location Consent Modal */}
      {showLocationModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          <div className="p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl shadow-xl">
            <div className="mb-6 text-center">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  자동 위치 등록
                </h2>
                <p className="text-sm text-gray-600">
                  현재 위치를 기반으로 인기 공연과 <br /> 공연장까지의 소요시간
                  정보를 제공해드려요.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleLocationConsent}
                disabled={isLocating || isLoadingAddress}
                className={`w-full py-4 rounded-xl font-semibold text-gray-200 transition-colors ${
                  isLocating || isLoadingAddress
                    ? "bg-gray-400"
                    : "bg-green-200 hover:bg-green-600"
                }`}
              >
                {isLocating
                  ? "현재 위치 확인 중…"
                  : isLoadingAddress
                  ? "주소 불러오는 중…"
                  : "위치 정보 동의"}
              </button>

              <button
                onClick={handleManualInput}
                className="py-4 w-full font-semibold text-gray-700 bg-gray-100 rounded-xl transition-colors hover:bg-gray-200"
              >
                직접 입력하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full transition-colors hover:bg-gray-100"
          aria-label="뒤로가기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">지역 선택</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* 위치 정보 수집 완료 시 표시 */}
        {coords.latitude && coords.longitude && (
          <div className="p-4 mb-6 bg-green-50 rounded-lg border border-green-200">
            <div className="flex gap-2 items-center mb-2">
              <svg
                className="w-5 h-5 text-green-100"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-green-100">
                위치 정보 수집 완료
              </span>
            </div>
            <div className="text-xs text-gray-600">
              위도: {coords.latitude.toFixed(6)} / 경도:{" "}
              {coords.longitude.toFixed(6)}
            </div>
            {!selectedRegion && !detailedAddress && (
              <button
                className="mt-2 text-xs text-gray-600 underline hover:text-gray-800"
                onClick={() => setShowManual(true)}
              >
                주소를 수동으로 입력하세요
              </button>
            )}
          </div>
        )}

        {/* 에러 메시지 */}
        {locationError && (
          <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
            {locationError}
            <button
              className="ml-2 text-gray-700 underline"
              onClick={() => setShowManual(true)}
            >
              수동으로 입력
            </button>
          </div>
        )}

        {/* 자동으로 채워진 결과 미리보기 */}
        {(selectedRegion || detailedAddress) && (
          <div className="p-4 mb-6 bg-green-50 rounded-lg border border-green-200">
            <div className="mb-1 text-sm font-medium text-green-800">
              자동 입력 완료
            </div>
            <div className="text-sm text-gray-800">
              지역: {selectedRegion || "-"}
              <br />
              주소: {detailedAddress || "-"}
            </div>
            <button
              className="mt-2 text-xs text-gray-600 underline"
              onClick={() => setShowManual(true)}
            >
              수정하기
            </button>
          </div>
        )}

        {/* 수동 입력 (기본은 감춤, 오류나 수정 시 표시) */}
        {showManual && (
          <>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                지역 선택{" "}
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
                  className="p-4 pr-10 w-full bg-white rounded-lg border appearance-none border-secondary-100 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
                >
                  <option value="" disabled>
                    지역을 선택해주세요
                  </option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="flex absolute inset-y-0 right-0 items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
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

            <div className="mb-8">
              <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                상세주소 입력
              </label>
              <input
                type="text"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="예: 강남구 테헤란로 123, ○○아파트"
                className="p-4 w-full bg-white rounded-lg border border-secondary-100 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
              />
            </div>
          </>
        )}

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={!selectedRegion || !detailedAddress.trim() || isSubmitting}
          className={`w-full py-4 rounded-[12px] font-semibold transition-colors border
             ${
               selectedRegion && detailedAddress.trim() && !isSubmitting
                 ? "bg-green-200 hover:bg-green-600 text-gray-200"
                 : "bg-secondary-100 text-gray-200 cursor-not-allowed"
             }`}
        >
          {isSubmitting ? "처리 중..." : "확인"}
        </button>
      </div>
    </div>
  );
}
