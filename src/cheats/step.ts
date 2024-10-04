export function init(parent) {
  parent.settings = [
    {
      name: "Height",
      type: "Slider",
      min: 1,
      max: 6,
      step: 0.5,
      current: 1.5
    }
  ]

  parent.onUpdate = function() {
    if (parent.getEnabled()) {
        //@ts-ignore
        if (ModAPI.player.stepHeight != parent.settings[0].current) {
          //@ts-ignore
          ModAPI.player.stepHeight = parent.settings[0].current;
        }
    }
  }

  parent.onEnable = function() {
    //@ts-ignore
    if (ModAPI.player != null) {
      //@ts-ignore
      ModAPI.player.stepHeight = parent.settings[0].current;
    }
  }

  parent.onDisable = function() {
    //@ts-ignore
    if (ModAPI.player != null) {
      //@ts-ignore
      ModAPI.player.stepHeight = 0.6000000238418579;
    }
  }

}

