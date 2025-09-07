import AppRouter from "@/app/AppRouter";
import QueryClientProvider from "@/app/QueryClientProvider";

function App() {
  return (
    <QueryClientProvider>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
