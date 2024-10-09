import { clientName, color } from "./util/clientName";
import { modules, categories } from "./util/actualModules";


// delete the ui
export function destroy() {
  if (document.getElementById("ui") != null) {
    document.getElementById("ui").remove();
  }
  //@ts-ignore
  ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen = ingameMenuDrawfunc;

  if (
    //@ts-ignore
    ModAPI.mc.currentScreen.getRef().constructor.name === "nmcg_GuiIngameMenu"
  ) {
    //@ts-ignore
    ModAPI.mc.displayGuiScreen(null);
  }
}

var container;

// check if open
export function isOpen() {
  if (document.getElementById("ui") == null) {
    return false;
  } else {
    return true;
  }
}

// open a setting menu
export function setting(module) {
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
    window.addEventListener("keydown", close);
    function close(I) {
      if (I.code == "Escape") {
        module.function.toggleKey = "KeyNone";
      } else {
        module.function.toggleKey = I.code;
      }
      keybindbutton.innerText = module.function.toggleKey;
      window.removeEventListener("keydown", close);
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
        const color = document.createElement("input");
        color.type = "color";
        color.value = lstr.current;

        color.onchange = () => {
          lstr.current = color.value;
          colorDesc.innerText = `${lstr.name} - ${lstr.current}`;
        };

        bg.appendChild(color);
      }
    }
  }
}


//create the gui
export function open() {
  //@ts-ignore
  ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen = () => { };
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
      category.onclick = () => { };

      //bar.appendChild(category);
    }
  }
  container = document.createElement("center");
  container.style.height = "90%";
  container.style.overflowY = "scroll";
  ui.appendChild(container);
  refreshModules("ui");
}

// Reload module list
export function refreshModules(logmessage) {
  console.log(logmessage);

  if (isOpen()) {
    container.innerHTML = "";
    for (let mod in modules) {
      if (modules.hasOwnProperty(mod)) {
        const o = document.createElement("div");
        o.addEventListener("click", (P) => {
          console.log(modules[mod]);
          modules[mod].function.toggle();
          refreshModules("modl");
        });
        const modname = document.createElement("div");
        modname.innerText = `${modules[mod].name}`;
        modname.style.fontSize = "22px";
        modname.style.fontWeight = "bold";
        o.appendChild(modname);
        o.appendChild(document.createElement("hr"));
        const c = document.createElement("div");
        c.innerText = `${modules[mod].description}`;
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

        if (modules[mod].function.getEnabled()) {
          o.style.boxShadow = `0px 0px 15px ${color}`;
        }

        o.oncontextmenu = (P) => {
          P.preventDefault();
          new setting(modules[mod]);
          console.log(modules[mod]);
        };

        container.appendChild(o);
      }
    }
  }
}
//@ts-ignore
var ingameMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen;
export function changeMainMenu() {
  /*
  //@ts-ignore
  const Singleplayerbtn = ModAPI.mc.currentScreen.buttonList.array1[0];
  //@ts-ignore
  const Multiplayerbtn = ModAPI.mc.currentScreen.buttonList.array1[1];
  //@ts-ignore
  const Optionsbtn = ModAPI.mc.currentScreen.buttonList.array1[2];
  //@ts-ignore
  const Profilebtn = ModAPI.mc.currentScreen.buttonList.array1[3];

  Singleplayerbtn.width17 = Optionsbtn.width17;
  Multiplayerbtn.width17 = Profilebtn.width17;
  Singleplayerbtn.yPosition = Optionsbtn.yPosition - 25;
  Multiplayerbtn.yPosition = Profilebtn.yPosition - 25;
  Multiplayerbtn.xPosition0 = Profilebtn.xPosition0;
  //@ts-ignore
  ModAPI.mc.currentScreen.enableBlur = 0;
  //@ts-ignore
  ModAPI.mc.currentScreen.panoramaTimer -= 1;
  //@ts-ignore
  ModAPI.mc.currentScreen.splashText = ModAPI.util.string(clientName);*/
}
export function keyboardEvent(event) {
  if (event.code == "ShiftRight") {
    if (!isOpen()) {
      open();
    }
  }
  //@ts-ignore
  if (ModAPI.mc.currentScreen == null && ModAPI.mc.ingameGUI != null) {
    for (let d in modules) {
      if (event.code == modules[d].function.toggleKey) {
        modules[d].function.toggle();
      }
    }
  }
}