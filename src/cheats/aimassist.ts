export function init(parent) {
    parent.crshInter = null;
    parent.settings = [
        {
            name: "Head Move Delay (ms)",
            type: "Slider",
            min: 10,
            max: 100,
            step: 5,
            current: 30,
        },
        { name: "Disable On Death", type: "Boolean", toggled: true },
        {
            name: "Head Snaps",
            type: "Slider",
            min: 2,
            max: 5,
            step: 1,
            current: 3,
        },
        {
            name: "Horizontal Random (ms)",
            type: "Slider",
            min: 5,
            max: 50,
            step: 5,
            current: 25,
        },
    ];
    parent.toggleKey = "KeyN";
    let I = 0;
    //@ts-ignore
    const A = ModAPI.reflect.getClassByName("C03PacketPlayer$C05PacketPlayerLook")
        .constructors[1];
    //@ts-ignore
    const E = ModAPI.hooks.methods.nmcg_GuiGameOver_initGui;
    //@ts-ignore
    ModAPI.hooks.methods.nmcg_GuiGameOver_initGui = function (...g) {
        if (parent.settings[1].toggled && parent.getEnabled()) {
            parent.disable();
        }
        return E.apply(this, g);
    };
    parent.onUpdate = () => {
        if (parent.getEnabled()) {
            //@ts-ignore
            if (ModAPI.mc.theWorld) {
                let g = false;
                g = false;
                //@ts-ignore
                ModAPI.world.loadedEntityList.array1.forEach((P) => {
                    if (P != null) {
                        if (P.getRef().constructor.name == "nmce_EntityOtherPlayerMP") {
                            if (!g) {
                                const { posX, posY, posZ } = P;
                                //@ts-ignore
                                const S = posX - ModAPI.player.posX;
                                //@ts-ignore
                                const _ = posY - ModAPI.player.posY;
                                //@ts-ignore
                                const h = posZ - ModAPI.player.posZ;
                                const c = Math.sqrt(S * S + h * h);
                                const M = (Math.atan2(h, S) * 180) / Math.PI - 90;
                                const T = -((Math.atan2(_, c) * 180) / Math.PI);
                                if (
                                    Date.now() - I >
                                    parent.settings[2].current * parent.settings[0].current &&
                                    c <= 3 &&
                                    Math.abs(_) <= 3 &&
                                    //@ts-ignore
                                    ModAPI.mc.pointedEntity == null
                                ) {
                                    I = Date.now();
                                    const V = parent.settings[0].current;
                                    const f =
                                        //@ts-ignore
                                        ModAPI.hooks.methods.nmu_MathHelper_wrapAngleTo180_float(
                                            M -
                                            //@ts-ignore
                                            ModAPI.hooks.methods.nmu_MathHelper_wrapAngleTo180_float(
                                                //@ts-ignore
                                                ModAPI.player.rotationYaw
                                            )
                                        );
                                    let $ = 0;
                                    console.log(parent.settings[2].current);
                                    for (let j = 0; $ < parent.settings[2].current; $++) {
                                        setTimeout(() => {
                                            //@ts-ignore
                                            ModAPI.player.rotationYaw +=
                                                f / parent.settings[2].current + Math.random() - 0.5;
                                        }, V * $ + Math.random() * parent.settings[3].current);
                                    }
                                    //@ts-ignore
                                    ModAPI.player.rotationPitch = T + Math.random() * 5 - 2.5;
                                    g = true;
                                }
                            }
                        }
                    }
                });
            } else {
                parent.disable();
            }
        }
    };
    parent.onEnable = () => { };
    parent.onDisable = () => { };
}