import { useEffect, useState } from "react";

export const useBookPopup = (reviewCount: number, threshold = 9) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (reviewCount >= threshold) setOpen(true);
  }, [reviewCount, threshold]);

  return {
    open,
    openPopup: () => setOpen(true),
    closePopup: () => setOpen(false),
  };
};
