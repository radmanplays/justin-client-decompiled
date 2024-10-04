import { clientName } from "./clientName"

export function logToChat(msg) {
  //@ts-ignore
  ModAPI.displayToChat({msg: `§5[${clientName}]§r ${msg}`});
}