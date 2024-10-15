import { changeMainMenu, isOpen, keyboardEvent, open } from "./gui";
import { modules } from "./util/actualModules";
import { authors, clientName, clientNameRaw, color, downloadurl, version } from "./util/clientName";
ModAPI.meta.title("Justin v2");
ModAPI.meta.credits("Murturtle");
ModAPI.meta.description("Press right shift ;)");
ModAPI.require("player");
ModAPI.require("network");
ModAPI.require("settings");
ModAPI.require("world");
modules.arraylist.function.enable();
modules.minimap.function.enable();
modules.renderdisabler.function.enable();
modules.passwordhider.function.enable();
modules.asyncevents.function.enable();
modules.outline.function.enable();


function showmenu() {
  Menu.style.animation = "";
  Menu.style.opacity = "1";
  Menu.style.display = "block";
}
function hidemenu() {
  setTimeout(() => {
    Menu.style.animation = "fade-out 0.5s linear";

    setTimeout(() => {
      Menu.style.opacity = "0";
      Menu.style.display = "none";
    }, 450);
  }, 100);
}
//@ts-ignore
const originalmainmenuinit = ModAPI.hooks.methods.nmcg_GuiMainMenu_initGui;
//@ts-ignore
ModAPI.hooks.methods.nmcg_GuiMainMenu_initGui = function (...o) {
  showmenu();

  setTimeout(() => {
    //@ts-ignore
    if (ModAPI.mc.currentScreen != null) {
      if (
        //@ts-ignore
        ModAPI.mc.currentScreen.getRef().constructor.name ==
          "nmcg_GuiMainMenu" &&
        Menu.style.display == "block"
      ) {
        //@ts-ignore
        console.log(ModAPI.mc.currentScreen.getRef().constructor.name);
      } else {
        hidemenu();
      }
    } else {
      hidemenu();
    }
  }, 250);

  return originalmainmenuinit.apply(this, o);
};
//@ts-ignore
const originalmainmenudraw = ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen;
//@ts-ignore
ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen = function (...o) {
  showmenu();
  return originalmainmenudraw.apply(this, o);
};
var Menu = document.createElement("div");
Menu.style.position = "fixed";
Menu.style.top = "0";
Menu.style.left = "0";
Menu.style.bottom = "0";
Menu.style.left = "0";
Menu.style.background = "rgba(50,50,50,1)";
Menu.style.width = "100%";
Menu.style.height = "100%";
Menu.style.fontFamily = "monospace";
Menu.style.display = "none";
document.body.appendChild(Menu);
const title = document.createElement("div");
title.innerText = clientNameRaw;
title.style.textShadow = `${color} 3px 3px 0px`;
title.style.color = "white";
title.style.display = "flex";
title.style.justifyContent = "center";
title.style.fontSize = "5em";
title.style.marginTop = "10%";
Menu.appendChild(title);
const versiontext = document.createElement("div");
versiontext.style.fontSize = ".2em";
versiontext.innerText = version;
versiontext.style.textShadow = "none";
title.appendChild(versiontext);
const n = document.createElement("div");
n.style.background = "rgba(100,100,100,1)";
n.style.position = "fixed";
n.style.width = "25%";
n.style.left = "20%";
n.style.padding = "10px";
n.style.borderRadius = "15px";
n.style.top = "60%";
n.style.transform = "translate(0,-50%)";
Menu.appendChild(n);
const N = document.createElement("button");
N.style.background = "rgba(50,50,50,1)";
N.style.fontFamily = "monospace";
N.style.color = "white";
N.style.width = "100%";
N.style.border = "none";
N.style.borderRadius = "10px";
N.style.padding = "15px";
N.style.textAlign = "left";
N.style.fontSize = "1.5em";
N.style.marginTop = "7px";
N.style.marginBottom = "7px";
const ho = N.cloneNode();
//@ts-ignore
ho.innerText = "Singleplayer";
n.appendChild(ho);
//@ts-ignore
ho.onclick = () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiScreenIntegratedServerStartup")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hidemenu();
};
const co = N.cloneNode();
//@ts-ignore
co.innerText = "Multiplayer";
//@ts-ignore
co.onclick = () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiMultiplayer")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hidemenu();
};
n.appendChild(co);
const Go = N.cloneNode();
//@ts-ignore
Go.innerText = "Options";
//@ts-ignore
Go.onclick = () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiOptions")
      .constructors[0](
        //@ts-ignore
        ModAPI.mc.currentScreen.getRef(),
        //@ts-ignore
        ModAPI.mc.gameSettings.getRef()
      )
  );

  hidemenu();
};
n.appendChild(Go);
const Ro = N.cloneNode();
//@ts-ignore
Ro.innerText = "Edit Profile";
//@ts-ignore
Ro.onclick = () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiScreenEditProfile")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hidemenu();
};
n.appendChild(Ro);
const w = document.createElement("div");
w.style.background = "rgba(100,100,100,1)";
w.style.position = "fixed";
w.style.width = "25%";
w.style.padding = "10px";
w.style.borderRadius = "15px";
w.style.top = "60%";
w.style.transform = "translate(0,-50%)";
w.style.right = "20%";
Menu.appendChild(w);
const So = N.cloneNode();
//@ts-ignore
So.innerText = "Click Gui";
//@ts-ignore
So.onclick = () => {
  if (!isOpen()) {
    open();
  }
};
w.appendChild(So);
const C = N.cloneNode();
//@ts-ignore
C.innerText = "Downloads";
//@ts-ignore
C.style.overflowX = "auto";
//@ts-ignore
C.style.overFlowY = "auto";
//@ts-ignore
C.onclick = () => {
  alert(downloadurl);
};
w.appendChild(C);
const ko = N.cloneNode();
//@ts-ignore
ko.innerText = "Exit";
//@ts-ignore
ko.onclick = () => {
  window.location.replace("https://google.com");
};
w.appendChild(ko);
const q = document.createElement("div");
let Mo = "Created By: ";
authors.forEach((o) => {
  if (o == authors[authors.length - 1]) {
    Mo += o;
  } else {
    Mo += `${o} & `;
  }
});
q.innerText = Mo;
q.style.position = "fixed";
q.style.bottom = "0";
q.style.left = "0";
q.style.color = color;
q.style.fontSize = "1.5em";
Menu.appendChild(q);
//@ts-ignore
q.st;
document.addEventListener("keydown", keyboardEvent);
ModAPI.addEventListener("update", () => {
  for (let m in modules) {
    if (modules.hasOwnProperty(m)) {
      modules[m].function.onUpdate();
    }
  }
});
document.body.appendChild(document.createElement("style"));
const style = document.styleSheets[0];
style.insertRule(`
    @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
    }
    `);
