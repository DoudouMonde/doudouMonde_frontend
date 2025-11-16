import { TabsContainer } from "./TabContainer";
import { TabItem } from "./TabItem";

// 합성 컴포넌트 패턴으로 Tab 구현
export const Tab = Object.assign(TabsContainer, {
  Item: TabItem,
});
