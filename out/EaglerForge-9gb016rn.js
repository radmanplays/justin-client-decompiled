var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/util/clientName.ts
function hexToRgb(hexColor) {
  var match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return match ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) } : { r: 255, g: 255, b: 255 };
}
var clientName = "Justin Client v2";
var color = "#00c3ff";
var rgbColor = hexToRgb(color);
var normalizedRgb = {
  r: Math.round((rgbColor.r / 255 + Number.EPSILON) * 100) / 100,
  g: Math.round((rgbColor.g / 255 + Number.EPSILON) * 100) / 100,
  b: Math.round((rgbColor.b / 255 + Number.EPSILON) * 100) / 100
};

// src/cheats/step.ts
var exports_step = {};
__export(exports_step, {
  init: () => init
});
function init(parent) {
  parent.settings = [
    {
      name: "Height",
      type: "Slider",
      min: 1,
      max: 6,
      step: 0.5,
      current: 1.5
    }
  ];
  parent.onUpdate = function() {
    if (parent.getEnabled()) {
      if (ModAPI.player.stepHeight != parent.settings[0].current) {
        ModAPI.player.stepHeight = parent.settings[0].current;
      }
    }
  };
  parent.onEnable = function() {
    if (ModAPI.player != null) {
      ModAPI.player.stepHeight = parent.settings[0].current;
    }
  };
  parent.onDisable = function() {
    if (ModAPI.player != null) {
      ModAPI.player.stepHeight = 0.6000000238418579;
    }
  };
}

// src/cheats/servercrasher.ts
var exports_servercrasher = {};
__export(exports_servercrasher, {
  init: () => init2
});
function init2(parent) {
  parent.crshInter = null;
  parent.settings = [
    {
      name: "PPS",
      type: "Slider",
      min: 20,
      max: 20000,
      step: 10,
      current: 5000
    }
  ];
  function crash() {
    if (ModAPI.player != null) {
      for (let i = 0;i < parent.settings[0].current; i++) {
        ModAPI.network.addToSendQueue(ModAPI.reflect.getClassById("net.minecraft.network.play.client.C0APacketAnimation").constructors[0]());
      }
    } else {
      parent.disable();
    }
  }
  parent.onEnable = function() {
    parent.crshInter = setInterval(crash, 1000);
  };
  parent.onDisable = function() {
    if (parent.crshInter != null) {
      clearInterval(parent.crshInter);
    }
  };
}

// src/cheats/render/arraylist.ts
var exports_arraylist = {};

// src/cheats/render/minimap.ts
var exports_minimap = {};

// src/cheats/render/renderdisabler.ts
var exports_renderdisabler = {};
__export(exports_renderdisabler, {
  init: () => init3
});
function init3(parent) {
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
    { name: "Lighting", type: "Boolean", toggled: false }
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
    }
  };
  parent.settings = new Proxy(settings, proxyHandler);
  const originalRenderParticles = ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles;
  const originalRenderEntities = ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity;
  const originalRenderWeather = ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow;
  const originalRenderEnchantmentBook = ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt;
  const originalRenderBeacon = ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt;
  const originalRenderScoreboard = ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard;
  const originalRenderNametags = ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName;
  const originalRenderArmor = ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer;
  const originalRenderGameOverlay = ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay;
  const originalEnableLighting = ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting;
  const originalCheckLighting = ModAPI.hooks.methods.nmw_World_checkLightFor;
  const originalChunkLighting = ModAPI.hooks.methods.nmwc_Chunk_getLightFor;
  const originalEmptyChunkLighting = ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor;
  function updateSettings() {
    if (parent.settings[0].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcp_EffectRenderer_renderParticles = originalRenderParticles;
    }
    if (parent.settings[1].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcre_RenderManager_doRenderEntity = originalRenderEntities;
    }
    if (parent.settings[2].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcr_EntityRenderer_renderRainSnow = originalRenderWeather;
    }
    if (parent.settings[3].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcrt_TileEntityEnchantmentTableRenderer_renderTileEntityAt = originalRenderEnchantmentBook;
    }
    if (parent.settings[4].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcrt_TileEntityBeaconRenderer_renderTileEntityAt = originalRenderBeacon;
    }
    if (parent.settings[5].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcg_GuiIngame_renderScoreboard = originalRenderScoreboard;
    }
    if (parent.settings[6].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcre_RendererLivingEntity_renderName = originalRenderNametags;
    }
    if (parent.settings[7].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcrel_LayerArmorBase_renderLayer = originalRenderArmor;
    }
    if (parent.settings[8].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay = () => {
      };
    } else {
      ModAPI.hooks.methods.nmcg_GuiIngame_renderGameOverlay = originalRenderGameOverlay;
    }
    if (parent.settings[9].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting = () => {
      };
      ModAPI.hooks.methods.nmw_World_checkLightFor = () => false;
      ModAPI.hooks.methods.nmwc_Chunk_getLightFor = () => 15;
      ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor = () => 15;
    } else {
      ModAPI.hooks.methods.nlevo_GlStateManager_enableLighting = originalEnableLighting;
      ModAPI.hooks.methods.nmw_World_checkLightFor = originalCheckLighting;
      ModAPI.hooks.methods.nmwc_Chunk_getLightFor = originalChunkLighting;
      ModAPI.hooks.methods.nmwc_EmptyChunk_getLightFor = originalEmptyChunkLighting;
    }
  }
  parent.onUpdate = () => {
  };
  parent.onEnable = () => {
    updateSettings();
  };
  parent.onDisable = () => {
    updateSettings();
  };
}

