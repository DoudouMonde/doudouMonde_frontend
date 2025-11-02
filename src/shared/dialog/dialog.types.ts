// /shared/dialog/dialog.types.ts
export type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

export type AlertOptions = {
  title?: string;
  message?: string;
  buttonText?: string;
};

export type DialogState =
  | { type: "confirm"; opts: ConfirmOptions; resolve: (v: boolean) => void }
  | { type: "alert"; opts: AlertOptions; resolve: () => void }
  | null;
