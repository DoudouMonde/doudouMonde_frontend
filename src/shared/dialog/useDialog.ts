// /shared/dialog/useDialog.ts
import { useContext } from "react";
import { DialogCtx } from "./dialog.context";

export const useDialog = () => {
  const ctx = useContext(DialogCtx);
  if (!ctx) throw new Error("useDialog must be used within <DialogProvider>");
  return ctx;
};
