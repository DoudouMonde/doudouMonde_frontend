import { AppRouter, QueryClientProvider } from "@/app";
import "@/app/global.css";
import { ToastProvider } from "@/shared/hooks/useToast";
import { DialogProvider } from "@/shared/dialog/DialogProvider";

export function App() {
  return (
    <ToastProvider>
      <QueryClientProvider>
        <DialogProvider>
          <AppRouter />
        </DialogProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
