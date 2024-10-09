import { changeMainMenu, isOpen, keyboardEvent } from "./gui";
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


function showMenu() {
  menuElement.style.animation = "";
  menuElement.style.opacity = "1";
  menuElement.style.display = "block";
}

function hideMenu() {
  setTimeout(() => {
    menuElement.style.animation = "fade-out 0.5s linear";

    setTimeout(() => {
      menuElement.style.opacity = "0";
      menuElement.style.display = "none";
    }, 450);
  }, 100);
}

 


//@ts-ignore
const MainMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiMainMenu_initGui;
//@ts-ignore
ModAPI.hooks.methods.mainMenuInitGui = function (...args) {
  showMenu();

  setTimeout(() => {
    //@ts-ignore
    if (ModAPI.mc.currentScreen != null) {
      if (
        //@ts-ignore
        ModAPI.mc.currentScreen.getRef().constructor.name === "nmcg_GuiMainMenu" &&
        menuElement.style.display === "block"
      ) {
        //@ts-ignore
        console.log(ModAPI.mc.currentScreen.getRef().constructor.name);
      } else {
        hideMenu();
      }
    } else {
      hideMenu();
    }
  }, 250);

  return MainMenuDrawfunc.apply(this, args);
};
//@ts-ignore
const originalDrawScreen = ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen;
//@ts-ignore
ModAPI.hooks.methods.mainMenuDrawScreen = function (...args) {
  showMenu();
  return originalDrawScreen.apply(this, args);
};

var menuElement = document.createElement("div");
menuElement.style.position = "fixed";
menuElement.style.top = "0";
menuElement.style.left = "0";
menuElement.style.bottom = "0";
menuElement.style.left = "0";
menuElement.style.background = "rgba(50,50,50,1)";
menuElement.style.width = "100%";
menuElement.style.height = "100%";
menuElement.style.fontFamily = "monospace";
menuElement.style.display = "none";
document.body.appendChild(menuElement);

const titleElement = document.createElement("div");
titleElement.innerText = clientNameRaw;
titleElement.style.textShadow = `${color} 3px 3px 0px`;
titleElement.style.color = "white";
titleElement.style.display = "flex";
titleElement.style.justifyContent = "center";
titleElement.style.fontSize = "5em";
titleElement.style.marginTop = "10%";
menuElement.appendChild(titleElement);

const versiontext = document.createElement("div");
versiontext.style.fontSize = ".2em";
versiontext.innerText = version;
versiontext.style.textShadow = "none";
titleElement.appendChild(versiontext);

const buttonContainer = document.createElement("div");
buttonContainer.style.background = "rgba(100,100,100,1)";
buttonContainer.style.position = "fixed";
buttonContainer.style.width = "25%";
buttonContainer.style.left = "20%";
buttonContainer.style.padding = "10px";
buttonContainer.style.borderRadius = "15px";
buttonContainer.style.top = "60%";
buttonContainer.style.transform = "translate(0,-50%)";
menuElement.appendChild(buttonContainer);

const buttonStyle = {
  background: "rgba(50,50,50,1)",
  fontFamily: "monospace",
  color: "white",
  width: "100%",
  border: "none",
  borderRadius: "10px",
  padding: "15px",
  textAlign: "left",
  fontSize: "1.5em",
  marginTop: "7px",
  marginBottom: "7px",
};

const singleplayerButton = createButton("Singleplayer", () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiScreenIntegratedServerStartup")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hideMenu();
});
buttonContainer.appendChild(singleplayerButton);

const multiplayerButton = createButton("Multiplayer", () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiMultiplayer")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hideMenu();
});
buttonContainer.appendChild(multiplayerButton);

const optionsButton = createButton("Options", () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiOptions")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hideMenu();
});
buttonContainer.appendChild(optionsButton);

const editProfileButton = createButton("Edit Profile", () => {
  //@ts-ignore
  ModAPI.mc.displayGuiScreen(
    //@ts-ignore
    ModAPI.reflect
      .getClassByName("GuiScreenEditProfile")
      //@ts-ignore
      .constructors[0](ModAPI.mc.currentScreen.getRef())
  );

  hideMenu();
});
buttonContainer.appendChild(editProfileButton);

const rightPanel = document.createElement("div");
rightPanel.style.background = "rgba(100,100,100,1)";
rightPanel.style.position = "fixed";
rightPanel.style.width = "25%";
rightPanel.style.padding = "10px";
rightPanel.style.borderRadius = "15px";
rightPanel.style.top = "60%";
rightPanel.style.transform = "translate(0,-50%)";
rightPanel.style.right = "20%";
menuElement.appendChild(rightPanel);

const clickGuiButton = createButton("Click Gui", () => {
  if (!isOpen()) {
    open();
  }
});
rightPanel.appendChild(clickGuiButton);

const downloadsButton = createButton("Downloads", () => {
  alert(downloadurl);
});
downloadsButton.style.overflowX = "auto";
downloadsButton.style.overflowY = "auto";
rightPanel.appendChild(downloadsButton);

const exitButton = createButton("Exit", () => {
  window.location.replace("https://google.com");
});
rightPanel.appendChild(exitButton);

const footerElement = document.createElement("div");
let footerText = "Created By: ";
authors.forEach((creator, index) => {
  footerText += index === authors.length - 1 ? creator : `${creator} & `;
});
footerElement.innerText = footerText;
footerElement.style.position = "fixed";
footerElement.style.bottom = "0";
footerElement.style.left = "0";
footerElement.style.color = color;
footerElement.style.fontSize = "1.5em";
menuElement.appendChild(footerElement);

// Helper function to create buttons
function createButton(text, onClick) {
  const button = document.createElement("button");
  Object.assign(button.style, buttonStyle);
  button.innerText = text;
  button.onclick = onClick;
  return button;
}

document.addEventListener("keydown", keyboardEvent);
ModAPI.addEventListener("update", () => {
  for (let i in modules) {
    if (modules.hasOwnProperty(i)) {
      modules[i].function.onUpdate();
    }
  }
});



//TODO: pretty sure this part is useless(i used chatgpt for renaming things and adding comments)

// Create and append a <style> element to the body
document.body.appendChild(document.createElement("style"));

// Get reference to the first stylesheet
const styleSheet = document.styleSheets[0];

// Insert keyframe animation for fade-in effect
styleSheet.insertRule(`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`);

// Customize scrollbar width
styleSheet.insertRule(`
  ::-webkit-scrollbar {
    width: 10px;
  }
`);

// Customize scrollbar track (background) appearance
styleSheet.insertRule(`
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
`);

// Customize scrollbar thumb (the draggable part)
styleSheet.insertRule(`
  ::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 100, 0.5);
    filter: blur(4px);
  }
`);

// Hide the scrollbar resizer (bottom-right corner)
styleSheet.insertRule(`
  ::-webkit-resizer {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);

// Hide the scrollbar corner (intersection of horizontal and vertical scrollbars)
styleSheet.insertRule(`
  ::-webkit-scrollbar-corner {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    display: none;
  }
`);

// Insert keyframe animation for RGB glowing box shadow effect
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

// Insert keyframe animation for RGB text color effect
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



