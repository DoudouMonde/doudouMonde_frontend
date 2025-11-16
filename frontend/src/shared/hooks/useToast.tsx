import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

// 1. Context 타입 정의
interface ToastContextType {
  showToast: (options: {
    message: string;
    duration?: number;
    type?: "success" | "error" | "info";
  }) => void;
}

// 2. Context 생성
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 3. 커스텀 훅 정의: useToast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    // ToastProvider가 없는 곳에서 훅이 사용될 경우 에러 발생
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// 4. Toast 메시지 상태 타입 정의
interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// 5. Toast 컴포넌트 (토스트 UI 렌더링)
const Toast: React.FC<ToastMessage> = ({ message, type }) => {
  // 실제 CSS/스타일을 적용하여 토스트를 화면에 표시합니다.
  // 여기서는 간단한 인라인 스타일만 사용합니다.
  const baseStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    zIndex: 9999,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    transition: "opacity 0.3s ease-in-out",
  };

  const typeStyles = {
    success: { backgroundColor: "#4CAF50" },
    error: { backgroundColor: "#F44336" },
    info: { backgroundColor: "#2196F3" },
  };

  return <div style={{ ...baseStyle, ...typeStyles[type] }}>{message}</div>;
};

// 6. Toast Provider (Context를 제공하고 토스트를 관리하는 컴포넌트)
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    ({ message, duration = 3000, type = "info" }) => {
      const id = Date.now();
      const newToast: ToastMessage = { id, message, type };

      // 새 토스트 추가 (하나만 표시되도록 기존 토스트는 제거하는 방식)
      setToasts([newToast]);

      // 지정된 시간(duration) 후 토스트 자동 숨김
      setTimeout(() => {
        setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
      }, duration);
    },
    []
  );

  const contextValue = { showToast };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* 렌더링 영역: 현재 활성화된 토스트가 있으면 화면에 표시 */}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
};
