// /shared/dialog/dialog.context.tsx
import { createContext } from "react";
import type { ConfirmOptions, AlertOptions } from "./dialog.types";

export const DialogCtx = createContext<{
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  alert: (opts: AlertOptions) => Promise<void>;
} | null>(null);
