import { isOpen } from "../../gui";

function init(parent) {
    parent.settings = [
      { name: "Friendly Color", type: "Color", current: "#0000ff" },
      { name: "Enemy Color", type: "Color", current: "#ff0000" },
      { name: "Neutral Color", type: "Color", current: "#ffff00" },
    ];
    let canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.right = "0";
    canvas.style.bottom = "0";
    canvas.style.color = "#FFF";
    canvas.style.zIndex = "100";
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.background = "rgba(0,0,0,0.5)";
    canvas.style.borderRadius = "100%";
    canvas.style.margin = "10px";
    canvas.style.fontFamily = "monospace";
    canvas.style.pointerEvents = "none";
    canvas.style.userSelect = "none";
    document.body.appendChild(canvas);
    canvas.hidden = true;
    let context = canvas.getContext("2d");
    let canvasElement = canvas;
    function handleDrag({ movementX, movementY }) {
      let canvasStyle = window.getComputedStyle(canvasElement);
      let leftPosition = parseInt(canvasStyle.left);
      let topPosition = parseInt(canvasStyle.top);
      canvasElement.style.left = `${leftPosition + movementX}px`;
      canvasElement.style.top = `${topPosition + movementY}px`;
    }
  
    canvasElement.addEventListener("mousedown", () => {
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
          canvas.style.pointerEvents = "auto";
        } else {
          canvas.style.pointerEvents = "none";
        }
        canvas.hidden = false;
        context.clearRect(0, 0, 200, 200);
        //@ts-ignore
        if (ModAPI.mc.theWorld != null) {
          //@ts-ignore
          ModAPI.world.loadedEntityList.array1.forEach((entity) => {
            if (entity != null) {
              //@ts-ignore
              const posx = ModAPI.player.posX - entity.posX + 100;
              //@ts-ignore
              const posy = ModAPI.player.posZ - entity.posZ + 100;
              if (entity.getRef().constructor.name == "nmce_EntityOtherPlayerMP") {
                context.fillStyle = parent.settings[1].current;
              } else {
                context.fillStyle = parent.settings[2].current;
              }
              context.fillRect(posx - 2.5, posy - 2.5, 5, 5);
            }
          });
  
          context.fillStyle = parent.settings[0].current;
          context.fillRect(97.5, 97.5, 5, 5);
        }
      } else {
        canvas.hidden = true;
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
        canvas.hidden = true;
        canvas.style.pointerEvents = "none";
      }
    });
  
    parent.onEnable = () => {
        //@ts-ignore
      if (ModAPI.mc.theWorld != null && ModAPI.currentScreen == null) {
        canvas.hidden = false;
      }
    };
  
    parent.onDisable = () => {
      canvas.hidden = true;
    };
  }