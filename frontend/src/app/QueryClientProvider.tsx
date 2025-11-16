import { queryClient } from "@/shared/apis";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}
