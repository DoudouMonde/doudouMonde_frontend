type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <main className="flex relative z-10 flex-col items-center mb-20 w-full">
      <div className="overflow-y-auto w-full h-full">{children}</div>
    </main>
  );
};
