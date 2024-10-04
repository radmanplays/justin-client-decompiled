export function init(parent){
    
    function hsl2rgb(h, s, l){
      s /= 100;
      l /= 100;
      const k = n => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [255 * f(0), 255 * f(8), 255 * f(4)];
    };
  
    parent.onUpdate = function (){
      
      if(parent.getEnabled()){
        var rgb = hsl2rgb(Date.now()/10 % 360,100,50);
        var red = rgb[0];
        var green = rgb[1];
        var blue = rgb[2];
        var alpha = 255;
        //@ts-ignore
        ModAPI.mcinstance.$theWorld.$cloudColour = BigInt((red << 24) + (green << 16) + (blue << 8) + (alpha));
        }
    }

    parent.onDisable = function(){
      //@ts-ignore
      if(ModAPI.mcinstance.$theWorld != null){
        var rgb = hsl2rgb(0,0,100);
        var red = rgb[0];
        var green = rgb[1];
        var blue = rgb[2];
        var alpha = 255;
        //@ts-ignore
        ModAPI.mcinstance.$theWorld.$cloudColour = BigInt((red << 24) + (green << 16) + (blue << 8) + (alpha))
      }
    }
  }