import { ChildList } from "@/domains/child/components/ChildList";
import { ChildRegistrationProvider } from "@/domains/child/contexts/ChildRegistrationProvider";

export const ChildInfoPage = () => {
  return (
    <ChildRegistrationProvider>
      <ChildList />
    </ChildRegistrationProvider>
  );
};
