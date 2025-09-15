import React, { useState, useEffect, useRef } from "react";
import { PerformanceItem } from "@/domains/performance/types";
import { Genre } from "@/shared/types";
import { getGenreLabel, getSidoLabel } from "@/shared/services";

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
  const [currentIndex, setCurrentIndex] = useState(1); // 가상 포스터를 위해 1부터 시작
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  // 무한 캐러셀을 위한 가상 포스터 배열 생성
  const extendedPerformances = [
    performances[performances.length - 1], // 마지막 포스터를 맨 앞에 추가
    ...performances,
    performances[0], // 첫 번째 포스터를 맨 뒤에 추가
  ];

  // 자동 재생 로직
  useEffect(() => {
    if (!isAutoPlaying || performances.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 256; // gap + li폭
      container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex]);

  // 무한 캐러셀을 위한 인덱스 조정
  useEffect(() => {
    if (currentIndex === 0) {
      // 첫 번째 가상 포스터(마지막 실제 포스터)에서 실제 마지막 포스터로 점프
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(performances.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    } else if (currentIndex === extendedPerformances.length - 1) {
      // 마지막 가상 포스터(첫 번째 실제 포스터)에서 실제 첫 번째 포스터로 점프
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentIndex, performances.length, extendedPerformances.length]);

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
    setCurrentIndex(index + 1); // 가상 포스터 때문에 +1
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
      <div className="overflow-hidden relative px-16 w-full">
        <ul
          ref={scrollContainerRef}
          className={`flex gap-4 w-full ${
            isTransitioning
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ width: `${extendedPerformances.length * 100}%` }}
        >
          {extendedPerformances.map((performance) => (
            <li
              key={performance.performanceId}
              className="flex flex-col flex-shrink-0 items-center cursor-pointer"
              // style={{ width: `${100 / performances.length}%` }}
              onClick={() => onPerformanceClick(performance.performanceId)}
            >
              <article className="relative w-[240px] h-[320px] rounded-[20px] overflow-hidden">
                {/* 포스터 이미지 */}
                <img
                  src={performance.posterUrl}
                  alt={performance.performanceName}
                  className="object-cover w-full h-full"
                />

                {/* 그라데이션 오버레이*/}
                <div
                  className="absolute inset-0"
                  style={{
                    opacity: 0.5,
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0,0, 1) 76%)",
                  }}
                />

                {/* 페이지 인디케이터 */}
                <div className="absolute right-[18px] bottom-5">
                  <div className="flex items-center justify-center w-[67px] h-[30px] bg-gray-100 rounded-[60px]">
                    <p className="body-inter-b text-secondary-100">
                      {currentIndex}/{performances.length}
                    </p>
                  </div>
                </div>

                {/* 공연 정보 */}
                <div className="absolute right-4 left-4 bottom-12 text-gray-100">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-gray-100 title-inter max-w-[160px]">
                      {performance.performanceName}
                    </h3>
                    <p className="text-gray-100 subtitle-b">
                      {getGenreLabel(genre)} · {getSidoLabel(performance.sido)}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 인디케이터 */}
      {performances.length > 1 && (
        <div className="flex gap-2 justify-center pt-4">
          {performances.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex - 1 ? "bg-black w-6" : "bg-gray-200"
              }`}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
