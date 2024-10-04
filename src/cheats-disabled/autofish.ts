export function init(parent) {
  var catchfish = false;
  var catchagain = false;
  parent.onUpdate = function() {
    if (parent.getEnabled()) {
      //@ts-ignore
      if (catchagain && ModAPI.player.fishEntity == null) {
        //@ts-ignore
        ModAPI.rightClickMouse();
        catchagain = false;
      }
      //@ts-ignore
      if (ModAPI.player.fishEntity != null) {
        //@ts-ignore
        if (ModAPI.player.fishEntity.ticksExisted < 100 && catchfish == false) {
          catchfish = true;
        }

        //@ts-ignore
        if (ModAPI.player.fishEntity.isInWater() && ModAPI.player.fishEntity.ticksExisted > 100 && (Math.ceil(ModAPI.player.fishEntity.y) - ModAPI.player.fishEntity.y) >= .3) {
          if (catchfish) {
            catchfish = false;
            //@ts-ignore
            ModAPI.rightClickMouse();
            catchagain = true;
          }
        }

      }
    }
  }

  parent.onEnable = function() {
    catchfish = true;
  }

}

