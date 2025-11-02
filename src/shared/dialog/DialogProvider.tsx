// /shared/dialog/DialogProvider.tsx
import React, { useMemo, useState, ReactNode } from "react";
import { ConfirmModal } from "@/shared/components";
import { OneButtonModal } from "@/shared/components/Modal/OneButtonModal";
import { DialogCtx } from "./dialog.context";
import type { ConfirmOptions, AlertOptions, DialogState } from "./dialog.types";

function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null);

  const api = useMemo(
    () => ({
      confirm: (opts: ConfirmOptions) =>
        new Promise<boolean>((resolve) =>
          setDialog({ type: "confirm", opts, resolve })
        ),
      alert: (opts: AlertOptions) =>
        new Promise<void>((resolve) =>
          setDialog({ type: "alert", opts, resolve })
        ),
    }),
    []
  );

  const close = () => setDialog(null);

  return (
    <DialogCtx.Provider value={api}>
      {children}

      {dialog?.type === "confirm" && (
        <ConfirmModal
          isOpen
          onClose={() => {
            dialog.resolve(false);
            close();
          }}
          title={dialog.opts.title ?? "확인"}
          message={dialog.opts.message ?? ""}
          confirmText={dialog.opts.confirmText ?? "확인"}
          cancelText={dialog.opts.cancelText ?? "취소"}
          onConfirm={() => {
            dialog.resolve(true);
            close();
          }}
          onCancel={() => {
            dialog.resolve(false);
            close();
          }}
          showCancel
        />
      )}

      {dialog?.type === "alert" && (
        <OneButtonModal
          isOpen
          title={dialog.opts.title ?? "알림"}
          message={dialog.opts.message ?? ""}
          buttonText={dialog.opts.buttonText ?? "확인"}
          onConfirm={() => {
            dialog.resolve();
            close();
          }}
        />
      )}
    </DialogCtx.Provider>
  );
}

export default DialogProvider; // ✅ 이 파일은 컴포넌트만 export
