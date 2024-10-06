export function init(parent) {
    //@ts-ignore
    const originalDrawScreen = ModAPI.hooks.methods.nmcg_GuiChat_drawScreen0;
  
    //@ts-ignore
    ModAPI.hooks.methods.nmcg_GuiChat_drawScreen0 = function (...args) {
        if (parent.getEnabled()) {
            //@ts-ignore
            const inputText = ModAPI.util.jclStrToJsStr(
                //@ts-ignore
                ModAPI.mc.currentScreen.inputField.text1.getRef()
            );
            if (
                inputText.startsWith("/l ") ||
                inputText.startsWith("/login ") ||
                inputText.startsWith("/reg ") ||
                inputText.startsWith("/register ")
            ) {
                //@ts-ignore
                ModAPI.mc.currentScreen.inputField.visible1 = 0;
            } else {
                //@ts-ignore
                ModAPI.mc.currentScreen.inputField.visible1 = 1;
            }
        }
        return originalDrawScreen.apply(this, args);
    };
  
    parent.onDisable = () => {
        //@ts-ignore
        if (ModAPI.mc.currentScreen != null) {
            //@ts-ignore
            if (ModAPI.mc.currentScreen.inputField != null) {
                //@ts-ignore
                ModAPI.mc.currentScreen.inputField.visible1 = 1;
            }
        }
    };
}
