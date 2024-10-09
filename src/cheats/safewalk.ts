export function init(parent) {
    parent.toggleKey = "KeyH";
    //@ts-ignore
    const BlockPosConstructor = ModAPI.reflect.getClassByName("BlockPos").constructors[0];
    let sneaking = false;
  
    parent.onUpdate = () => {
      if (parent.getEnabled()) {
        setTimeout(() => {
          //@ts-ignore
          if (
            //@ts-ignore
            ModAPI.world.isAirBlock(
              //@ts-ignore
              BlockPosConstructor(
                //@ts-ignore
                Math.floor(ModAPI.player.posX),
                //@ts-ignore
                ModAPI.player.posY - 0.6,
                //@ts-ignore
                Math.floor(ModAPI.player.posZ)
              )
            ) &&
            //@ts-ignore
            ModAPI.player.onGround &&
            //@ts-ignore
            ModAPI.player.onGround
          ) {
            //@ts-ignore
            ModAPI.mc.gameSettings.keyBindSneak.pressed = 1;
            sneaking = true;
          } else if (sneaking) {
            sneaking = false;
            //@ts-ignore
            ModAPI.mc.gameSettings.keyBindSneak.pressed = 0;
          }
        }, 1);
      }
    };
  
    parent.onDisable = () => {
      //@ts-ignore
      ModAPI.mc.gameSettings.keyBindSneak.pressed = 0;
    };
  }
  