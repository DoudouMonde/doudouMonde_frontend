import { AppRouter, QueryClientProvider } from "@/app";
import "@/app/global.css";

export function App() {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
}
