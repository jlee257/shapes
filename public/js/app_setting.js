class AppSetting {

  const PEN_COLOR = "rgba(0,0,0,1.00)";
  const PEN_SIZE = 5;
  const TOOL_POSITION = "Bottom right";
  const LINE_SIZE_MIN = 20;
  const LINE_SIZE_MAX = 50;
  const LINE_ANGLE_MIN = 0;
  const LINE_ANGLE_MAX = 180;
  const CURVE_SIZE_MIN = 45;
  const CURVE_SIZE_MAX = 80;
  const CURVE_COMPLEX_MIN = 1;
  const CURVE_COMPLEX_MAX = 3;
  const ELLIPSE_SIZE_MIN = 20;
  const ELLIPSE_SIZE_MAX = 50;
  const ELLIPSE_ROUND_MIN = 50;
  const ELLIPSE_ROUND_MAX = 85;
  const ELLIPSE_ANGLE_MIN = 0;
  const ELLIPSE_ANGLE_MAX = 90;
  const GUIDE_LINE_COLOR = "rgba(255,135,0,1.00)";
  const GUIDE_LINE_SIZE = 10;
  const GUIDE_LINE_STYLE = [20, 20];

  const STATE_LINE = 1;
  const STATE_CURVE = 2;
  const STATE_ELLIPSE = 3;
  const STATE_NOTE =9;

  constructor() {
    var pen_color = PEN_COLOR;
    var pen_size = PEN_SIZE;
    var tool_position = TOOL_POSITION;
    var line_size_min = LINE_SIZE_MIN;
    var line_size_max = LINE_SIZE_MAX;
    var line_angle_min = LINE_ANGLE_MIN;
    var line_angle_max = LINE_ANGLE_MAX;
    var curve_size_min = CURVE_SIZE_MIN;
    var curve_size_max = CURVE_SIZE_MAX;
    var curve_complex_min = CURVE_COMPLEX_MIN;
    var curve_complex_max = CURVE_COMPLEX_MAX;
    var ellipse_size_min = ELLIPSE_SIZE_MIN;
    var ellipse_size_max = ELLIPSE_SIZE_MAX;
    var ellipse_round_min = ELLIPSE_ROUND_MIN;
    var ellipse_round_max = ELLIPSE_ROUND_MAX;
    var ellipse_angle_min = ELLIPSE_ANGLE_MIN;
    var ellipse_angle_max = ELLIPSE_ANGLE_MAX;
    var guide_line_color = GUIDE_LINE_COLOR;
    var guide_line_size = GUIDE_LINE_SIZE;
    var guide_line_style = GUIDE_LINE_STYLE;
        
  }
}
