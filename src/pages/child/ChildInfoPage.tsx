import { ChildList } from "@/domains/child/components/ChildList";
import { ChildRegistrationProvider } from "@/domains/child/contexts/ChildRegistrationProvider";
import DialogProvider from "@/shared/dialog/DialogProvider";

export const ChildInfoPage = () => {
  return (
    <ChildRegistrationProvider>
      <DialogProvider>
        <ChildList />
      </DialogProvider>
    </ChildRegistrationProvider>
  );
};