// src/cheats/render/asyncevents.ts
var exports_asyncevents = {};
__export(exports_asyncevents, {
  init: () => init4
});
function init4(parent) {
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
    }
  };
  parent.settings = new Proxy(settings, proxyHandler);
  const originalUpdateChunks = ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks;
  function updateChunks() {
    if (parent.settings[0].toggled && parent.getEnabled()) {
      ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks = (...args) => {
        setTimeout(function() {
          return originalUpdateChunks.apply(this, args);
        }, 1);
      };
    } else {
      ModAPI.hooks.methods.nmcr_RenderGlobal_updateChunks = originalUpdateChunks;
    }
  }
  parent.onUpdate = () => {
  };
  parent.onEnable = () => {
    updateChunks();
  };
  parent.onDisable = () => {
    updateChunks();
  };
}

// src/cheats/render/entitydistance.ts
var exports_entitydistance = {};
__export(exports_entitydistance, {
  init: () => init5
});
function init5(parent) {
  parent.settings = [
    { name: "Distance", type: "Slider", min: 4, max: 32, step: 2, current: 16 },
    { name: "Ignore Players", type: "Boolean", toggled: true }
  ];
  parent.onUpdate = () => {
    if (parent.getEnabled()) {
      ModAPI.world.loadedEntityList.array1.forEach((entity) => {
        if (entity != null) {
          if (entity.getDistanceSqToEntity(ModAPI.player.getRef()) < parent.settings[0].current * parent.settings[0].current || entity.getRef().constructor.name == "nmce_EntityOtherPlayerMP" && parent.settings[1].toggled) {
            entity.renderDistanceWeight = 100;
          } else {
            entity.renderDistanceWeight = 0;
          }
        }
      });
    }
  };
  parent.onEnable = () => {
  };
  parent.onDisable = () => {
    ModAPI.world.loadedEntityList.array1.forEach((entity) => {
      if (entity != null) {
        entity.renderDistanceWeight = 1;
      }
    });
  };
}

// src/cheats/render/pointfive.ts
var exports_pointfive = {};
__export(exports_pointfive, {
  init: () => init6
});
function init6(parent) {
  let previousRenderDistance = 0;
  parent.onUpdate = () => {
    if (parent.getEnabled() && previousRenderDistance !== ModAPI.mc.gameSettings.renderDistanceChunks) {
      ModAPI.mc.gameSettings.renderDistanceChunks = Math.floor(ModAPI.mc.gameSettings.renderDistanceChunks) + 0.5;
      previousRenderDistance = ModAPI.mc.gameSettings.renderDistanceChunks;
      console.log(ModAPI.mc.gameSettings.renderDistanceChunks);
    }
  };
}

