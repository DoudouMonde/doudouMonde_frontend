import { PerformanceItem } from '@/domains/performance/types';
import { SearchPerformancesInput } from '@/shared/components';

type PerformanceSelectProps = {
  onChange: (patch: { performanceId: number; performanceName: string }) => void;
  onValidityChange?: (ok: boolean) => void;
};

export const PerformanceSelect = ({ onChange, onValidityChange }: PerformanceSelectProps) => {

  const handleSelect = (performance: PerformanceItem) => {
    onChange({
      performanceId: performance.performanceId,
      performanceName: performance.performanceName,
    });

    onValidityChange?.(!!id);
  };

  return (
    <div className="flex flex-col gap-3 pt-4">
      <p className="subtitle-b text-secondary-100">이야기마을에 기록할 공연을 선택해주세요.</p>

      <SearchPerformancesInput
        placeholder="공연 이름을 검색하세요."
        onResultClick={(performance) => handleSelect(performance)}
      />
    </div>
  );
};
