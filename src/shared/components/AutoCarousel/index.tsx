import React, { useState, useEffect, useRef } from "react";
import { PerformanceItem } from "@/domains/performance/types";
import { Genre } from "@/shared/types";
import { getSidoLabel } from "@/shared/services";
import { GradientOverlay } from "../GradientOverlay";

interface AutoCarouselProps {
  performances: PerformanceItem[];
  onPerformanceClick: (performanceId: number) => void;
  autoPlayInterval?: number; // 자동 재생 간격 (밀리초)
  showIndicators?: boolean; // 페이지 인디케이터 표시 여부
  genre: Genre;
}

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  performances,
  onPerformanceClick,
  autoPlayInterval = 2000,
  genre,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 자동 재생 로직
  useEffect(() => {
    if (!isAutoPlaying || performances.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % performances.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, performances.length, autoPlayInterval]);

  // 현재 슬라이드 표시 업데이트
  useEffect(() => {
    // 스크롤 대신 transform을 사용하여 슬라이드 전환
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.offsetWidth;
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);

  // 마우스 호버 시 자동 재생 일시정지
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // 터치/드래그 이벤트 핸들러 (필요시 구현)
  const handleTouchStart = () => {
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = () => {
    // 3초 후 자동 재생 재개
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  // 인디케이터 클릭 핸들러
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    // 기존 타이머 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 3초 후 자동 재생 재개
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  if (performances.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* 캐러셀 컨테이너 */}
      <div className="relative w-full">
        <div className="overflow-hidden relative w-full">
          <div
            ref={scrollContainerRef}
            className="flex w-full transition-transform duration-500 ease-in-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ width: `${performances.length * 100}%` }}
          >
            {performances.map((performance) => (
              <div
                key={performance.performanceId}
                className="flex-shrink-0 cursor-pointer"
                style={{ width: `${100 / performances.length}%` }}
                onClick={() => onPerformanceClick(performance.performanceId)}
              >
                <div className="relative w-full h-[482px] rounded-[20px] overflow-hidden">
                  {/* 포스터 이미지 */}
                  <img
                    src={performance.posterUrl}
                    alt={performance.performanceName}
                    className="object-cover w-full h-full"
                  />

                  {/* 그라데이션 오버레이 - 피그마 디자인 컴포넌트 사용 */}
                  <GradientOverlay variant="poster" />

                  {/* 페이지 인디케이터 */}
                  <div className="absolute top-4 right-4 border-2 border-red-100">
                    <div className="flex items-center justify-center w-[67px] h-[30px] bg-gray-100 rounded-[60px]">
                      <p className="text-base font-bold text-secondary-100">
                        {currentIndex + 1}/{performances.length}
                      </p>
                    </div>
                  </div>

                  {/* 공연 정보 */}
                  <div className="absolute right-4 bottom-4 left-4 text-white">
                    <p className="mb-2 text-xs font-bold text-white">
                      {genre} · {getSidoLabel(performance.sido)}
                    </p>
                    <h3 className="text-xl font-semibold leading-tight text-white">
                      {performance.performanceName}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 인디케이터 */}
        {performances.length > 1 && (
          <div className="flex gap-2 justify-center mt-4">
            {performances.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-black w-6" : "bg-gray-300"
                }`}
                aria-label={`${index + 1}번째 슬라이드로 이동`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
