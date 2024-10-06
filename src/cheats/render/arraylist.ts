import { isOpen } from "../../gui";
import { modules } from "../../util/actualModules";
import { clientName, color } from "../../util/clientName";

function init(parent) {
    function arrayequals(array1, array2) {
      if (array1 === array2) {
        return true;
      }
      if (array1 == null || array2 == null) {
        return false;
      }
      if (array1.length !== array2.length) {
        return false;
      }
      for (let i = 0; i < array1.length; ++i) {
        if (array1[i] !== array2[i]) {
          return false;
        }
      }
      return true;
    }
    const stringToColor = (str) => {
      let hash = 0;
      str.split("").forEach((_) => {
        hash = _.charCodeAt(0) + ((hash << 5) - hash);
      });
      let colorCode = "#";
      for (let _ = 0; _ < 3; _++) {
        const m = (hash >> (_ * 8)) & 255;
        colorCode += m.toString(16).padStart(2, "0");
      }
      return colorCode;
    };
    function padWithZeros(number, length) {
      length = length || 2;
      const padding = new Array(length).join("0");
      return (padding + number).slice(-length);
    }
    function invertHexColor(color) {
      if (color.indexOf("#") === 0) {
        color = color.slice(1);
      }
      if (color.length === 3) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
      }
      if (color.length !== 6) {
        throw new Error("Invalid HEX color.");
      }
      const r = (255 - parseInt(color.slice(0, 2), 16)).toString(16);
      const g = (255 - parseInt(color.slice(2, 4), 16)).toString(16);
      const b = (255 - parseInt(color.slice(4, 6), 16)).toString(16);
      return `#${padWithZeros(r, 2)}${padWithZeros(g, 2)}${padWithZeros(b, 2)}`;
    }
    let displayElement = document.createElement("div");
    displayElement.style.position = "fixed";
    displayElement.style.right = "0";
    displayElement.style.top = "0";
    displayElement.style.background = "#000";
    displayElement.style.color = "#FFF";
    displayElement.style.zIndex = "100";
    displayElement.style.backdropFilter = "blur(8px)";
    displayElement.style.background = "rgba(0,0,0,0.5)";
    displayElement.style.borderRadius = "15px";
    displayElement.style.padding = "10px";
    displayElement.style.fontFamily = "monospace";
    displayElement.style.textAlign = "right";
    displayElement.style.fontSize = "18px";
    displayElement.style.userSelect = "none";
    displayElement.style.pointerEvents = "none";
    document.body.appendChild(displayElement);
    displayElement.hidden = true;
    let previousModuleState = [];
    let currentModuleState = [];
    const panel = displayElement;
    function handleDrag({ movementX, movementY }) {
      let computedStyle = window.getComputedStyle(panel);
      let right = parseInt(computedStyle.right);
      let top = parseInt(computedStyle.top);
      panel.style.right = `${right - movementX}px`;
      panel.style.top = `${top + movementY}px`;
    }
  
    panel.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", handleDrag);
    });
  
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleDrag);
    });
  
    parent.onUpdate = () => {
      if (
        (parent.getEnabled() &&
          //@ts-ignore
          ModAPI.mc.theWorld != null &&
          //@ts-ignore
          ModAPI.mc.currentScreen == null) ||
        (isOpen() && parent.getEnabled())
      ) {
        if (isOpen()) {
          displayElement.style.pointerEvents = "auto";
        } else {
          displayElement.style.pointerEvents = "none";
        }
        displayElement.hidden = false;
        currentModuleState = [];
        for (var mod in modules) {
          currentModuleState.push(modules[mod].function.getEnabled());
        }
        if (arrayequals(previousModuleState, currentModuleState)) {
        } else {
          displayElement.innerText = "";
          const header = document.createElement("div");
          header.innerText = clientName;
          header.style.fontWeight = "bold";
          displayElement.appendChild(header);
          for (var mod in modules) {
            if (modules[mod].function.getEnabled()) {
              const moduleElement = document.createElement("div");
              moduleElement.innerText = modules[mod].name;
              moduleElement.style.color = color;
              displayElement.appendChild(moduleElement);
            }
          }
          previousModuleState = currentModuleState;
        }
      } else {
        displayElement.hidden = true;
      }
    };
  
    ModAPI.addEventListener("frame", () => {
      if (
        !parent.getEnabled() ||
        //@ts-ignore
        ModAPI.mc.theWorld == null ||
        //@ts-ignore
        ModAPI.mc.currentScreen != null
      ) {
        displayElement.hidden = true;
        displayElement.style.pointerEvents = "none";
      }
    });
  
    parent.onEnable = () => {
      //@ts-ignore
      if (ModAPI.mc.theWorld != null && ModAPI.currentScreen == null) {
        displayElement.hidden = false;
      }
    };
  
    parent.onDisable = () => {
      displayElement.hidden = true;
    };
  }