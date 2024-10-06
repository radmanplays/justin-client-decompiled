export function init(parent) {
    let settings = [{ name: "Update Chunks", type: "Boolean", toggled: true }];

    let proxyHandler = {
      get(target, property) {
        if (typeof target[property] === "object" && target[property] !== null) {
          return new Proxy(target[property], proxyHandler);
        } else {
          return target[property];
        }
      },
      set(target, property, value) {
        console.log(`Property ${String(property)} changed from ${target[property]} to ${value}`);
        target[property] = value;
        updateChunks();
        return true;
      },
    };

    parent.settings = new Proxy(settings, proxyHandler);

    //@ts-ignore
    const originalUpdateChunks = ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks;

    function updateChunks() {
      if (parent.settings[0].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks = (...args) => {
          setTimeout(function () {
            return originalUpdateChunks.apply(this, args);
          }, 1);
        };
      } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks = originalUpdateChunks;
      }
    }

    parent.onUpdate = () => {};

    parent.onEnable = () => {
      updateChunks();
    };

    parent.onDisable = () => {
      updateChunks();
    };
}
