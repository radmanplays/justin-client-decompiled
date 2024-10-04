import { changeMainMenu, keyboardEvent } from "./gui";
import { modules } from "./util/actualModules";
ModAPI.meta.title("Justin v2");
ModAPI.meta.credits("Murturtle");
ModAPI.meta.description("Press right shift ;)");
ModAPI.require("player");
ModAPI.require("network");
ModAPI.require("settings");
ModAPI.require("world");




//@ts-ignore
const MainMenuDrawfunc = ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen;
//@ts-ignore
ModAPI.hooks.methods.nmcg_GuiMainMenu_drawScreen = function (...n) {
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



