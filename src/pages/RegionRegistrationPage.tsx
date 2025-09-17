import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";
import { signupApi } from "@/domains/auth/apis/signupApi";
import { SignupRequest, ChildRequest } from "@/domains/auth/types/signup";
import BackIcon from "@/assets/icons/Back";
import { AddressSearchInput } from "@/shared/components";

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
  const handleBackClick = () => navigate(-1);

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
      console.log("📋 저장된 아이 정보:", childData);
      console.log("🎯 아이 성향들:", childData.traits);
      console.log("🎭 아이 장르들:", childData.genres);

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

      console.log("🚀 백엔드로 전송할 데이터:", signupData);
      console.log("🌐 API 엔드포인트: POST /auth/signup");
      console.log("📊 상세 요청 데이터 분석:");
      console.log("  - longitude:", signupData.longitude);
      console.log("  - latitude:", signupData.latitude);
      console.log("  - address:", signupData.address);
      console.log("  - sido:", signupData.sido);
      console.log("  - children 개수:", signupData.children.length);
      console.log("  - 첫 번째 아이 정보:", signupData.children[0]);
      if (signupData.children[0]) {
        console.log("    - name:", signupData.children[0].name);
        console.log("    - birthday:", signupData.children[0].birthday);
        console.log("    - gender:", signupData.children[0].gender);
        console.log("    - profile:", signupData.children[0].profile);
        console.log("    - traits:", signupData.children[0].traits);
        console.log("    - genres:", signupData.children[0].genres);
      }

      const response = await signupApi.signup(signupData);
      console.log("✅ 회원가입 성공:", response);

      // 성공 시 localStorage 정리 및 홈 페이지로 이동
      localStorage.removeItem("childData");
      navigate(PATH.HOME);
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);
      console.error("🔍 에러 상세 정보:");
      console.error("  - 에러 타입:", typeof error);
      console.error("  - 에러 메시지:", error.message);
      console.error("  - 에러 코드:", error.code);

      if (error.response) {
        console.error("  - 응답 상태:", error.response.status);
        console.error("  - 응답 상태 텍스트:", error.response.statusText);
        console.error("  - 응답 데이터:", error.response.data);
        console.error("  - 응답 헤더:", error.response.headers);

        // 백엔드에서 보낸 에러 메시지가 있는지 확인
        if (error.response.data && typeof error.response.data === "object") {
          console.error(
            "  - 백엔드 에러 메시지:",
            error.response.data.message ||
              error.response.data.error ||
              "메시지 없음"
          );
          console.error("  - 백엔드 에러 상세:", error.response.data);
        }
      }

      if (error.request) {
        console.error("  - 요청 정보:", error.request);
        console.error("  - 요청 URL:", error.request.url);
        console.error("  - 요청 메서드:", error.request.method);
      }

      console.error("  - 요청 설정:", error.config);
      console.error("  - 요청 URL (config):", error.config?.url);
      console.error("  - 요청 baseURL:", error.config?.baseURL);
      console.error("  - 요청 메서드 (config):", error.config?.method);
      console.error("  - 요청 헤더:", error.config?.headers);

      // 네트워크 에러인지 확인
      if (
        error.code === "NETWORK_ERROR" ||
        error.message.includes("Network Error")
      ) {
        console.error("🌐 네트워크 에러: 서버에 연결할 수 없습니다.");
        console.error("🔧 확인사항:");
        console.error("  - 백엔드 서버가 실행 중인지 확인");
        console.error("  - CORS 설정 확인");
        console.error("  - API 엔드포인트 URL 확인");
      }

      // 타임아웃 에러인지 확인
      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        console.error("⏰ 타임아웃 에러: 요청 시간이 초과되었습니다.");
      }

      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex relative flex-col w-full min-h-screen">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage:
            "url('/assets/images/background/background_afternoon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          opacity: 0.7,
        }}
      />
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
      <div
        className="fixed top-0 right-0 left-0 z-20 px-6 pb-2 h-[60px] bg-gray-200/70 shadow-sm"
        style={{ paddingTop: `max(1rem, env(safe-area-inset-top))` }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-black title-hak">지역 등록</div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pt-24">
        {/* 위치 정보 수집 완료 시 표시 */}
        {/* {/* {coords.latitude && coords.longitude && (
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
                onClick={() => setShowLocationModal(false)}
              >
                주소를 수동으로 입력하세요
              </button>
            )}
          </div>
        )} */}

        {/* 수동 입력 (기본은 감춤, 오류나 수정 시 표시) */}

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
                  className="p-4 pr-10 w-full bg-gray-200 rounded-lg border appearance-none border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
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

            {/* 상세 주소 입력 (선택사항) */}
            {/* <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700 body-inter-r">
                상세 주소 (선택사항)
                {isLoadingAddress && (
                  <span className="ml-2 text-xs text-green-600">
                    주소를 불러오는 중...
                  </span>
                )}
              </label>
              <input
                type="text"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="예: 강남구 테헤란로 123, ○○아파트"
                className="p-4 w-full bg-gray-200 rounded-lg border border-secondary-100/30 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-200"
              />
            </div> */}
            <AddressSearchInput />
          </div>
          <div className="flex flex-col gap-2 w-full"></div>

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={!selectedRegion || isSubmitting}
            className={`w-full rounded-[20px] font-semibold transition-colors h-12
              ${
                selectedRegion && !isSubmitting
                  ? "bg-green-200 hover:bg-green-600 text-gray-200"
                  : "bg-secondary-100 text-gray-200 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "처리 중..." : "확인"}
          </button>
        </div>

        <>
          {/* <div className="mb-8">
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
          </div> */}
        </>
      </div>
    </div>
  );
}
