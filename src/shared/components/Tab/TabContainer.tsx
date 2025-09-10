import { TabsContext } from "@/shared/components/Tab/context";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  activeTab: string;
  className?: string;
};

export const TabsContainer = ({
  children,
  activeTab: initialActiveTab,
  className = "",
}: Props) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <ul className={`flex justify-between w-full ${className}`}>{children}</ul>
    </TabsContext.Provider>
  );
};
