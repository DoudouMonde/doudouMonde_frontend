import { ChildForm } from "./ChildForm";
import { ChildRegistrationProvider } from "@/domains/child/contexts/ChildRegistrationProvider";

export const CreateChildForm = () => {
  return (
    <ChildRegistrationProvider>
      <ChildForm />
    </ChildRegistrationProvider>
  );
};
