import { ReactNode } from "react";
import { useChildRegistration } from "../hooks/useChildRegistration";
import { ChildRegistrationContext } from "@/domains/child/contexts/ChildRegistrationContext";

export const ChildRegistrationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const registrationState = useChildRegistration();

  return (
    <ChildRegistrationContext.Provider value={registrationState}>
      {children}
    </ChildRegistrationContext.Provider>
  );
};
