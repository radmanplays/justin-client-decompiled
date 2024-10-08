export function init(parent) { 
    parent.settings = [
      { name: "Distance", type: "Slider", min: 1, max: 3, step: 1, current: 1 },
    ];
    parent.toggleKey = "KeyB";
    //@ts-ignore
    const diggingPacket = ModAPI.reflect.getClassByName("C07PacketPlayerDigging")
      .constructors[1];
    //@ts-ignore
    const startDigAction = ModAPI.hooks.methods.nmnpc_C07PacketPlayerDigging$Action_values().data[0];
    //@ts-ignore
    const stopDigAction = ModAPI.hooks.methods.nmnpc_C07PacketPlayerDigging$Action_values().data[2];
    //@ts-ignore
    const createBlockPos = ModAPI.reflect.getClassByName("BlockPos").constructors[0];
  
    let bedFound = false;
  
    parent.onUpdate = () => {
      setTimeout(() => {
        let searchRadius = parent.settings[0].current;
        if (parent.getEnabled()) {
          //@ts-ignore
          if (ModAPI.mc.theWorld) {
            for (let x = -searchRadius; x < searchRadius; x++) {
              for (let y = -searchRadius; y < searchRadius; y++) {
                for (let z = -searchRadius; z < searchRadius; z++) {
                  if (!bedFound) {
                    //@ts-ignore
                    if (ModAPI.world.getBlockState(createBlockPos(x, y, z)).block.unlocalizedName != null) {
                      //@ts-ignore
                      if (ModAPI.util.jclStrToJsStr(
                            //@ts-ignore
                            ModAPI.world.getBlockState(
                              createBlockPos(
                                //@ts-ignore
                                ModAPI.player.posX + x,
                                //@ts-ignore
                                ModAPI.player.posY + y,
                                //@ts-ignore
                                ModAPI.player.posZ + z
                              )
                            ).block.unlocalizedName.getRef()
                        ) == "bed"
                      ) {
                        bedFound = true;
                        //@ts-ignore
                        ModAPI.network.addToSendQueue(
                          diggingPacket(
                            startDigAction,
                            //@ts-ignore
                            createBlockPos(
                                //@ts-ignore
                              ModAPI.player.posX + x,
                              //@ts-ignore
                              ModAPI.player.posY + y,
                              //@ts-ignore
                              ModAPI.player.posZ + z
                            ),
                            0
                          )
                        );
                        //@ts-ignore
                        ModAPI.network.addToSendQueue(
                          diggingPacket(
                            stopDigAction,
                            //@ts-ignore
                            createBlockPos(
                              //@ts-ignore
                              ModAPI.player.posX + x,
                              //@ts-ignore
                              ModAPI.player.posY + y,
                              //@ts-ignore
                              ModAPI.player.posZ + z
                            ),
                            0
                          )
                        );
                      }
                    }
                  }
                }
              }
            }
          } else {
            parent.disable();
          }
        }
        if (bedFound) {
          parent.disable();
        }
      }, 1);
    };
  
    parent.onEnable = () => {
      bedFound = false;
    };
  
    parent.onDisable = () => {
      bedFound = false;
    };
  }
  