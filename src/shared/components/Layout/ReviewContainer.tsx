import type { ReactNode } from "react";

type ReviewContainerProps = {
  children: ReactNode;
  title: string;
};

export function ReviewContainer({ children, title }: ReviewContainerProps) {
  return (
    <div className="flex ">
      <div className=" p-6 w-full bg-white rounded-[40px] m-6">
        <h2 className="title-inter">{title}</h2>

        {children}
      </div>
    </div>
  );
}
