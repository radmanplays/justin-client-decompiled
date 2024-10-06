export function init(parent) {
    let previousRenderDistance = 0;
    parent.onUpdate = () => {
        if (parent.getEnabled() && previousRenderDistance !== 
            //@ts-ignore
            ModAPI.mc.gameSettings.renderDistanceChunks) {
            //@ts-ignore
            ModAPI.mc.gameSettings.renderDistanceChunks = 
                Math.floor(
                    //@ts-ignore
                    ModAPI.mc.gameSettings.renderDistanceChunks
                ) + 0.5;
            
            //@ts-ignore
            previousRenderDistance = ModAPI.mc.gameSettings.renderDistanceChunks;
            //@ts-ignore
            console.log(ModAPI.mc.gameSettings.renderDistanceChunks);
        }
    };
}
