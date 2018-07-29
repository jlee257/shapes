class AppSetting {

  DEFAULT_PEN_COLOR = "rgba(0,0,0,1.00)";
  DEFAULT_PEN_SIZE = 5;

  DEFAULT_TOOL_POSITION = "Bottom right";

  DEFAULT_LINE_SIZE_MIN = 20;
  DEFAULT_LINE_SIZE_MAX = 50;
  DEFAULT_LINE_ANGLE_MIN = 0;
  DEFAULT_LINE_ANGLE_MAX = 180;

  DEFAULT_CURVE_SIZE_MIN = 45;
  DEFAULT_CURVE_SIZE_MAX = 80;
  DEFAULT_CURVE_COMPLEX_MIN = 1;
  DEFAULT_CURVE_COMPLEX_MAX = 3;

  DEFAULT_ELLIPSE_SIZE_MIN = 20;
  DEFAULT_ELLIPSE_SIZE_MAX = 50;
  DEFAULT_ELLIPSE_ROUND_MIN = 50;
  DEFAULT_ELLIPSE_ROUND_MAX = 85;
  DEFAULT_ELLIPSE_ANGLE_MIN = 0;
  DEFAULT_ELLIPSE_ANGLE_MAX = 90;

  DEFAULT_GUIDE_LINE_COLOR = "rgba(255,135,0,1.00)";
  DEFAULT_GUIDE_LINE_SIZE = 10;
  DEFAULT_GUIDE_LINE_STYLE = [20, 20];

  constructor() {
    log("constructed");
    this.pen_color = localStorage.getItem("pen_color");
    if (this.pen_color) {
      this.pen_color = DEFAULT_PEN_COLOR
      localStorage.setItem("pen_color", DEFAULT_PEN_COLOR);
    }

    this.pen_size = localStorage.getItem("pen_size");
    if (this.pen_size) {
      this.pen_size = DEFAULT_PEN_SIZE
      localStorage.setItem("pen_color", DEFAULT_PEN_COLOR);
    }


    this.tool_position = TOOL_POSITION;

    this.line_size_min = LINE_SIZE_MIN;
    this.line_size_max = LINE_SIZE_MAX;
    this.line_angle_min = LINE_ANGLE_MIN;
    this.line_angle_max = LINE_ANGLE_MAX;

    this.curve_size_min = CURVE_SIZE_MIN;
    this.curve_size_max = CURVE_SIZE_MAX;
    this.curve_complex_min = CURVE_COMPLEX_MIN;
    this.curve_complex_max = CURVE_COMPLEX_MAX;

    this.ellipse_size_min = ELLIPSE_SIZE_MIN;
    this.ellipse_size_max = ELLIPSE_SIZE_MAX;
    this.ellipse_round_min = ELLIPSE_ROUND_MIN;
    this.ellipse_round_max = ELLIPSE_ROUND_MAX;
    this.ellipse_angle_min = ELLIPSE_ANGLE_MIN;
    this.ellipse_angle_max = ELLIPSE_ANGLE_MAX;

    this.guide_line_color = GUIDE_LINE_COLOR;
    this.guide_line_size = GUIDE_LINE_SIZE;
    this.guide_line_style = GUIDE_LINE_STYLE;
  }

  getInstance() {
    log("getInstance");
    if (!instance) {
      instance = new AppSetting();
    }
    return instance;
  }



  getHexPenColor() {
    return getHexColor(this.pen_color);
  }

  getPenAlpha() {
    return getAlpha(this.pen_color);
  }

  getPenSize() {
    return pen_size;
  }

  // getPenSetting() {
  //   prased_pen_setting = {
  //     "pen_color": getHexColor(pen_setting["pen_color"]),
  //     "pen_transparency": getAlpha(pen_setting["pen_color"]),
  //     "pen_size": pen_setting["pen_size"]
  //   }
  //   return parsed_pen_setting
  // }

  setPenSetting(new_pen_setting) {
    pen_setting["pen_color"] = rgbaToHex(new_pen_setting["pen_color"], new_pen_setting["pen_transparency"]);
    pen_setting["pen_size"] = new_pen_setting["pen_size"];
    localStorage.setItem("pen_setting", pen_setting);
  }








  log(text) {
    console.log("AppSetting: " + text);
  }


  getAlpha(color) {
    var c = getRgbColorList(color);
    return c[3] * 100.0;
  }

  getHexColor(color) {
    var c = getRgbColorList(color);
    var hex = "#"
    for (var i = 0; i < 3; i++) {
      var singleHex = parseInt(c[i]).toString(16);
      (singleHex.length < 2) ? hex += "0" + singleHex : hex += singleHex;
    }
    return hex;
  }

  getRgbColorList(color) {
    var i = color.indexOf("(") + 1;
    return color.substring(i, color.indexOf(")", i)).split(",");
  }

  setAlpha(color, alpha) {
    var c = getRgbColorList(color);
    c[3] = (alpha / 100.0).toFixed(2).toString();
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
  }

  setHexColor(color, hexColor) {
    var c = getRgbColorList(color);
    for (var i = 0; i < 3; i++) {
      var channel = parseInt(hexColor.substring(1 + (i * 2), 3 + (i * 2)), 16);
      c[i] = channel;
    }
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
  }

  rgbaToHex(rgb, alpha) {
    var c = [0,0,0,0];
    for (var i = 0; i < 3; i++) {
      var channel = parseInt(rgb.substring(1 + (i * 2), 3 + (i * 2)), 16);
      c[i] = channel;
    }
    c[3] = (alpha / 100.0).toFixed(2).toString();
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
  }
}
