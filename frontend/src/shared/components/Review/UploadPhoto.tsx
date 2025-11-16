// src/shared/components/Photo/PhotoGridUploader.tsx
import React, { useMemo, useEffect } from "react";

type PhotoGridUploaderProps = {
  /** 파일 배열 (비어있는 칸은 null) */
  images: (File | null)[];
  /** 인덱스 위치에 파일 업로드 */
  onUpload: (index: number, file: File) => void;
  /** 인덱스 위치의 파일 제거 */
  onRemove: (index: number) => void;
  /** 그리드 칸 개수 (기본 4개) */
  slots?: number;
  /** accept 속성 (기본 image/*) */
  accept?: string;
  /** grid col 개수 (기본 2열) */
  columns?: 1 | 2 | 3 | 4;
  /** 업로드 라벨 텍스트 */
  uploadLabel?: string;
  /** 각 칸의 aspect-ratio 유지 여부 */
  square?: boolean;
  /** 외부 className 확장 */
  className?: string;
};

export const PhotoGridUploader: React.FC<PhotoGridUploaderProps> = ({
  images,
  onUpload,
  onRemove,
  slots = 4,
  accept = "image/*",
  columns = 2,
  uploadLabel = "사진 추가",
  square = true,
  className = "",
}) => {
  // 미리보기 URL (메모이제이션 & 클린업)
  const previewUrls = useMemo(
    () => images.map((file) => (file ? URL.createObjectURL(file) : null)),
    [images]
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const colClass =
    columns === 4
      ? "grid-cols-4"
      : columns === 3
      ? "grid-cols-3"
      : columns === 2
      ? "grid-cols-2"
      : "grid-cols-1";

  return (
    <div className={`grid gap-4 ${colClass} ${className}`}>
      {Array.from({ length: slots }).map((_, index) => {
        const hasImage = !!images[index];
        return (
          <div
            key={index}
            className={[
              "relative",
              square ? "aspect-square" : "h-36",
              "bg-white/60 backdrop-blur-sm rounded-[16px]",
              "border-2 border-dashed border-secondary-100/30",
              "hover:border-green-100 transition-colors",
            ].join(" ")}
          >
            {hasImage ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrls[index]!}
                  alt={`업로드된 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded-[14px]"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="flex absolute top-2 right-2 justify-center items-center w-6 h-6 text-sm text-white bg-red-500 rounded-full transition-colors hover:bg-red-600"
                  aria-label={`${index + 1}번째 이미지 삭제`}
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
                <div className="flex flex-col justify-center items-center text-gray-400">
                  <svg
                    className="mb-2 w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm font-medium">{uploadLabel}</span>
                </div>
                <input
                  type="file"
                  accept={accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(index, file);
                    // 같은 파일 재업로드 허용을 위해 value 초기화
                    e.currentTarget.value = "";
                  }}
                  className="hidden"
                  aria-label={`${index + 1}번째 이미지 업로드`}
                />
              </label>
            )}
          </div>
        );
      })}
    </div>
  );
};
