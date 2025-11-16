type PageContainerProps = {
  children: React.ReactNode;
};

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="flex relative flex-col items-center w-full min-h-screen">
      {children}
    </div>
  );
};
