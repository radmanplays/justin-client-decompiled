export function init(parent) {
    //@ts-ignore
    const playerlookpacket = ModAPI.reflect.getClassByName("C03PacketPlayer$C05PacketPlayerLook")
      .constructors[1];
    parent.onUpdate = () => {
      if (parent.getEnabled()) {
        if (ModAPI.player.fallDistance > 2) {
          setInterval(() => {
            //@ts-ignore
            ModAPI.network.addToSendQueue(
                //@ts-ignore
              playerlookpacket(ModAPI.player.rotationYaw, ModAPI.player.rotationPitch, 1)
            );
          }, 1);
        }
      }
    };
  }