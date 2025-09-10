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
      className={`px-4 py-3 border-b-[1px] border-b-gray-100 body-hak flex-1 text-center  ${
        isActive
          ? "text-black border-b-[4px] border-b-black-100"
          : "text-secondary-100"
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </li>
  );
};
