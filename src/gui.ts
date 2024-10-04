import { clientName } from "./util/clientName";
import { modules, categories } from "./util/actualModules";


// delete the ui
export function destroy() {
    if (document.getElementById("ui") != null) {
      document.getElementById("ui").remove();
    }
    //@ts-ignore
    ModAPI.hooks.methods.nmcg_GuiIngameMenu_drawScreen = mn;
  
    if (
      //@ts-ignore
      ModAPI.mc.currentScreen.getRef().constructor.name === "nmcg_GuiIngameMenu"
    ) {
      //@ts-ignore
      ModAPI.mc.displayGuiScreen(null);
    }
  }

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
        const d = n.function.settings;
        console.log(d);
        const o = document.createElement("div");
        o.className = "setting";
        o.style.position = "absolute";
        o.style.color = "white";
        o.style.backdropFilter = "blur(8px)";
        o.style.background = "rgba(0,0,0,0.5)";
        o.style.borderRadius = "15px";
        o.style.padding = "15px";
        o.style.fontFamily = "monospace";
        o.style.overflowX = "hidden";
        o.style.overflowX = "auto";
        o.style.width = "15%";
        o.style.height = "50%";
        o.style.top = "100px";
        o.style.left = "100px";
        o.style.userSelect = "none";
        o.style.zIndex = "1000";
        o.style.backdropFilter = "blur(8px)";
        o.style.resize = "both";
        const A = document.createElement("div");
        A.innerText = n.name;
        A.style.fontSize = "22px";
        o.appendChild(A);
        const c = document.createElement("div");
        c.innerText = "X";
        c.style.fontSize = "28px";
        c.style.position = "absolute";
        c.style.right = "15px";
        c.style.top = "10px";
        c.style.cursor = "pointer";
      
        o.appendChild(c);
        const P = o;
        function E({ movementX, movementY }) {
          let h = window.getComputedStyle(P);
          let g = parseInt(h.left);
          let _ = parseInt(h.top);
          P.style.left = `${g + movementX}px`;
          P.style.top = `${_ + movementY}px`;
        }
      
        A.addEventListener("mousedown", () => {
          window.addEventListener("mousemove", E);
        });
      
        window.addEventListener("mouseup", () => {
          window.removeEventListener("mousemove", E);
        });
      
        document.body.appendChild(o);
        const M = document.createElement("button");
        M.innerText = "Toggle";
        M.style.border = "none";
        M.style.color = "#FFF";
        M.style.background = "rgba(100,100,100,0.5)";
        M.style.width = "100%";
        M.style.margin = "5px";
        M.style.borderRadius = "10px";
        M.style.fontSize = "18px";
        M.style.padding = "10px 5px 10px 5px";
      
        M.onclick = () => {
          n.function.toggle();
          w("toggle");
        };
      
        o.appendChild(M);
        const i = document.createElement("button");
        if (n.function.toggleKey != null) {
          i.innerText = n.function.toggleKey;
        } else {
          i.innerText = "No key set";
        }
        i.style.border = "none";
        i.style.color = "#FFF";
        i.style.background = "rgba(100,100,100,0.5)";
        i.style.width = "100%";
        i.style.margin = "5px";
        i.style.borderRadius = "10px";
        i.style.fontSize = "18px";
        i.style.padding = "10px 0px 10px 0px";
      
        i.onclick = () => {
          i.innerText = "Press any key or esc...";
          window.addEventListener("keydown", r);
          function r(I) {
            if (I.code == "Escape") {
              n.function.toggleKey = "KeyNone";
            } else {
              n.function.toggleKey = I.code;
            }
            i.innerText = n.function.toggleKey;
            window.removeEventListener("keydown", r);
          }
        };
      
        o.appendChild(i);
        for (let r in d) {
          if (d.hasOwnProperty(r)) {
            const d_r = d[r];
            const h = document.createElement("div");
            h.style.background = "rgba(100,100,100,0.5)";
            h.style.margin = "5px";
            h.style.padding = "5px";
            h.style.borderRadius = "10px";
            o.appendChild(h);
      
            if (d_r.type == "List") {
              const g = document.createElement("div");
              g.style.fontSize = "20px";
              g.innerText = `${d_r.name} - ${d_r.current}`;
              h.appendChild(g);
              const _ = document.createElement("select");
              _.onchange = () => {
                d_r.current = parseInt(_.value);
                g.innerText = `${d_r.name} - ${d_r.current}`;
              };
              for (let m in d_r.modes) {
                if (d_r.modes.hasOwnProperty(m)) {
                  const B = document.createElement("option");
                  B.innerText = d_r.modes[m];
                  B.value = `${m}`;
                }
                h.appendChild(_);
              }
            } else if (d_r.type == "Slider") {
              const g = document.createElement("div");
              g.style.fontSize = "20px";
              g.innerText = `${d_r.name} - ${d_r.current}`;
              h.appendChild(g);
              const _ = document.createElement("input");
              _.type = "range";
              _.style.width = "100%";
              _.step = d_r.step;
              _.min = d_r.min;
              _.max = d_r.max;
              _.value = d_r.current;
      
              _.onchange = () => {
                d_r.current = parseFloat(_.value);
                g.innerText = `${d_r.name} - ${d_r.current}`;
              };
      
              h.appendChild(_);
            } else if (d_r.type == "Boolean") {
              const g = document.createElement("div");
              g.style.fontSize = "20px";
              g.innerText = `${d_r.name} - ${d_r.toggled}`;
              h.appendChild(g);
              const _ = document.createElement("input");
              _.type = "checkbox";
              _.checked = d_r.toggled;
      
              _.onchange = () => {
                d_r.toggled = _.checked;
                g.innerText = `${d_r.name} - ${d_r.toggled}`;
              };
      
              h.appendChild(_);
            } else if (d_r.type == "Color") {
              const g = document.createElement("div");
              g.style.fontSize = "20px";
              g.innerText = `${d_r.name} - ${d_r.current}`;
              h.appendChild(g);
              const _ = document.createElement("input");
              _.type = "color";
              _.value = d_r.current;
      
              _.onchange = () => {
                d_r.current = _.value;
                g.innerText = `${d_r.name} - ${d_r.current}`;
              };
      
              h.appendChild(_);
            }
          }
        }
      }