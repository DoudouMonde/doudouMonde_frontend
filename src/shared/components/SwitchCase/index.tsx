/**
 * 주어진 값에 따라 해당하는 컴포넌트를 렌더링
 */

type Props<T extends string | number> = {
  value: T;
  case: Record<T, React.ReactNode>;
  fallback?: React.ReactNode;
};

export function SwitchCase<T extends string | number>({
  value,
  case: cases,
  fallback = null,
}: Props<T>) {
  return <>{cases[value] ?? fallback}</>;
}
