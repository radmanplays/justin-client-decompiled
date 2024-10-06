function init(parent) {
  let settings = [
    { name: "Particles", type: "Boolean", toggled: true },
    { name: "Entities", type: "Boolean", toggled: false },
    { name: "Weather", type: "Boolean", toggled: true },
    { name: "Enchantment Book", type: "Boolean", toggled: true },
    { name: "Beacon Beam", type: "Boolean", toggled: false },
    { name: "Scoreboard", type: "Boolean", toggled: false },
    { name: "Nametags", type: "Boolean", toggled: false },
    { name: "Armor", type: "Boolean", toggled: false },
    { name: "In Game Overlay", type: "Boolean", toggled: false },
    { name: "Lighting", type: "Boolean", toggled: false },
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
      updateSettings();
      return true;
    },
  };
  parent.settings = new Proxy(settings, proxyHandler);

  //@ts-ignore
  const originalRenderParticles = ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles;
  //@ts-ignore
  const originalRenderEntities = ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity;
  //@ts-ignore
  const originalRenderWeather = ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow;
  //@ts-ignore
  const originalRenderEnchantmentBook = ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt;
  //@ts-ignore
  const originalRenderBeacon = ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt;
  //@ts-ignore
  const originalRenderScoreboard = ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard;
  //@ts-ignore
  const originalRenderNametags = ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName;
  //@ts-ignore
  const originalRenderArmor = ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer;
  //@ts-ignore
  const originalRenderGameOverlay = ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay;
  //@ts-ignore
  const originalEnableLighting = ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting;
  //@ts-ignore
  const originalCheckLighting = ModAPI.hooks.methods.nmw_World_checkLightFor;
  //@ts-ignore
  const originalChunkLighting = ModAPI.hooks.methods.nmwc_Chunk_getLightFor;
  //@ts-ignore
  const originalEmptyChunkLighting = ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor;

  function updateSettings() {
    if (parent.settings[0].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles = originalRenderParticles;
    }

    if (parent.settings[1].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity = originalRenderEntities;
    }

    if (parent.settings[2].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow = originalRenderWeather;
    }

    if (parent.settings[3].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt = originalRenderEnchantmentBook;
    }

    if (parent.settings[4].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt = originalRenderBeacon;
    }

    if (parent.settings[5].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard = originalRenderScoreboard;
    }

    if (parent.settings[6].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName = originalRenderNametags;
    }

    if (parent.settings[7].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer = originalRenderArmor;
    }

    if (parent.settings[8].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay = () => {};
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay = originalRenderGameOverlay;
    }

    if (parent.settings[9].toggled && parent.getEnabled()) {
        //@ts-ignore
        ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting = () => {};
        //@ts-ignore
        ModAPI.hooks.methods.nmw_World_checkLightFor = () => false;
        //@ts-ignore
        ModAPI.hooks.methods.nmwc_Chunk_getLightFor = () => 15;
        //@ts-ignore
        ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor = () => 15;
    } else {
        //@ts-ignore
        ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting = originalEnableLighting;
        //@ts-ignore
        ModAPI.hooks.methods.nmw_World_checkLightFor = originalCheckLighting;
        //@ts-ignore
        ModAPI.hooks.methods.nmwc_Chunk_getLightFor = originalChunkLighting;
        //@ts-ignore
        ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor = originalEmptyChunkLighting;
    }
}

parent.onUpdate = () => {};

parent.onEnable = () => {
    updateSettings();
};

parent.onDisable = () => {
    updateSettings();
};
}
