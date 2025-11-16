type PlaceholderPageProps = {
  content: string;
};

export const PlaceholderPage = ({ content }: PlaceholderPageProps) => {
  return (
    <div className="flex min-h-screen">
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full border-b-2 border-pink-500 animate-spin"></div>
            <p className="text-gray-600">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
