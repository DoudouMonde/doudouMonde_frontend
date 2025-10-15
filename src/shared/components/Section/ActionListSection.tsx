"use client";
import React from "react";
import clsx from "clsx";
import Arrow from "@/assets/icons/Arrow";

type ActionItem = {
  /** 버튼 라벨 */
  label: React.ReactNode;
  /** 클릭 핸들러 (링크 대신 onClick으로 통일) */
  onClick?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 좌측 아이콘 (선택) */
  iconLeft?: React.ReactNode;
  /** 우측 아이콘 (선택, 기본값: Arrow) */
  iconRight?: React.ReactNode;
  /** 버튼에 추가 스타일 */
  className?: string;
  /** 버튼 type (기본 button) */
  type?: "button" | "submit" | "reset";
  /** data-testid 등 패스스루 prop이 필요하면 확장 */
};

type ActionListSectionProps = {
  /** 섹션 제목 */
  title: React.ReactNode;
  /** 버튼 목록 */
  items: ActionItem[];

  /** 상단 섹션 여백/스타일 */
  sectionClassName?: string;
  /** 카드(Box) 스타일 커스터마이징 */
  cardClassName?: string;
  /** 각 버튼 공통 스타일 추가 */
  itemClassName?: string;
};

export function ActionListSection({
  title,
  items,
  sectionClassName,
  cardClassName,
  itemClassName,
}: ActionListSectionProps) {
  return (
    <section className={clsx(sectionClassName)}>
      {/* 섹션 제목 */}
      <p className="py-4 pl-2 text-black body-hak-b">{title}</p>

      {/* 카드 컨테이너 */}
      <div className="flex flex-col justify-center">
        <div
          className={clsx(
            "flex flex-col gap-6 justify-center p-5 w-full rounded-[20px] bg-gray-200/70",
            cardClassName
          )}
        >
          {items.map((item, idx) => {
            const RightIcon = item.iconRight ?? <Arrow className="w-4 h-4" />;

            return (
              <button
                key={idx}
                type={item.type ?? "button"}
                onClick={item.onClick}
                disabled={item.disabled}
                className={clsx(
                  "flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-100/60",
                  item.disabled && "opacity-60 cursor-not-allowed",
                  itemClassName,
                  item.className
                )}
              >
                <span className="flex gap-2 items-center body-inter-r">
                  {item.iconLeft}
                  {item.label}
                </span>
                <span aria-hidden>{RightIcon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
