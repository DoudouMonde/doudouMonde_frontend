import { setupServer } from "msw/node";
import { childHandlers } from "./handlers/child";

export const server = setupServer(...childHandlers);
