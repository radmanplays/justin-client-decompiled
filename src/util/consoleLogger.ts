import { clientName } from "./clientName"

export function logToConsole(msg) {
  console.log(`[${clientName}] ${msg}`);
}