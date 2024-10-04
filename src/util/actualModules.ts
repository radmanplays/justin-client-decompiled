/*import * as flightMOD from "../cheats/flight.ts";
import * as fullbrightMOD from "../cheats/autofish.ts";
import * as stepMOD from "../cheats/step.ts";
import * as autofishMOD from "../cheats/autofish.ts";
import * as servercrasherMOD from "../cheats/servercrasher.ts";
import * as rgbcloudsMOD from "../cheats/rgbclouds.ts";
import * as ui from "../gui";*/

function template(mod) {
  // module functions

  this.enabledDONOTUSE = false;
  this.init = function() { };
  this.onEnable = function() { };
  this.onDisable = function() { };
  this.enable = function() { this.enabledDONOTUSE = true; this.onEnable(); ui.refreshModules() };
  this.disable = function() { this.enabledDONOTUSE = false; this.onDisable(); ui.refreshModules() };
  this.onKey = function(e){};
  this.onMCKey = function(e){};
  this.getEnabled = function() { return this.enabledDONOTUSE; };
  this.toggle = function() { this.enabledDONOTUSE = !this.enabledDONOTUSE; if (this.enabledDONOTUSE) { this.onEnable() } else { this.onDisable(); } };
  //mc functions
  this.onUpdate = function() { };
  this.onFrame = () => {};
  this.toggleKey = "KeyNone";

  this.alert = function() { alert() };

  this.settings = []

  mod.init(this);
}

export var categories = {
  movement: "Movement",
  player: "Player",
  render: "Render",
  fun: "Fun"
}

/*export var modules = {
    arraylist: {
      name: "Array List",
      function: new template(q),
      category: "Render",
      description: "Shows your enabled mods",
    },
    minimap: {
      name: "Mini Map",
      function: new template(z),
      category: "Render",
      description: "Shows nearby entities",
    },
    renderdisabler: {
      name: "Render Disabler",
      function: new template(L),
      category: "Render",
      description: "Disable some renders and get more fps",
    },
    asyncevents: {
      name: "Async Events",
      function: new template(b),
      category: "Render",
      description:
        "Asynchronize intensive events, not supported with shaders and VERY buggy. Best for pvp serveres",
    },
    entitydistance: {
      name: "Entity Distance",
      function: new template(V),
      category: "Render",
      description: "Lowers entity distance to improve performance",
    },
    pointfive: {
      name: "+0.5 Render Distance",
      function: new template(Y),
      category: "Render",
      description:
        "Increases fps by desyncing loading/unloading chunks by adding 0.5 to the render distance",
    },
    passwordhider: {
      name: "Password Hider",
      function: new template(Z),
      category: "Render",
      description: "Hides password when typing it in",
    },
    esp: {
      name: "ESP",
      function: new template(D),
      category: "Render",
      description: "Shows entities through walls",
    },
    outline: {
      name: "Custom Outline",
      function: new template(X),
      category: "Render",
      description: "Change the color of the properties of the block outline",
    },
    killaura: {
      name: "Kill Aura",
      function: new template(j),
      category: "Combat",
      description: "Attack players around you",
    },
    step: {
      name: "Step",
      function: new template(H),
      category: "Movement",
      description: "Allows you to step higher",
    },
    timer: {
      name: "Timer",
      function: new template(K),
      category: "Player",
      description: "Modify client side tps",
    },
    fastplace: {
      name: "Fast Place",
      function: new template(O),
      category: "Player",
      description: "Allows you to place blocks fast",
    },
    airjump: {
      name: "Air Jump",
      function: new template(x),
      category: "Player",
      description: "Allows you to jump even if you are not on the ground",
    },
    nofall: {
      name: "No Fall",
      function: new template(v),
      category: "Player",
      description: "You won't take any fall damage",
    },
    servercrasher: {
      name: "Server Crasher",
      function: new template(Q),
      category: "Exploit",
      description: "Sends just a few swing packets ;)",
    },
  };*/
