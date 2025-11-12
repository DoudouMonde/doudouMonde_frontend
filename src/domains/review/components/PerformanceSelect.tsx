import { SearchPerformancesInput } from "@/shared/components";

export function PerformanceSelect() {
  return (
    <div className="flex flex-col gap-3 pt-4">
      <p className="subtitle-b text-secondary-100">
        이야기마을에 기록할 공연을 선택해주세요.
      </p>

      <SearchPerformancesInput placeholder="공연 이름을 검색하세요." />
      <div className="h-6"></div>
    </div>
  );
}