// src/cheats/render/passwordhider.ts
var exports_passwordhider = {};
__export(exports_passwordhider, {
  init: () => init7
});
function init7(parent) {
  const originalDrawScreen = ModAPI.hooks.methods.nmcg_GuiChat_drawScreen0;
  ModAPI.hooks.methods.nmcg_GuiChat_drawScreen0 = function(...args) {
    if (parent.getEnabled()) {
      const inputText = ModAPI.util.jclStrToJsStr(ModAPI.mc.currentScreen.inputField.text1.getRef());
      if (inputText.startsWith("/l ") || inputText.startsWith("/login ") || inputText.startsWith("/reg ") || inputText.startsWith("/register ")) {
        ModAPI.mc.currentScreen.inputField.visible1 = 0;
      } else {
        ModAPI.mc.currentScreen.inputField.visible1 = 1;
      }
    }
    return originalDrawScreen.apply(this, args);
  };
  parent.onDisable = () => {
    if (ModAPI.mc.currentScreen != null) {
      if (ModAPI.mc.currentScreen.inputField != null) {
        ModAPI.mc.currentScreen.inputField.visible1 = 1;
      }
    }
  };
}

// src/util/actualModules.ts
function template(mod) {
  this.enabledDONOTUSE = false;
  this.init = function() {
  };
  this.onEnable = function() {
  };
  this.onDisable = function() {
  };
  this.enable = function() {
    this.enabledDONOTUSE = true;
    this.onEnable();
    refreshModules("enable");
  };
  this.disable = function() {
    this.enabledDONOTUSE = false;
    this.onDisable();
    refreshModules("disable");
  };
  this.onKey = function(e) {
  };
  this.onMCKey = function(e) {
  };
  this.getEnabled = function() {
    return this.enabledDONOTUSE;
  };
  this.toggle = function() {
    this.enabledDONOTUSE = !this.enabledDONOTUSE;
    if (this.enabledDONOTUSE) {
      this.onEnable();
    } else {
      this.onDisable();
    }
  };
  this.onUpdate = function() {
  };
  this.onFrame = () => {
  };
  this.toggleKey = "KeyNone";
  this.alert = function() {
    alert();
  };
  this.settings = [];
  mod.init(this);
}
var categories = {
  movement: "Movement",
  player: "Player",
  render: "Render",
  fun: "Fun"
};
var modules = {
  arraylist: {
    name: "Array List",
    function: new template(exports_arraylist),
    category: "Render",
    description: "Shows your enabled mods"
  },
  minimap: {
    name: "Mini Map",
    function: new template(exports_minimap),
    category: "Render",
    description: "Shows nearby entities"
  },
  renderdisabler: {
    name: "Render Disabler",
    function: new template(exports_renderdisabler),
    category: "Render",
    description: "Disable some renders and get more fps"
  },
  asyncevents: {
    name: "Async Events",
    function: new template(exports_asyncevents),
    category: "Render",
    description: "Asynchronize intensive events, not supported with shaders and VERY buggy. Best for pvp serveres"
  },
  entitydistance: {
    name: "Entity Distance",
    function: new template(exports_entitydistance),
    category: "Render",
    description: "Lowers entity distance to improve performance"
  },
  pointfive: {
    name: "+0.5 Render Distance",
    function: new template(exports_pointfive),
    category: "Render",
    description: "Increases fps by desyncing loading/unloading chunks by adding 0.5 to the render distance"
  },
  passwordhider: {
    name: "Password Hider",
    function: new template(exports_passwordhider),
    category: "Render",
    description: "Hides password when typing it in"
  },
  step: {
    name: "Step",
    function: new template(exports_step),
    category: "Movement",
    description: "Allows you to step higher"
  },
  servercrasher: {
    name: "Server Crasher",
    function: new template(exports_servercrasher),
    category: "Exploit",
    description: "Sends just a few swing packets ;)"
  }
};

