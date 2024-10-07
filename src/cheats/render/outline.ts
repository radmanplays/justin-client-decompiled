import { rgbColor } from "../../util/clientName";

export function init(parent) {
    let colorSettings = [
        { name: "Red", type: "Slider", min: 0, max: 1, step: 0.1, current: rgbColor.r },
        { name: "Green", type: "Slider", min: 0, max: 1, step: 0.1, current: rgbColor.g },
        { name: "Blue", type: "Slider", min: 0, max: 1, step: 0.01, current: rgbColor.b },
        { name: "Alpha", type: "Slider", min: 0, max: 1, step: 0.01, current: 1 },
    ];

    let proxyHandler = {
        get(target, property) {
            if (typeof target[property] === "object" && target[property] !== null) {
                return new Proxy(target[property], proxyHandler);
            } else {
                return target[property];
            }
        },
        set(target, property, value) {
            target[property] = value;
            updateColors();
            return true;
        },
    };

    parent.settings = new Proxy(colorSettings, proxyHandler);
    
    //@ts-ignore
    let worldRendererInstance = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method().$worldRenderer;
    
    //@ts-ignore
    let tessellatorMethod = ModAPI.reflect
        .getClassById("net.minecraft.client.renderer.Tessellator")
        .staticMethods.getInstance.method();
    
    //@ts-ignore
    const originalRenderMethod = ModAPI.hooks.methods.nmcr_RenderGlobal_func_181561_a;

    function updateColors() {
        if (parent.getEnabled()) {
            //@ts-ignore
            ModAPI.hooks.methods.nmcr_RenderGlobal_func_181561_a = function (...args) {
                //@ts-ignore
                ModAPI.hooks.methods.nlevo_GlStateManager_color(
                    colorSettings[0].current,
                    colorSettings[1].current,
                    colorSettings[2].current,
                    colorSettings[3].current
                );

                originalRenderMethod.apply(this, args);
                //@ts-ignore
                ModAPI.hooks.methods.nlevo_GlStateManager_color(1, 1, 1, 1);
            };
        } else {
            //@ts-ignore
            ModAPI.hooks.methods.nmcr_RenderGlobal_func_181561_a = originalRenderMethod;
        }
    }

    parent.onEnable = () => {
        updateColors();
    };

    parent.onDisable = () => {
        updateColors();
    };
}
