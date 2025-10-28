import React from "react";
import { ChildForm } from "./ChildForm";
import {
  ChildRegistrationProvider,
} from "@/domains/child/contexts/ChildRegistrationContext";

export const CreateChildForm = () => {
    return(
            <ChildRegistrationProvider>
              <ChildForm />
            </ChildRegistrationProvider>
    )
}


