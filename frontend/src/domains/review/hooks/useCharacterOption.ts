import { useEffect, useState } from "react";

export function useSelectOption<T extends string | number>({
  list,
  currentValue,
  onChange,
  onValidityChange,
  extractId = (item) => (item as any).id,
}: {
  list: any[];
  currentValue: T | undefined;
  onChange: (v: T) => void;
  onValidityChange?: (v: boolean) => void;
  extractId?: (item: any) => T;
}) {
  const initial = list.find((item) => extractId(item) === currentValue)
    ? currentValue
    : extractId(list[0]);
 
  const [selected, setSelected] = useState<T>(initial as T);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (value: string | number) => {
    const id = value as T;
    setSelected(id);
    onChange(id);
    onValidityChange?.(true);
  };

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [initial]);

  return {
    selected,
    handleSelect,
    isAnimating,
  };
}