// src/gui.ts
function destroy() {
  if (document.getElementById("ui") != null) {
    document.getElementById("ui").remove();
  }
  ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen = ingameMenuDrawfunc;
  if (ModAPI.mc.currentScreen.getRef().constructor.name === "nmcg_GuiIngameMenu") {
    ModAPI.mc.displayGuiScreen(null);
  }
}
function isOpen() {
  if (document.getElementById("ui") == null) {
    return false;
  } else {
    return true;
  }
}
function setting(module) {
  const lst = module.function.settings;
  console.log(lst);
  const s = document.createElement("div");
  s.className = "setting";
  s.style.position = "absolute";
  s.style.color = "white";
  s.style.backdropFilter = "blur(8px)";
  s.style.background = "rgba(0,0,0,0.5)";
  s.style.borderRadius = "15px";
  s.style.padding = "15px";
  s.style.fontFamily = "monospace";
  s.style.overflowX = "hidden";
  s.style.overflowX = "auto";
  s.style.width = "15%";
  s.style.height = "50%";
  s.style.top = "100px";
  s.style.left = "100px";
  s.style.userSelect = "none";
  s.style.zIndex = "1000";
  s.style.backdropFilter = "blur(8px)";
  s.style.resize = "both";
  const title = document.createElement("div");
  title.innerText = module.name;
  title.style.fontSize = "22px";
  s.appendChild(title);
  const close = document.createElement("div");
  close.innerText = "X";
  close.style.fontSize = "28px";
  close.style.position = "absolute";
  close.style.right = "15px";
  close.style.top = "10px";
  close.style.cursor = "pointer";
  close.onclick = function() {
    s.remove();
  };
  s.appendChild(close);
  const s2 = s;
  function E({ movementX, movementY }) {
    let h = window.getComputedStyle(s2);
    let g = parseInt(h.left);
    let _ = parseInt(h.top);
    s2.style.left = `${g + movementX}px`;
    s2.style.top = `${_ + movementY}px`;
  }
  title.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", E);
  });
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", E);
  });
  document.body.appendChild(s);
  const button = document.createElement("button");
  button.innerText = "Toggle";
  button.style.border = "none";
  button.style.color = "#FFF";
  button.style.background = "rgba(100,100,100,0.5)";
  button.style.width = "100%";
  button.style.margin = "5px";
  button.style.borderRadius = "10px";
  button.style.fontSize = "18px";
  button.style.padding = "10px 5px 10px 5px";
  button.onclick = () => {
    module.function.toggle();
    refreshModules("toggle");
  };
  s.appendChild(button);
  const keybindbutton = document.createElement("button");
  if (module.function.toggleKey != null) {
    keybindbutton.innerText = module.function.toggleKey;
  } else {
    keybindbutton.innerText = "No key set";
  }
  keybindbutton.style.border = "none";
  keybindbutton.style.color = "#FFF";
  keybindbutton.style.background = "rgba(100,100,100,0.5)";
  keybindbutton.style.width = "100%";
  keybindbutton.style.margin = "5px";
  keybindbutton.style.borderRadius = "10px";
  keybindbutton.style.fontSize = "18px";
  keybindbutton.style.padding = "10px 0px 10px 0px";
  keybindbutton.onclick = () => {
    keybindbutton.innerText = "Press any key or esc...";
    window.addEventListener("keydown", close2);
    function close2(I) {
      if (I.code == "Escape") {
        module.function.toggleKey = "KeyNone";
      } else {
        module.function.toggleKey = I.code;
      }
      keybindbutton.innerText = module.function.toggleKey;
      window.removeEventListener("keydown", close2);
    }
  };
  s.appendChild(keybindbutton);
  for (let r in lst) {
    if (lst.hasOwnProperty(r)) {
      const lstr = lst[r];
      const bg = document.createElement("div");
      bg.style.background = "rgba(100,100,100,0.5)";
      bg.style.margin = "5px";
      bg.style.padding = "5px";
      bg.style.borderRadius = "10px";
      s.appendChild(bg);
      if (lstr.type == "List") {
        const selDesc = document.createElement("div");
        selDesc.style.fontSize = "20px";
        selDesc.innerText = `${lstr.name} - ${lstr.current}`;
        bg.appendChild(selDesc);
        const sel = document.createElement("select");
        sel.onchange = () => {
          lstr.current = parseInt(sel.value);
          selDesc.innerText = `${lstr.name} - ${lstr.current}`;
        };
        for (let j in lstr.modes) {
          if (lstr.modes.hasOwnProperty(j)) {
            const opt = document.createElement("option");
            opt.innerText = lstr.modes[j];
            opt.value = `${j}`;
          }
          bg.appendChild(sel);
        }
      } else if (lstr.type == "Slider") {
        const slideDesc = document.createElement("div");
        slideDesc.style.fontSize = "20px";
        slideDesc.innerText = `${lstr.name} - ${lstr.current}`;
        bg.appendChild(slideDesc);
        const slide = document.createElement("input");
        slide.type = "range";
        slide.style.width = "100%";
        slide.step = lstr.step;
        slide.min = lstr.min;
        slide.max = lstr.max;
        slide.value = lstr.current;
        slide.onchange = () => {
          lstr.current = parseFloat(slide.value);
          slideDesc.innerText = `${lstr.name} - ${lstr.current}`;
        };
        bg.appendChild(slide);
      } else if (lstr.type == "Boolean") {
        const boolDesc = document.createElement("div");
        boolDesc.style.fontSize = "20px";
        boolDesc.innerText = `${lstr.name} - ${lstr.toggled}`;
        bg.appendChild(boolDesc);
        const bool = document.createElement("input");
        bool.type = "checkbox";
        bool.checked = lstr.toggled;
        bool.onchange = () => {
          lstr.toggled = bool.checked;
          boolDesc.innerText = `${lstr.name} - ${lstr.toggled}`;
        };
        bg.appendChild(bool);
      } else if (lstr.type == "Color") {
        const colorDesc = document.createElement("div");
        colorDesc.style.fontSize = "20px";
        colorDesc.innerText = `${lstr.name} - ${lstr.current}`;
        bg.appendChild(colorDesc);
        const color2 = document.createElement("input");
        color2.type = "color";
        color2.value = lstr.current;
        color2.onchange = () => {
          lstr.current = color2.value;
          colorDesc.innerText = `${lstr.name} - ${lstr.current}`;
        };
        bg.appendChild(color2);
      }
    }
  }
}
function open() {
  ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen = () => {
  };
  document.exitPointerLock();
  const cn = clientName;
  const ui = document.createElement("div");
  ui.style.animation = "fade-in 0.5s";
  ui.id = "ui";
  ui.style.position = "fixed";
  ui.style.width = "66%";
  ui.style.height = "66%";
  ui.style.top = `${document.body.clientHeight * 0.165}px`;
  ui.style.left = `${document.body.clientWidth * 0.165}px`;
  ui.style.color = "white";
  ui.style.backdropFilter = "blur(8px)";
  ui.style.background = "rgba(0,0,0,0.75)";
  ui.style.borderRadius = "15px";
  ui.style.padding = "15px";
  ui.style.fontFamily = "monospace";
  ui.style.overflowY = "hidden";
  ui.style.userSelect = "none";
  ui.style.zIndex = "1000";
  document.body.appendChild(ui);
  const title = document.createElement("div");
  title.innerText = cn;
  title.style.fontSize = "24px";
  title.style.margin = "5px";
  ui.appendChild(title);
  const search = document.createElement("input");
  search.style.width = "33%";
  search.type = "text";
  search.style.border = "solid 2px rgba(200,200,200,0.5)";
  search.style.borderRadius = "10px";
  search.style.color = "rgba(255,255,255,1)";
  search.style.display = "inline-block";
  search.style.padding = "8px";
  search.style.marginLeft = "20px";
  search.style.fontSize = "22px";
  search.style.background = "rgba(50,50,50,.24)";
  search.placeholder = "\uD83D\uDD0E\uFE0E Search";
  search.style.backdropFilter = "blur(8px)";
  const close = document.createElement("div");
  close.innerText = "X";
  close.style.fontSize = "28px";
  close.style.position = "absolute";
  close.style.right = "15px";
  close.style.top = "10px";
  close.style.cursor = "pointer";
  close.onclick = function() {
    destroy();
  };
  ui.appendChild(close);
  const bar = document.createElement("div");
  bar.style.overflowX = "scroll";
  ui.appendChild(bar);
  for (let i in categories) {
    if (categories.hasOwnProperty(i)) {
      const category = document.createElement("div");
      category.innerText = categories[i];
      category.style.fontSize = "18px";
      category.style.cursor = "pointer";
      category.style.display = "inline-block";
      category.style.padding = "10px";
      category.style.margin = "5px";
      category.style.background = "rgba(100,100,100,0.5)";
      category.style.borderRadius = "5px";
      category.onclick = () => {
      };
    }
  }
  container = document.createElement("center");
  container.style.height = "90%";
  container.style.overflowY = "scroll";
  ui.appendChild(container);
  refreshModules("ui");
}
function refreshModules(logmessage) {
  console.log(logmessage);
  if (isOpen()) {
    container.innerHTML = "";
    for (let d in modules) {
      if (modules.hasOwnProperty(d)) {
        const o = document.createElement("div");
        o.addEventListener("click", (P) => {
          console.log(modules[d]);
          modules[d].function.toggle();
          refreshModules("modl");
        });
        const A = document.createElement("div");
        A.innerText = `${modules[d].name}`;
        A.style.fontSize = "22px";
        A.style.fontWeight = "bold";
        o.appendChild(A);
        o.appendChild(document.createElement("hr"));
        const c = document.createElement("div");
        c.innerText = `${modules[d].description}`;
        o.appendChild(c);
        o.style.textAlign = "left";
        o.style.display = "inline-block";
        o.style.overflowX = "hidden";
        o.style.width = "25%";
        o.style.height = "25%";
        o.style.padding = "5px";
        o.style.borderRadius = "15px";
        o.style.margin = "10px";
        o.style.cursor = "pointer";
        o.style.overflowY = "scroll";
        o.style.background = "rgba(100,100,100,0.5)";
        if (modules[d].function.getEnabled()) {
          o.style.boxShadow = `0px 0px 15px ${color}`;
        }
        o.oncontextmenu = (P) => {
          P.preventDefault();
          new setting(modules[d]);
          console.log(modules[d]);
        };
        container.appendChild(o);
      }
    }
  }
}
function changeMainMenu() {
  const Singleplayerbtn = ModAPI.mc.currentScreen.buttonList.array1[0];
  const Multiplayerbtn = ModAPI.mc.currentScreen.buttonList.array1[1];
  const Optionsbtn = ModAPI.mc.currentScreen.buttonList.array1[2];
  const Profilebtn = ModAPI.mc.currentScreen.buttonList.array1[3];
  Singleplayerbtn.width17 = Optionsbtn.width17;
  Multiplayerbtn.width17 = Profilebtn.width17;
  Singleplayerbtn.yPosition = Optionsbtn.yPosition - 25;
  Multiplayerbtn.yPosition = Profilebtn.yPosition - 25;
  Multiplayerbtn.xPosition0 = Profilebtn.xPosition0;
  ModAPI.mc.currentScreen.enableBlur = 0;
  ModAPI.mc.currentScreen.panoramaTimer -= 1;
  ModAPI.mc.currentScreen.splashText = ModAPI.util.string(clientName);
}
function keyboardEvent(event) {
  if (event.code == "ShiftRight") {
    if (!isOpen()) {
      open();
    }
  }
  if (ModAPI.mc.currentScreen == null && ModAPI.mc.ingameGUI != null) {
    for (let d in modules) {
      if (event.code == modules[d].function.toggleKey) {
        modules[d].function.toggle();
      }
    }
  }
}
var container;
var ingameMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen;

