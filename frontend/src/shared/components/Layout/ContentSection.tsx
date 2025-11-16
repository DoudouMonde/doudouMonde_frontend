type ContentSectionProps = {
  children: React.ReactNode;
};

export const ContentSection = ({ children }: ContentSectionProps) => {
  return (
    <div className="px-6 py-4 pt-24">
      <div className="flex flex-col gap-6 justify-center">{children}</div>
    </div>
  );
};
