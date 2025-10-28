import { setupWorker } from "msw/browser";
import { childHandlers } from "./handlers/child";

export const worker = setupWorker(...childHandlers);
