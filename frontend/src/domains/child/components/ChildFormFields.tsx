import React from "react";
// import { TraitSelectorSection } from "./TraitSelectorSection";
// import { GenreSelectorSection } from "./GenreSelectorSection";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import { BasicInfoInputSection } from "./BasicInfoInputSection";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";

export const ChildFormFields = () => {
  const { control } = useChildRegistrationContext();

  return (
    <>
      <BasicInfoInputSection />
      {/* <TraitSelectorSection control={control} />
      <GenreSelectorSection control={control} /> */}
      <ProfileSelectorSection control={control} />
    </>
  );
};
