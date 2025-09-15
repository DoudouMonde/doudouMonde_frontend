import React from "react";

interface GradientOverlayProps {
  className?: string;
  variant?: "poster" | "custom";
  customGradient?: string;
}

export const GradientOverlay: React.FC<GradientOverlayProps> = ({
  className = "",
  variant = "poster",
  customGradient,
}) => {
  const getGradientStyle = () => {
    if (customGradient) {
      return customGradient;
    }

    switch (variant) {
      case "poster":
        return "linear-gradient(180deg, rgba(0, 0, 0, 0) 34%, rgba(0, 0, 0, 1) 84%)";
      default:
        return "linear-gradient(180deg, rgba(0, 0, 0, 0) 34%, rgba(0, 0, 0, 1) 84%)";
    }
  };

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        background: getGradientStyle(),
      }}
    />
  );
};
