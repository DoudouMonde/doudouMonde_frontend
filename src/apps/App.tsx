import { AppRouter, QueryClientProvider } from "@/apps";

function App() {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
