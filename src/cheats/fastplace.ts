export function init(parent) {
    parent.onUpdate = () => {
      if (parent.getEnabled()) {
        //@ts-ignore
        ModAPI.mc.rightClickDelayTimer = 0;
      }
    };
  }