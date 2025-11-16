import { TabsContext } from "@/shared/components/Tab/context";

type Props = {
  children: React.ReactNode;
  activeTab: string;
  className?: string;
  setActiveTab: (tab: string) => void;
};

export const TabsContainer = ({
  children,
  setActiveTab,
  activeTab,
  className = "",
}: Props) => {
  // const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <ul className={`flex justify-between w-full ${className}`}>{children}</ul>
    </TabsContext.Provider>
  );
};
