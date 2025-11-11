// useFunnel.tsx
import React, {
  Children,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from "react";

type StepProps<T extends string> = {
  name: T;
  children: ReactNode;
};

export function useFunnel<T extends string>(
  initialStep: T,
  steps?: readonly T[]
) {
  const [step, setStep] = useState<T>(initialStep);

  const Step: React.FC<StepProps<T>> = ({ children }) => <>{children}</>;

  const FunnelBase: React.FC<{ children: ReactNode }> = ({ children }) => {
    const items = Children.toArray(children) as ReactElement<StepProps<T>>[];
    const current = items.find((child) => child.props?.name === step) ?? null;
    return current;
  };

  // Funnel.Step 형태로 쓰기 위해 정적 프로퍼티로 부착
  const Funnel = Object.assign(FunnelBase, { Step });

  // 선택: steps를 넘기면 next/prev 제공
  const idx = useMemo(() => (steps ? steps.indexOf(step) : -1), [steps, step]);
  const next = () => {
    if (!steps) return;
    if (idx > -1 && idx < steps.length - 1) setStep(steps[idx + 1]);
  };
  const prev = () => {
    if (!steps) return;
    if (idx > 0) setStep(steps[idx - 1]);
  };
  const goTo = (s: T) => setStep(s);

  return [Funnel, setStep, { step, next, prev, goTo }] as const;
}
