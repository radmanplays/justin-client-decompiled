export function init(parent) {
    parent.crshInter = null;
  
    parent.settings = [
      { name: "TPS", type: "Slider", min: 1, max: 30, step: 0.5, current: 22 },
    ];
  
    parent.toggleKey = "KeyNone";
  
    parent.onUpdate = () => {
        //@ts-ignore
      if (ModAPI.mc.timer != null && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.mc.timer.ticksPerSecond = parent.settings[0].current;
      }
    };
  
    parent.onEnable = () => {
      //@ts-ignore
      ModAPI.mc.timer.ticksPerSecond = parent.settings[0].current;
    };
  
    parent.onDisable = () => {
      //@ts-ignore
      ModAPI.mc.timer.ticksPerSecond = 20;
    };
  }