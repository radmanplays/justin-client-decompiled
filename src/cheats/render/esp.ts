export function init(parent) {
    //@ts-ignore
    let worldRenderer = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method().$worldRenderer;
    
    //@ts-ignore
    let tessellatorInstance = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method();
    
    parent.settings = [];
    
    //@ts-ignore
    const originalRenderBoundingBox = ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox;

    class DebugBoundingBoxHandler {
        constructor() {
            if (parent.getEnabled()) {
                //@ts-ignore
                ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = function (...args) {
                    //@ts-ignore
                    ModAPI.hooks.methods.nlevo_GlStateManager_disableDepth();
                    originalRenderBoundingBox.apply(this, args);
                    //@ts-ignore
                    ModAPI.hooks.methods.nlevo_GlStateManager_enableDepth();
                };
            } else {
                //@ts-ignore
                ModAPI.hooks.methods.nmcre_RenderManager_renderDebugBoundingBox = originalRenderBoundingBox;
            }
        }

        static onClick() {
            //@ts-ignore
            tessellatorInstance.remove();
        }
    }

    parent.onUpdate = () => {
        //@ts-ignore
        if (parent.getEnabled() && ModAPI.mc.renderManager != null) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    };

    parent.onEnable = () => {
        new DebugBoundingBoxHandler();
        //@ts-ignore
        if (ModAPI.mc.renderManager) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 1;
        }
    };

    parent.onDisable = () => {
        new DebugBoundingBoxHandler();
        //@ts-ignore
        if (ModAPI.mc.renderManager) {
            //@ts-ignore
            ModAPI.mc.renderManager.debugBoundingBox = 0;
        }
    };
}