// src/Main.ts
ModAPI.meta.title("Justin v2");
ModAPI.meta.credits("Murturtle");
ModAPI.meta.description("Press right shift ;)");
ModAPI.require("player");
ModAPI.require("network");
ModAPI.require("settings");
ModAPI.require("world");
var MainMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen;
ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen = function(...n) {
  changeMainMenu();
  return MainMenuDrawfunc.apply(this, n);
};
document.addEventListener("keydown", keyboardEvent);
ModAPI.addEventListener("update", () => {
  for (let i in modules) {
    if (modules.hasOwnProperty(i)) {
      modules[i].function.onUpdate();
    }
  }
});
document.body.appendChild(document.createElement("style"));
var styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`);
styleSheet.insertRule(`
  ::-webkit-scrollbar {
    width: 10px;
  }
`);
styleSheet.insertRule(`
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
`);
styleSheet.insertRule(`
  ::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.5);
    filter: blur(4px);
  }
`);
styleSheet.insertRule(`
  ::-webkit-resizer {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);
styleSheet.insertRule(`
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);
styleSheet.insertRule(`
  @keyframes rgb-glow {
    0% { box-shadow: 0px 0px 40px rgba(255, 0, 0, 0.75); }
    16% { box-shadow: 0px 0px 40px rgba(255, 255, 0, 0.75); }
    33% { box-shadow: 0px 0px 40px rgba(0, 255, 0, 0.75); }
    50% { box-shadow: 0px 0px 40px rgba(0, 255, 255, 0.75); }
    66% { box-shadow: 0px 0px 40px rgba(0, 0, 255, 0.75); }
    83% { box-shadow: 0px 0px 40px rgba(255, 0, 255, 0.75); }
    100% { box-shadow: 0px 0px 40px rgba(255, 0, 0, 0.75); }
  }
`);
styleSheet.insertRule(`
  @keyframes rgb-text {
    0% { color: rgba(255, 0, 0, 0.75); }
    16% { color: rgba(255, 255, 0, 0.75); }
    33% { color: rgba(0, 255, 0, 0.75); }
    50% { color: rgba(0, 255, 255, 0.75); }
    66% { color: rgba(0, 0, 255, 0.75); }
    83% { color: rgba(255, 0, 255, 0.75); }
    100% { color: rgba(255, 0, 0, 0.75); }
  }
`);
