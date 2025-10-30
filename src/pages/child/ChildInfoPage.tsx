import { ChildList } from "@/domains/child/components/ChildList";
import { ChildRegistrationProvider } from "@/domains/child/contexts/ChildRegistrationContext";

export const ChildInfoPage = () => {
  return (
    <ChildRegistrationProvider>
      <ChildList />
    </ChildRegistrationProvider>
  );
};
