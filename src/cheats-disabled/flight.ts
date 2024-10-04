export var settings = [
  {
    name: "Mode",
    type: "List",
    modes: ["Abilities", "Packet"],
    current: 0,
  },
];

export function init(parent) {
  parent.onUpdate = function () {
    if (parent.getEnabled()) {
        //@ts-ignore
        if (!ModAPI.player.capabilities.isFlying) {
          //@ts-ignore
          ModAPI.player.capabilities.isFlying = true;
          //@ts-ignore
          ModAPI.player.reload();
        }
    }
  };

  parent.onEnable = function () {
    //@ts-ignore
    if (ModAPI.player != null) {
      //@ts-ignore
      if (ModAPI.player.capabilities != null) {
        //@ts-ignore
        ModAPI.player.capabilities.isFlying = true;
        //@ts-ignore
        ModAPI.player.reload();
      }
    }
  };

  parent.onDisable = function () {
    //@ts-ignore
    if (ModAPI.player != null) {
      //@ts-ignore
      if (ModAPI.player.capabilities != null) {
        //@ts-ignore
        ModAPI.player.capabilities.isFlying = false;
        //@ts-ignore
        ModAPI.player.reload();
      }
    }
  }
}
