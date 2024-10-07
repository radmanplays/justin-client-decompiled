export function init(parent) {
    parent.onUpdate = () => {
      if (parent.getEnabled()) {
        //@ts-ignore
        if (ModAPI.mc.gameSettings.keyBindJump.isPressed()) {
          setTimeout(() => {
            ModAPI.player.jump();
          }, 1);
        }
      }
    };
  }