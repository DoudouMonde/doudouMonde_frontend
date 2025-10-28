import { createRoot } from "react-dom/client";
import { App } from "@/app";

const IS_MOCKING_ENABLED = true;

async function bootstrap() {
  if (IS_MOCKING_ENABLED && typeof window !== "undefined") {
    const { initMsw } = await import("./mocks");
    await initMsw();
  }
  createRoot(document.getElementById("root")!).render(<App />);
}
bootstrap();
