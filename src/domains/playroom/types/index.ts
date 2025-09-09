export interface LandingPageProps {
  onStart?: () => void;
  onSkip?: () => void;
  className?: string;
}

export interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}
