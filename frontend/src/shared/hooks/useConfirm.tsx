// /shared/hooks/useConfirm.tsx
import { useCallback, useMemo, useState } from "react";
// import { ConfirmModal } from "@/shared/components/ConfirmModal";
import { ConfirmModal } from "@/shared/components/Modal/ConfirmModal2";

type ConfirmOptions = {
  title?: string;
  message?: string;
  cancelLabel?: string;
  confirmLabel?: string;
};

export function useConfirm() {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setOpts(options);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = useCallback(() => {
    resolver?.(false);
    setOpen(false);
    setResolver(null);
  }, [resolver]);

  const handleConfirm = useCallback(() => {
    resolver?.(true);
    setOpen(false);
    setResolver(null);
  }, [resolver]);

  const ConfirmElement = useMemo(
    () => (
      <ConfirmModal
        isOpen={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={opts.title ?? "확인"}
        message={opts.message ?? ""}
        cancelLabel={opts.cancelLabel}
        confirmLabel={opts.confirmLabel}
      />
    ),
    [open, handleClose, handleConfirm, opts]
  );

  return { confirm, ConfirmElement };
}
