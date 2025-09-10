import { ReactNode, useContext } from "react";
import { TabsContext } from "./context";

type Props = {
  children: ReactNode;
  value: string;
  className?: string;
};

export const TabItem = ({ children, value, className = "" }: Props) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <li
      className={`px-4 py-3 border-b-[1px] border-b-gray-100 body-hak flex-1 text-center cursor-pointer ${
        isActive
          ? "text-black bg-white border-b-[#000000] border-b-[4px]"
          : "bg-gray-200 text-secondary-100"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </li>
  );
};
