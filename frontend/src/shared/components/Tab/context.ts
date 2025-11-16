import { createContext } from "react";

export const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: "",
  setActiveTab: () => {},
});
