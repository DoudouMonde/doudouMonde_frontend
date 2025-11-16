import { SearchPerformancesInput } from '@/shared/components';
import { useState } from 'react';

type PerformanceSelectProps = {
  onChange: (patch: { performanceId: string; performanceName: string }) => void;
  onValidityChange?: (ok: boolean) => void;
};

export const PerformanceSelect = ({ onChange, onValidityChange }: PerformanceSelectProps) => {
  const [selectedPerformanceName, setSelectedPerformanceName] = useState<string>('');

  const handleSelect = (performance: Performance) => {
    // const stringId = id.toString();
    const stringId = '1234';
    setSelectedPerformanceName('목업데이터');
    onChange({
      performanceId: stringId,
      performanceName: selectedPerformanceName,
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
