import * as stepMOD from "../cheats/step";
import * as servercrasherMOD from "../cheats/servercrasher";
import * as arraylistMOD from "../cheats/render/arraylist";
import * as minimapMOD from "../cheats/render/minimap";
import * as renderdisablerMOD from "../cheats/render/renderdisabler";
import * as asynceventsMOD from "../cheats/render/asyncevents";
import * as entitydistanceMOD from "../cheats/render/entitydistance";
import * as pointfiveMOD from "../cheats/render/pointfive";
import * as passwordhiderMOD from "../cheats/render/passwordhider";
import * as espMOD from "../cheats/render/esp";
import * as espMOD from "../cheats/render/";
import * as ui from "../gui";

function template(mod) {
  // module functions

  this.enabledDONOTUSE = false;
  this.init = function() { };
  this.onEnable = function() { };
  this.onDisable = function() { };
  this.enable = function() { this.enabledDONOTUSE = true; this.onEnable(); ui.refreshModules("enable") };
  this.disable = function() { this.enabledDONOTUSE = false; this.onDisable(); ui.refreshModules("disable") };
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

export var modules = {
    arraylist: {
      name: "Array List",
      function: new template(arraylistMOD),
      category: "Render",
      description: "Shows your enabled mods",
    },
    minimap: {
      name: "Mini Map",
      function: new template(minimapMOD),
      category: "Render",
      description: "Shows nearby entities",
    },
    renderdisabler: {
      name: "Render Disabler",
      function: new template(renderdisablerMOD),
      category: "Render",
      description: "Disable some renders and get more fps",
    },
    asyncevents: {
      name: "Async Events",
      function: new template(asynceventsMOD),
      category: "Render",
      description:
        "Asynchronize intensive events, not supported with shaders and VERY buggy. Best for pvp serveres",
    },
    entitydistance: {
      name: "Entity Distance",
      function: new template(entitydistanceMOD),
      category: "Render",
      description: "Lowers entity distance to improve performance",
    },
    pointfive: {
      name: "+0.5 Render Distance",
      function: new template(pointfiveMOD),
      category: "Render",
      description:
        "Increases fps by desyncing loading/unloading chunks by adding 0.5 to the render distance",
    },
    passwordhider: {
      name: "Password Hider",
      function: new template(passwordhiderMOD),
      category: "Render",
      description: "Hides password when typing it in",
    },
    esp: {
      name: "ESP",
      function: new template(espMOD),
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
      function: new template(stepMOD),
      category: "Movement",
      description: "Allows you to step higher",
    },
    // timer: {
    //   name: "Timer",
    //   function: new template(K),
    //   category: "Player",
    //   description: "Modify client side tps",
    // },
    // fastplace: {
    //   name: "Fast Place",
    //   function: new template(O),
    //   category: "Player",
    //   description: "Allows you to place blocks fast",
    // },
    // airjump: {
    //   name: "Air Jump",
    //   function: new template(x),
    //   category: "Player",
    //   description: "Allows you to jump even if you are not on the ground",
    // },
    // nofall: {
    //   name: "No Fall",
    //   function: new template(v),
    //   category: "Player",
    //   description: "You won't take any fall damage",
    // },
    servercrasher: {
      name: "Server Crasher",
      function: new template(servercrasherMOD),
      category: "Exploit",
      description: "Sends just a few swing packets ;)",
    },
  };
