export function init(parent) {
    parent.onEnable = () => {
        //@ts-ignore
        ModAPI.mc.gameSettings.renderDistanceChunks = 0.5;
        //@ts-ignore
        ModAPI.mc.gameSettings.saveOptions();
        parent.disable();
    };
}
