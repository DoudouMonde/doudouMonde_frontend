import { useState } from "react";

export const useAlert = () => {
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttonText: "확인",
    onConfirm: () => {},
  });

  const openAlert = ({
    title,
    message,
    buttonText = "확인",
    onConfirm,
  }: {
    title: string;
    message: string;
    buttonText?: string;
    onConfirm?: () => void;
  }) => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      buttonText,
      onConfirm: () => {
        onConfirm?.();
        closeAlert();
      },
    });
  };
  const closeAlert = () => {
    setAlertModal((prev) => ({ ...prev, isOpen: false }));
  };

  return { alertModal, openAlert, closeAlert };
};
