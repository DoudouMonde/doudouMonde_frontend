// import React from "react";
// import KakaoMap from "@/shared/components/KakaoMap";
// import { useCombinedLocationsQuery } from "@/domains/performance/queries";

// type Props = {
//   performanceId: number;
// };

// type TransportType = "car" | "transit" | "walk";

// const transportOptions: Array<{
//   type: TransportType;
//   label: string;
//   icon: string;
//   description: string;
// }> = [
//   {
//     type: "car",
//     label: "자동차",
//     icon: "🚗",
//     description: "빠르고 편리한 이동",
//   },
//   {
//     type: "transit",
//     label: "대중교통",
//     icon: "🚌",
//     description: "환경친화적 이동",
//   },
//   { type: "walk", label: "도보", icon: "🚶", description: "건강한 이동" },
// ];

// export const TransportSection = ({ performanceId }: Props) => {
//   // API에서 위치 정보 가져오기
//   const {
//     data: locationData,
//     isLoading,
//     error,
//   } = useCombinedLocationsQuery(performanceId);

//   if (!locationData) {
//     return null;
//   }

//   // API 데이터가 있으면 사용하고, 없으면 fallback 값 사용
//   const userLocation = locationData.memberLocation
//     ? {
//         lat: locationData.memberLocation.latitude,
//         lng: locationData.memberLocation.longitude,
//         address: locationData.memberLocation.address,
//       }
//     : {
//         lat: 37.4979, // 강남역 fallback
//         lng: 127.0276,
//         address: "강남역",
//       };

//   const venueLocation = locationData?.facilityLocation
//     ? {
//         lat: locationData.facilityLocation.latitude,
//         lng: locationData.facilityLocation.longitude,
//         address: locationData.facilityLocation.address,
//         name: locationData.facilityLocation.address,
//       }
//     : {
//         lat: 37.5125,
//         lng: 127.1025,
//         address: "롯데콘서트홀",
//         name: "롯데콘서트홀",
//       };

//   // 카카오맵 외부 링크로 이동
//   const openKakaoMapRoute = (transportType: TransportType) => {
//     // 교통수단별 카카오맵 URL 매핑
//     const transportModeMap = {
//       car: "car", // 자동차
//       transit: "publictransit", // 대중교통
//       walk: "walk", // 도보
//     };

//     const mode = transportModeMap[transportType];

//     // 모바일에서는 앱으로, 데스크톱에서는 웹으로 열기
//     const isMobile =
//       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//       );

//     if (isMobile) {
//       // 모바일에서는 카카오맵 앱으로 경로 안내 열기
//       const kakaoMapUrl = `kakaomap://route?sp=${userLocation.lat},${userLocation.lng}&ep=${venueLocation.lat},${venueLocation.lng}&by=${mode}`;

//       // 앱이 설치되어 있는지 확인하고 열기
//       const iframe = document.createElement("iframe");
//       iframe.style.display = "none";
//       iframe.src = kakaoMapUrl;
//       document.body.appendChild(iframe);

//       // 앱이 없을 경우를 대비해 웹 버전도 열기
//       setTimeout(() => {
//         const webUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
//           venueLocation.name
//         )}`;
//         window.open(webUrl, "_blank");
//         document.body.removeChild(iframe);
//       }, 2000);
//     } else {
//       // 데스크톱에서는 웹 버전으로 열기
//       const webUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
//         venueLocation.name
//       )}`;
//       window.open(webUrl, "_blank");
//     }
//   };

//   // 로딩 상태 처리
//   if (isLoading) {
//     return (
//       <div className="p-4 space-y-4">
//         <div className="mb-4">
//           <h3 className="mb-2 text-lg font-semibold text-primary-100">
//             🚗 교통 정보
//           </h3>
//           <p className="text-sm text-secondary-100">
//             위치 정보를 불러오는 중...
//           </p>
//         </div>
//         <div className="flex items-center justify-center h-[350px] bg-gray-200 rounded-lg">
//           <div className="text-secondary-100">로딩 중...</div>
//         </div>
//       </div>
//     );
//   }

//   // 에러 상태 처리
//   if (error) {
//     return (
//       <div className="p-4 space-y-4">
//         <div className="mb-4">
//           <h3 className="mb-2 text-lg font-semibold text-primary-100">
//             🚗 교통 정보
//           </h3>
//           <p className="text-sm text-red-500">
//             위치 정보를 불러올 수 없습니다.
//           </p>
//         </div>
//         <div className="flex items-center justify-center h-[350px] bg-gray-200 rounded-lg">
//           <div className="text-red-500">위치 정보 로딩 실패</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 space-y-4">
//       {/* 제목 */}
//       <div className="mb-4">
//         <p className="text-sm text-black body-hak-r bg-yellow-200 rounded-[10px] p-2">
//           {venueLocation.name}까지의 경로를 확인하세요
//         </p>
//       </div>

//       {/* 교통수단 선택 */}
//       <div className="mb-4">
//         <h4 className="mb-3 body-inter-r text-primary-100">교통수단 선택</h4>
//         <div className="grid grid-cols-3 gap-2">
//           {transportOptions.map((option) => (
//             <button
//               key={option.type}
//               onClick={() => {
//                 openKakaoMapRoute(option.type);
//               }}
//               className={`p-3 bg-gray-200 rounded-lg border-2 transition-all border-tertiary-100 text-secondary-100`}
//             >
//               <div className="text-center">
//                 <div className="mb-1 text-2xl">{option.icon}</div>
//                 <div className="text-xs font-medium">{option.label}</div>
//                 <div className="mt-1 text-xs text-secondary-100">
//                   {option.description}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 지도 영역 */}
//       <div className="overflow-hidden bg-gray-200 rounded-lg border border-tertiary-100">
//         <div className="p-3 border-b bg-beige-200 border-tertiary-100">
//           <h4 className="text-sm font-medium text-primary-100">📍 위치 정보</h4>
//         </div>
//         <div className="w-full h-[350px]">
//           <KakaoMap
//             width="100%"
//             height="350px"
//             lat={(userLocation.lat + venueLocation.lat) / 2} // 두 지점의 중간점
//             lng={(userLocation.lng + venueLocation.lng) / 2}
//             startLat={userLocation.lat}
//             startLng={userLocation.lng}
//             endLat={venueLocation.lat}
//             endLng={venueLocation.lng}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
