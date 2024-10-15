function hexToRgb(hexColor: string) {
    var match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return match 
      ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
      : { r: 255, g: 255, b: 255 };
  }
  
  export var clientName: string = "Justin Client v2";
  export var clientNameRaw: string = "Justin Client";
  export var version: string = "rev7";
  export var downloadurl: string = "https://bit.ly/JustinCEag";
  export var color: string = "#00c3ff";
  export var authors: string[] = ["Murturtle"];
  export var rgbColor = hexToRgb(color);
  export var normalizedRgb = {
    r: Math.round((rgbColor.r / 255 + Number.EPSILON) * 100) / 100,
    g: Math.round((rgbColor.g / 255 + Number.EPSILON) * 100) / 100,
    b: Math.round((rgbColor.b / 255 + Number.EPSILON) * 100) / 100
  };
  