style.insertRule(`
    @keyframes fade-out {
    0% { opacity: 1; }
    100% { opacity: 0; }
    }
    `);
style.insertRule(`
    ::-webkit-scrollbar {
      width: 10px;
    }`);
style.insertRule(`
::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
}`);
style.insertRule(`
::-webkit-scrollbar-thumb {
background: rgba(100,100,100,0.5);
filter: blur(4px);
}`);
style.insertRule(`::-webkit-resizer {
  background: rgba(0,0,0,0);
  opacity:0;
  display:none;
}`);
style.insertRule(`
::-webkit-scrollbar-corner{
  background: rgba(0,0,0,0);
  opacity:0;
  display:none;
}`);
style.insertRule(`@keyframes rgb {
    0% { box-shadow: 0px 0px 40px rgba(255, 0, 0,0.75); }
    16% { box-shadow: 0px 0px 40px rgba(255, 255, 0,0.75); }
    33% { box-shadow: 0px 0px 40px rgba(0, 255, 0,0.75); }
    50% { box-shadow: 0px 0px 40px rgba(0, 255, 255,0.75); }
    66% { box-shadow: 0px 0px 40px rgba(0, 0, 255,0.75); }
    83% { box-shadow: 0px 0px 40px rgba(255, 0, 255,0.75); }
    100% { box-shadow: 0px 0px 40px rgba(255, 0, 0,0.75); }
}`);
style.insertRule(`@keyframes rgbtext {
    0% { color: rgba(255, 0, 0,0.75); }
    16% { color: rgba(255, 255, 0,0.75); }
    33% { color: rgba(0, 255, 0,0.75); }
    50% { color: rgba(0, 255, 255,0.75); }
    66% { color: rgba(0, 0, 255,0.75); }
    83% { color: rgba(255, 0, 255,0.75); }
    100% { color: rgba(255, 0, 0,0.75); }
}`);
