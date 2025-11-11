import { useState, Children } from "react";

export const useFunnel = <T extends string>(initialStep: T) => {
  const [step, setStep] = useState<T>(initialStep);

  const Step = (props: { name: T; children: React.ReactNode }) => {
    return <>{props.children}</>;
  };

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    const childrenArray = Children.toArray(children);

    const targetStep = childrenArray.find((child) => {
      if (typeof child === "object" && "props" in child && child.props) {
        return child.props === step;
      }
      return false;
    });

    return targetStep;
  };

  return [Funnel, setStep, Step] as const;
};
