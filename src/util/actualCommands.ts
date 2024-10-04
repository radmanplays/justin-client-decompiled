import { logToChat } from "./chatLogger";
export var actualCommands = {
  "help": {
    function: function(args) {
      logToChat("Monkey "+args[1]);
    },
    description: "Tells u what u r"
  }
}