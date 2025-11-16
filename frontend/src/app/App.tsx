import { AppRouter } from "@/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/app/global.css";
import { ToastProvider } from "@/shared/hooks/useToast";
import { DialogProvider } from "@/shared/dialog/DialogProvider";
const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <DialogProvider>
          <AppRouter />
        </DialogProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
