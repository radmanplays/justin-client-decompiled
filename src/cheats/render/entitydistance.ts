export function init(parent) {
    parent.settings = [
      { name: "Distance", type: "Slider", min: 4, max: 32, step: 2, current: 16 },
      { name: "Ignore Players", type: "Boolean", toggled: true },
    ];

    parent.onUpdate = () => {
      if (parent.getEnabled()) {
        //@ts-ignore
        ModAPI.world.loadedEntityList.array1.forEach((entity) => {
          if (entity != null) {
            if (
              entity.getDistanceSqToEntity(
                //@ts-ignore
                ModAPI.player.getRef()
              ) <
                parent.settings[0].current * parent.settings[0].current ||
              (entity.getRef().constructor.name == "nmce_EntityOtherPlayerMP" &&
                parent.settings[1].toggled)
            ) {
              entity.renderDistanceWeight = 100;
            } else {
              entity.renderDistanceWeight = 0;
            }
          }
        });
      }
    };

    parent.onEnable = () => {};

    parent.onDisable = () => {
      //@ts-ignore
      ModAPI.world.loadedEntityList.array1.forEach((entity) => {
        if (entity != null) {
          entity.renderDistanceWeight = 1;
        }
      });
    };
}
