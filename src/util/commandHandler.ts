import { logToChat } from "./chatLogger";
import { actualCommands } from "./actualCommands";
export function handle(msg: string) {
  if (msg.startsWith(".")) {
    var args = msg.split(" ");
    args[0].slice(1);

    if (args[0] in actualCommands) {
      actualCommands[0].function(args);
    } else {
      logToChat("Command not found " + args[0]);
    }
  }

}