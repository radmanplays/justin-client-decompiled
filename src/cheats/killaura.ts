export function init(parent) {
    parent.crshInter = null;

    parent.settings = [
        { name: "Reach", type: "Slider", min: 0, max: 6, step: 0.1, current: 3 },
        { name: "Ignore GUI", type: "Boolean", toggled: false },
        {
            name: "Attack Delay (ms)",
            type: "Slider",
            min: 125,
            max: 500,
            step: 5,
            current: 125,
        },
        { name: "Packet Look", type: "Boolean", toggled: false },
        { name: "Packet Click", type: "Boolean", toggled: false },
        { name: "Disable On Death", type: "Boolean", toggled: true },
    ];

    parent.toggleKey = "KeyN";
    let lastAttackTime = 0;
    //@ts-ignore
    const packetConstructor = ModAPI.reflect.getClassByName("C03PacketPlayer$C05PacketPlayerLook")
        .constructors[1];
    
    //@ts-ignore
    const originalGameOverInit = ModAPI.hooks.methods.nmcg_GuiGameOver_initGui;

    //@ts-ignore
    ModAPI.hooks.methods.nmcg_GuiGameOver_initGui = function (...args) {
        if (parent.settings[5].toggled && parent.getEnabled()) {
            parent.disable();
        }
        return originalGameOverInit.apply(this, args);
    };

    parent.onUpdate = () => {
        if (parent.getEnabled()) {
            //@ts-ignore
            if (ModAPI.mc.theWorld) {
                let targetFound = false;
                //@ts-ignore
                if (ModAPI.mc.currentScreen == null || parent.settings[1].toggled) {
                    targetFound = false;
                    //@ts-ignore
                    ModAPI.world.loadedEntityList.array1.forEach((entity) => {
                        if (entity != null) {
                            if (entity.getRef().constructor.name == "nmce_EntityOtherPlayerMP") {
                                if (!targetFound) {
                                    const { posX, posY, posZ } = entity;
                                    //@ts-ignore
                                    const deltaX = posX - ModAPI.player.posX;
                                    //@ts-ignore
                                    const deltaY = posY - ModAPI.player.posY;
                                    //@ts-ignore
                                    const deltaZ = posZ - ModAPI.player.posZ;
                                    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
                                    const yaw = (Math.atan2(deltaZ, deltaX) * 180) / Math.PI - 90;
                                    const pitch = -((Math.atan2(deltaY, distance) * 180) / Math.PI);
                                    
                                    if (
                                        distance <= parent.settings[0].current &&
                                        Math.abs(deltaY) <= parent.settings[0].current &&
                                        Date.now() - lastAttackTime > parent.settings[2].current
                                    ) {
                                        targetFound = true;
                                        //@ts-ignore
                                        if (ModAPI.mc.pointedEntity != null) {
                                            if (
                                                //@ts-ignore
                                                ModAPI.mc.pointedEntity.getEntityId() != entity.getEntityId()
                                            ) {
                                                if (parent.settings[3].toggled) {
                                                    setTimeout(() => {
                                                        //@ts-ignore
                                                        ModAPI.network.addToSendQueue(
                                                            packetConstructor(yaw, pitch, ModAPI.player.onGround)
                                                        );
                                                    }, 1);
                                                } else {
                                                    //@ts-ignore
                                                    ModAPI.player.rotationYaw = yaw;
                                                    //@ts-ignore
                                                    ModAPI.player.rotationPitch = pitch;
                                                }
                                            }
                                        } else if (parent.settings[3].toggled) {
                                            setTimeout(() => {
                                                //@ts-ignore
                                                ModAPI.network.addToSendQueue(
                                                    packetConstructor(yaw, pitch, ModAPI.player.onGround)
                                                );
                                            }, 1);
                                        } else {
                                            //@ts-ignore
                                            ModAPI.player.rotationYaw = yaw;
                                            //@ts-ignore
                                            ModAPI.player.rotationPitch = pitch;
                                        }

                                        setTimeout(() => {
                                            if (parent.settings[4].toggled) {
                                                //@ts-ignore
                                                ModAPI.network.addToSendQueue(
                                                    //@ts-ignore
                                                    ModAPI.reflect
                                                        .getClassById(
                                                            "net.minecraft.network.play.client.C0APacketAnimation"
                                                        )
                                                        .constructors[0]()
                                                );
                                                //@ts-ignore
                                                ModAPI.network.addToSendQueue(
                                                    //@ts-ignore
                                                    ModAPI.reflect
                                                        .getClassByName("C02PacketUseEntity")
                                                        .constructors[1](
                                                            entity.getRef(),
                                                            //@ts-ignore
                                                            ModAPI.hooks.methods.nmnpc_C02PacketUseEntity$Action_values()
                                                                .data[1]
                                                        )
                                                );
                                            } else {
                                                ModAPI.clickMouse();
                                            }
                                        }, 1);

                                        if (parent.settings[3].toggled) {
                                            setTimeout(() => {
                                                //@ts-ignore
                                                ModAPI.network.addToSendQueue(
                                                    packetConstructor(
                                                        //@ts-ignore
                                                        ModAPI.player.rotationYaw,
                                                        //@ts-ignore
                                                        ModAPI.player.rotationPitch,
                                                        ModAPI.player.onGround
                                                    )
                                                );
                                            }, 1);
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            } else {
                parent.disable();
            }
        }
    };

    parent.onEnable = () => {};
    parent.onDisable = () => {};
}
