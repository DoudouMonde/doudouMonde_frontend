import { AppRouter, QueryClientProvider } from "@/app";
import "@/app/global.css";
import { ToastProvider } from "@/shared/hooks/useToast";

export function App() {
  return (
    <ToastProvider>
      <QueryClientProvider>
        <AppRouter />
      </QueryClientProvider>
    </ToastProvider>
  );
}
