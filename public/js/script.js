/*
This is a JavaScript (JS) file.
JavaScript is the programming language that powers the web.

To use this file, place the following <script> tag just before the closing </body> tag in your HTML file, making sure that the filename after "src" matches the name of your file...

    <script src="script.js"></script>

Learn more about JavaScript at https://developer.mozilla.org/en-US/Learn/JavaScript

When you're done, you can delete all of this grey text, it's just a comment.
*/

$(document).ready(function () {
  /* Initialization */
  var status = "line";
  var main_canvas = document.getElementById('main-canvas');
  var front_canvas = document.getElementById('front-canvas');
  var main_context = main_canvas.getContext('2d');
  var front_context = front_canvas.getContext('2d');

  // Default Settings
  var PEN_COLOR = "rgba(0,0,0,1.00)";
  var PEN_SIZE = 5;
  var TOOL_POSITION = "Bottom right";
  var LINE_SIZE_MIN = 20;
  var LINE_SIZE_MAX = 50;
  var LINE_ANGLE_MIN = 0;
  var LINE_ANGLE_MAX = 180;
  var CURVE_SIZE_MIN = 45;
  var CURVE_SIZE_MAX = 80;
  var CURVE_COMPLEX_MIN = 1;
  var CURVE_COMPLEX_MAX = 3;
  var ELLIPSE_SIZE_MIN = 20;
  var ELLIPSE_SIZE_MAX = 50;
  var ELLIPSE_ROUND_MIN = 50;
  var ELLIPSE_ROUND_MAX = 85;
  var ELLIPSE_ANGLE_MIN = 0;
  var ELLIPSE_ANGLE_MAX = 90;
  var GUIDE_LINE_COLOR = "rgba(255,135,0,1.00)";
  var GUIDE_LINE_SIZE = 10;
  var GUIDE_LINE_STYLE = [20, 20];
  
  // Settings
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
  

  
  main_context.lineWidth = pen_size;
  main_context.lineJoin = main_context.lineCap = 'round';

  front_context.lineWidth = pen_size;
  front_context.lineJoin = front_context.lineCap = 'round';

  var is_drawing, points = [];
  var line_points = [];
  var curve_points = [];
  var ellipse_points = [];
  var ellipse_radius = 0;
  
  function clearPage() {
    clearOverlay();
    clearMainPage();
    clearFrontPage();
  }

  function clearMainPage() {
    console.log("clearMainPage");
    main_context.clearRect(0, 0, main_canvas.width, main_canvas.height);
    points.length = 0;
    curve_points.length = 0;
    ellipse_points.length = 0;
    ellipse_radius = 0;
  }

  function clearFrontPage() {
    front_context.clearRect(0, 0, front_canvas.width, front_canvas.height);
  }
  
  function clearOverlay() {
    $("#intro-overlay").css("display", "none");
  }
  
  
  
  
  /* Menu Item Clicks */
  $("#nav-expand-menu-item").click(function() {
    menuItemClick($(this));
  });

  $("#nav-line-menu-item").click(function() {
    menuItemClick($(this));
    status = "line";
    showCanvas();
    drawRandomLine();
  });

  $("#nav-curve-menu-item").click(function() {
    menuItemClick($(this));
    status = "curve";
    showCanvas();
    drawRandomCurve();
  });

  $("#nav-ellipse-menu-item").click(function() {
    menuItemClick($(this));
    status = "ellipse";
    showCanvas();
    drawRandomEllipse();
  });

  $("#nav-note-menu-item").click(function() {
    menuItemClick($(this));
    status = "note";
    hideCanvas();
  });
  
  $("#license-info").click(function() {
    if ($("#license-info-text").css("display") == "none") {
      $("#license-info-text").css("display", "block");
      $(window).scrollTop($("#license-info-text").offset().top);
    } else {
      $("#license-info-text").css("display", "none")
    }
  });
  
  $("#copyright").html("Copyright © " + (new Date().getFullYear()) + " Sanlok Lee");
  
  $("#email-info").click(function() {
    var t1 = "jlee", t2 = "257";
    var t3 = "berkeley", t4 = "edu";
    $("#email-info-text").html(t1 + t2 + "@" + t3 + "." + t4);
    if ($("#email-info-text").css("display") == "none") {
      $("#email-info-text").css("display", "inline-block");
    } else {
      $("#email-info-text").css("display", "none");
    }
  });

  function menuItemClick(item) {
    if (item.attr("id") == "nav-expand-menu-item") {
      if ($('#nav-bar').hasClass('transform-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    } else {
      $(".menu-item").removeClass('nav-selected');
      item.addClass('nav-selected');
      openMenu();
    }
  }

  function openMenu() {
    $("#nav-bar").addClass('transform-active');
    $('#nav-expand-button-icon').addClass('glyphicons-chevron-left').removeClass('glyphicons-menu-hamburger');
    console.log("adding nav-open");
    $("#note").addClass("nav-open");
  }

  function closeMenu() {
    $("#nav-bar").removeClass('transform-active');
    $('#nav-expand-button-icon').removeClass('glyphicons-chevron-left').addClass('glyphicons-menu-hamburger');
    console.log("removing nav-open");
    $("#note").removeClass("nav-open");
  }
  
  function showCanvas() {
    clearPage();
    $("#canvas-container").css("display", "block");
    $("#note").css("display", "none");
  }
  
  function hideCanvas() {
    $("#canvas-container").css("display", "none");
    $("#note").css("display", "block");
  }
  


  /* Side Icon Modals - Pencil */
  $("#ruler-icon").click(function() {
    console.log("grid");

    var interval = 500;

    main_context.beginPath();
    for(var i = 0; i < 3000; i+=interval) {
      for (var j = 0; j < 2000; j+=interval) {
        main_context.moveTo(i, j);
        main_context.lineTo(i + interval, j);
        main_context.lineTo(i + interval, j + interval);
        main_context.lineTo(i, j + interval);
        main_context.lineTo(i, j);
      }
    }
    main_context.stroke();
  });

  $("#pencil-icon").click(function() {
    $("#input-pen-color").val(getHexColor(pen_color));
    $("#input-pen-transparency").slider( "option", "value", getAlpha(pen_color));
    $("#input-pen-size").slider( "option", "value", pen_size);
    
    console.log("pencil - pen-color:" + pen_color + " pen-size:" + pen_size);
    $("#pencil-modal").css("display", "block");
  });

  $("#refresh-icon").click(function() {
    clearPage();
    if (status == "line") {
      drawRandomLine();
    } else if (status == "curve") {
      drawRandomCurve();
    } else if (status == "ellipse") {
      drawRandomEllipse();
    }
  });

  $("#input-pen-color").change(function(event) {
    pen_color = setHexColor(pen_color, $(this).val());
    console.log("pen-color:" + pen_color);
  });

  $("#input-pen-transparency").slider({
    change: function(event, ui) {
      pen_color = setAlpha(pen_color, ui.value);
      $("#input-pen-transparency-value").text(ui.value);
      console.log("pen-transparency:" + ui.value + " new-color:" + pen_color);
    },
    range: "min",
    orientation: "horizontal",
    min: 0,
    max: 100,
    value: getAlpha(PEN_COLOR),
    slide: function(event, ui) {
      $("#input-pen-transparency-value").text(ui.value);
    }
  });
  
  $("#input-pen-size").slider({
    change: function(event, ui) {
      pen_size = ui.value;
      console.log("pen-size:" + pen_size);
      $("#input-pen-size-value").text(ui.value);
    },
    range: "min",
    orientation: "horizontal",
    min: 1,
    max: 60,
    value: PEN_SIZE,
    slide: function(event, ui) {
      $("#input-pen-size-value").text(ui.value);
    }
  });

  $("#input-pencil-reset").click(function () {
    pen_color = PEN_COLOR;
    $("#input-pen-color").val(getHexColor(PEN_COLOR));
    $("#input-pen-transparency").slider( "option", "value", getAlpha(PEN_COLOR));
    $("#input-pen-size").slider( "option", "value", PEN_SIZE);

    console.log("reset - pen-color:" + pen_color + " pen-size:" + pen_size);
  });
  
  
  
  
  /* Side Icon Modals - CircleSettings */
  $("#function-icon").click(function() {
    $('#input-tool-position').val(tool_position);
    $('#input-tool-position').selectmenu("refresh");
    if (status == "line") {
      console.log("open settings - line");
      $("#input-line-setting").css("display", "block");
      $("#input-curve-setting").css("display", "none");
      $("#input-ellipse-setting").css("display", "none");
      $("#input-line-size").slider("option", "values", [line_size_min, line_size_max]);
      $("#input-line-angle").slider("option", "values", [line_angle_min, line_angle_max]);
    } else if (status == "curve") {
      console.log("open settings - curve");
      $("#input-line-setting").css("display", "none");
      $("#input-curve-setting").css("display", "block");
      $("#input-ellipse-setting").css("display", "none");
      $("#input-curve-size").slider("option", "values", [curve_size_min, curve_size_max]);
      $("#input-curve-complex").slider("option", "values", [curve_complex_min, curve_complex_max]);
    } else if (status == "ellipse") {
      console.log("open settings - ellipse");
      $("#input-line-setting").css("display", "none");
      $("#input-curve-setting").css("display", "none");
      $("#input-ellipse-setting").css("display", "block");
      $("#input-ellipse-size").slider("option", "values", [ellipse_size_min, ellipse_size_max]);
      $("#input-ellipse-round").slider("option", "values", [ellipse_round_min, ellipse_round_max]);
      $("#input-ellipse-angle").slider("option", "values", [ellipse_angle_min, ellipse_angle_max]);
    }
    $("#settings-modal").css("display", "block");
  });
  
  $("#input-tool-position").selectmenu({
    change: function( event, ui ) {
      console.log("tool position=" + ui.item.value);
      $("#side-icon-container").removeClass("position1");
      $("#side-icon-container").removeClass("position2");
      $("#side-icon-container").removeClass("position3");
      $("#side-icon-container").removeClass("position4");

      if (ui.item.value == "Top left") {
        $("#side-icon-container").addClass("position1");
      } else if (ui.item.value == "Top right") {
        $("#side-icon-container").addClass("position2");
      } else if (ui.item.value == "Bottom left") {
        $("#side-icon-container").addClass("position3");
      } else {
        $("#side-icon-container").addClass("position4");
      }
    }
  });
  
  $("#input-line-size").slider({
    change: function(event, ui) {
      line_size_min = ui.values[0];
      line_size_max = ui.values[1];
      $("#input-line-size-min-value").text(ui.values[0]);
      $("#input-line-size-max-value").text(ui.values[1]);
      console.log("line-size:" + line_size_min + "-" + line_size_max);
    },
    range: true,
    orientation: "horizontal",
    min: 1,
    max: 100,
    values: [LINE_SIZE_MIN, LINE_SIZE_MAX],
    slide: function(event, ui) {
      $("#input-line-size-min-value").text(ui.values[0]);
      $("#input-line-size-max-value").text(ui.values[1]);
    }
  });
  
  $("#input-line-angle").slider({
    change: function(event, ui) {
      line_angle_min = ui.values[0];
      line_angle_max = ui.values[1];
      $("#input-line-angle-min-value").text(ui.values[0]);
      $("#input-line-angle-max-value").text(ui.values[1]);
      console.log("line-angle:" + line_angle_min + "-" + line_angle_max);
    },
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 180,
    values: [LINE_ANGLE_MIN, LINE_ANGLE_MAX],
    slide: function(event, ui) {
      $("#input-line-angle-min-value").text(ui.values[0]);
      $("#input-line-angle-max-value").text(ui.values[1]);
    }
  });
  
  $("#input-curve-size").slider({
    change: function(event, ui) {
      curve_size_min = ui.values[0];
      curve_size_max = ui.values[1];
      $("#input-curve-size-min-value").text(ui.values[0]);
      $("#input-curve-size-max-value").text(ui.values[1]);
      console.log("curve-size:" + curve_size_min + "-" + curve_size_max);
    },
    range: true,
    orientation: "horizontal",
    min: 1,
    max: 100,
    values: [CURVE_SIZE_MIN, CURVE_SIZE_MAX],
    slide: function(event, ui) {
      $("#input-curve-size-min-value").text(ui.values[0]);
      $("#input-curve-size-max-value").text(ui.values[1]);
    }
  });

  $("#input-curve-complex").slider({
    change: function(event, ui) {
      curve_complex_min = ui.values[0];
      curve_complex_max = ui.values[1];
      $("#input-curve-complex-min-value").text(ui.values[0]);
      $("#input-curve-complex-max-value").text(ui.values[1]);
      console.log("curve-complexity:" + curve_complex_min + "-" + curve_complex_max);
    },
    range: true,
    orientation: "horizontal",
    min: 1,
    max: 10,
    values: [CURVE_COMPLEX_MIN, CURVE_COMPLEX_MAX],
    slide: function(event, ui) {
      $("#input-curve-complex-min-value").text(ui.values[0]);
      $("#input-curve-complex-max-value").text(ui.values[1]);
    }
  });

  $("#input-ellipse-size").slider({
    change: function(event, ui) {
      ellipse_size_min = ui.values[0];
      ellipse_size_max = ui.values[1];
      $("#input-ellipse-size-min-value").text(ui.values[0]);
      $("#input-ellipse-size-max-value").text(ui.values[1]);
      console.log("ellipse-size:" + ellipse_size_min + "-" + ellipse_size_max);
    },
    range: true,
    orientation: "horizontal",
    min: 1,
    max: 100,
    values: [ELLIPSE_SIZE_MIN, ELLIPSE_SIZE_MAX],
    slide: function(event, ui) {
      $("#input-ellipse-size-min-value").text(ui.values[0]);
      $("#input-ellipse-size-max-value").text(ui.values[1]);
    }
  });
  
  $("#input-ellipse-round").slider({
    change: function(event, ui) {
      ellipse_round_min = ui.values[0];
      ellipse_round_max = ui.values[1];
      $("#input-ellipse-round-min-value").text(ui.values[0]);
      $("#input-ellipse-round-max-value").text(ui.values[1]);
      console.log("ellipse-roundness:" + ellipse_round_min + "-" + ellipse_round_max);
    },
    range: true,
    orientation: "horizontal",
    min: 1,
    max: 100,
    values: [ELLIPSE_ROUND_MIN, ELLIPSE_ROUND_MAX],
    slide: function(event, ui) {
      $("#input-ellipse-force-round").prop('checked', false);
      $("#input-ellipse-round-min-value").text(ui.values[0]);
      $("#input-ellipse-round-max-value").text(ui.values[1]);
    }
  });
  
  $("#input-ellipse-force-round").change(function() {
    if (this.checked) {
      $("#input-ellipse-round").slider("option", "values", [100, 100]);
    }
  });
  
  $("#input-ellipse-angle").slider({
    change: function(event, ui) {
      ellipse_angle_min = ui.values[0];
      ellipse_angle_max = ui.values[1];
      $("#input-ellipse-angle-min-value").text(ui.values[0]);
      $("#input-ellipse-angle-max-value").text(ui.values[1]);
      console.log("ellipse-angle:" + ellipse_angle_min + "-" + ellipse_angle_max);
    },
    range: true,
    orientation: "horizontal",
    min: 0,
    max: 180,
    values: [ELLIPSE_ANGLE_MIN, ELLIPSE_ANGLE_MAX],
    slide: function(event, ui) {
      $("#input-ellipse-angle-min-value").text(ui.values[0]);
      $("#input-ellipse-angle-max-value").text(ui.values[1]);
    }
  });
  
  $("#input-settings-reset").click(function () {
    $('#input-tool-position').val(TOOL_POSITION);
    $('#input-tool-position').selectmenu("refresh");
    if (status == "line") {
      console.log("reset settings - line");
      $("#input-line-size").slider("option", "values", [LINE_SIZE_MIN, LINE_SIZE_MAX]);
      $("#input-line-angle").slider("option", "values", [LINE_ANGLE_MIN, LINE_ANGLE_MAX]);
    } else if (status == "curve") {
      console.log("reset settings - curve");
      $("#input-curve-size").slider("option", "values", [CURVE_SIZE_MIN, CURVE_SIZE_MAX]);
      $("#input-curve-complex").slider("option", "values", [CURVE_COMPLEX_MIN, CURVE_COMPLEX_MAX]);
    } else if (status == "ellipse") {
      console.log("reset settings - ellipse");
      $("#input-ellipse-force-round").prop('checked', false);
      $("#input-ellipse-size").slider("option", "values", [ELLIPSE_SIZE_MIN, ELLIPSE_SIZE_MAX]);
      $("#input-ellipse-round").slider("option", "values", [ELLIPSE_ROUND_MIN, ELLIPSE_ROUND_MAX]);
      $("#input-ellipse-angle").slider("option", "values", [ELLIPSE_ANGLE_MIN, ELLIPSE_ANGLE_MAX]);
    }
  });



  $(".close-button").click(function() {
    $(".modal").css("display", "none");
  });

  $(window).click(function(e) {
    //    console.log("window");
    var $w = $(e.target);
    if ($w.hasClass("modal")) {
      console.log("window clicked");
      $(".modal").css("display", "none");
    }
  });





  /* Math Functions */
  function midPointBtw(p1, p2, m = 0.5) {
    return {
      x: p1.x + (p2.x - p1.x) * m,
      y: p1.y + (p2.y - p1.y) * m
    };
  }

  function distanceBetween(x1, y1, x2, y2) {
    return Math.sqrt((y2-y1)**2 + (x2-x1)**2);
  }

  function distanceBetweenSquared(x1, y1, x2, y2) {
    return (y2-y1)**2 + (x2-x1)**2;
  }

  function distanceFromLine(x1, y1, x2, y2, xp, yp) {
    return Math.abs((y2-y1)*xp - (x2-x1)*yp + x2*y1 - y2*x1)/Math.sqrt((y2-y1)**2 + (x2-x1)**2);
  } 

  function drawDot(ctx,x,y,size) {
    // Draw a filled circle
    main_context.fillStyle = guide_line_color;
    main_context.beginPath();
    main_context.arc(x, y, size, 0, Math.PI*2, true); 
    main_context.closePath();
    main_context.fill();
  }
  
  function drawX(x, size=5) {
    main_context.strokeStyle = guide_line_color;
    main_context.lineWidth = size;
    main_context.setLineDash(guide_line_style);
    main_context.beginPath();
    main_context.moveTo(x, 0);
    main_context.lineTo(x, 2000);
    main_context.stroke();
  }

  function drawY(y, size=5) {
    main_context.strokeStyle = guide_line_color;
    main_context.lineWidth = size;
    main_context.setLineDash(guide_line_style);
    main_context.beginPath();
    main_context.moveTo(0, y);
    main_context.lineTo(3000, y);
    main_context.stroke();
  }
  
  function ranv(min, max) {
    return Math.random() * (max - min) + min;
  }

  function rotationMatrix(px, py, xoff, yoff, degree) {
    var cos0 = Math.cos(degree);
    var sin0 = Math.sin(degree);
    return {
      x: xoff*cos0 - yoff*sin0 + px,
      y: xoff*sin0 + yoff*cos0 + py
    }
  }

  function getRotation(px, py, xoff, yoff) {
    if (xoff < px) {
      return Math.atan((yoff-py)/(xoff-px)) + Math.PI;
    } else if (yoff < py){
      return Math.atan((yoff-py)/(xoff-px)) + 2*Math.PI;
    } else {
      return Math.atan((yoff-py)/(xoff-px));
    }
  }

  function getRotationBucket(px, py, xoff, yoff) {
    return Math.floor(getRotation(px, py, xoff, yoff) * 5 / Math.PI);
  }
  
  function getAlpha(color) {
    var c = getRgbColorList(color);
    return c[3] * 100.0;
  }

  function getHexColor(color) {
    var c = getRgbColorList(color);
    var hex = "#"
    for (var i = 0; i < 3; i++) {
      var singleHex = parseInt(c[i]).toString(16);
      (singleHex.length < 2) ? hex += "0" + singleHex : hex += singleHex;
    }
    return hex;
  }

  function getRgbColorList(color) {
    var i = color.indexOf("(") + 1;
    return color.substring(i, color.indexOf(")", i)).split(",");
  }
  
  function setAlpha(color, alpha) {
    var c = getRgbColorList(color);
    c[3] = (alpha / 100.0).toFixed(2).toString();
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
  }

  function setHexColor(color, hexColor) {
    var c = getRgbColorList(color);
    for (var i = 0; i < 3; i++) {
      var channel = parseInt(hexColor.substring(1 + (i * 2), 3 + (i * 2)), 16);
      c[i] = channel;
    }
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + c[3] + ")";
  }
  
  
  



  /* Input Handling */
  function getTouchPoint(ev) {
    var rect = front_canvas.getBoundingClientRect();
    ev._x = (ev.touches[0].clientX - rect.left)*3000/front_canvas.clientWidth;
    ev._y = (ev.touches[0].clientY - rect.top)*2000/front_canvas.clientHeight;
    return ev;
  }

  function getMousePoint(ev) {
    // console.log(ev.layerX + " " + ev.offsetX + " " + ev.clientX);
    if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX*3000/front_canvas.clientWidth;
      ev._y = ev.offsetY*2000/front_canvas.clientHeight;
      // console.log("here1" + ev._x + " " + ev.clientX);
    } else if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
      // console.log("here2" + ev._x + " " + ev.layerX);
    } 
    return ev;
  }



  front_canvas.onmousedown = function(e) {

    e.preventDefault();
    closeMenu();
    clearOverlay();

    front_context.strokeStyle = pen_color;
    front_context.lineWidth = pen_size;

    // $("#sometext").html("onmousedown pen_color=" + pen_color + " pen_size=" + pen_size);
    console.log("onmousedown: pen_color=" + pen_color + " pen_size=" + pen_size);

    e = getMousePoint(e);
    is_drawing = true;
    points.push({ x: e._x, y: e._y });
  };

  front_canvas.ontouchstart = function(e) {

    e.preventDefault();
    closeMenu();
    clearOverlay();

    front_context.strokeStyle = pen_color;
    front_context.lineWidth = pen_size;

    // $("#sometext").html("ontouchstart pen_color=" + pen_color + " pen_size=" + pen_size);
    console.log("ontouchstart: pen_color=" + pen_color + " pen_size=" + pen_size);


    e = getTouchPoint(e);
    is_drawing = true;
    points.push({ x: e._x, y: e._y });
  }



  front_canvas.onmousemove = function(e) {
    e.preventDefault();
    if (!is_drawing) return;

    e = getMousePoint(e);
    points.push({ x: e._x, y: e._y });

    clearFrontPage();
    front_context.beginPath();

    var p1 = points[0];
    var p2 = points[1];

    front_context.moveTo(p1.x, p1.y);
    //    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var mid_point = midPointBtw(p1, p2);
      //      drawDot(ctx, p1.x, p1.y, 6);
      //      drawDot(ctx, midPoint.x, midPoint.y, 12);
      front_context.quadraticCurveTo(p1.x, p1.y, mid_point.x, mid_point.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    //    ctx.lineTo(p1.x, p1.y);
    front_context.stroke();


    //    var len = points.length;
    //    if (len >= 3) {
    //
    //
    //      var p1 = midPointBtw(points[len-3], points[len-2]);
    ////      drawDot(ctx, p1.x, p1.y, pen_size/2);
    //
    //      ctx.beginPath();
    //      ctx.moveTo(p1.x, p1.y);
    //      var midPoint = midPointBtw(points[len-2], points[len-1]);
    //      ctx.quadraticCurveTo(points[len-2].x, points[len-2].y, midPoint.x, midPoint.y);
    //      ctx.stroke();
    //    } else if (len == 2) {
    //      ctx.beginPath();
    //      ctx.moveTo(points[0].x, points[0].y);
    //      ctx.lineTo(points[1].x, points[1].y);
    //      ctx.stroke();
    //    } else {
    //      return;
    //    }
  };

  front_canvas.ontouchmove = function(e) {
    e.preventDefault();
    if (!is_drawing) return;
    // console.log("ontouch");

    e = getTouchPoint(e);
    points.push({ x: e._x, y: e._y });


    clearFrontPage();
    front_context.beginPath();

    var p1 = points[0];
    var p2 = points[1];

    front_context.moveTo(p1.x, p1.y);
    //    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      
      var mid_point = midPointBtw(p1, p2);
      
      front_context.quadraticCurveTo(p1.x, p1.y, mid_point.x, mid_point.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    
    front_context.stroke();
  };


  front_canvas.onmouseup = function() {
    is_drawing = false;

    copyToMainCanvas();

    if (status == "line") {
      linearRegression();
    } else if (status == "curve") {
      curveApproximation();
    } else if (status == "ellipse") {
      ellipseErrorCalculation();
    }
    points.length = 0;
  };

  front_canvas.ontouchend = function() {
    is_drawing = false;
    
    copyToMainCanvas();
    
    if (status == "line") {
      linearRegression();
    } else if (status == "curve") {
      curveApproximation();
    } else if (status == "ellipse") {
      ellipseErrorCalculation();
    }
    points.length = 0;
  }
  
  function copyToMainCanvas() {
    clearFrontPage();

    main_context.strokeStyle = pen_color;
    main_context.lineWidth = pen_size;
    main_context.setLineDash([]);

    // var prevtext = $("#sometext").html();
    // $("#sometext").html(prevtext + "<p>copytomaincanvas pen_color=" + pen_color + " pen_size=" + pen_size);
    console.log("copyToMainCanvas: pen_color=" + pen_color + " pen_size=" + pen_size);
    main_context.beginPath();

    var p1 = points[0];
    var p2 = points[1];

    main_context.moveTo(p1.x, p1.y);
    //    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var mid_point = midPointBtw(p1, p2);
      //      drawDot(ctx, p1.x, p1.y, 6);
      //      drawDot(ctx, midPoint.x, midPoint.y, 12);
      main_context.quadraticCurveTo(p1.x, p1.y, mid_point.x, mid_point.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    main_context.stroke();
  }





  /* Drawing Calculations */
  function drawRandomLine() {
    var center, p1, p2, degree, size;
    
    center = {
      x:ranv(1400, 1600),
      y:ranv(950, 1050)
    }
    
    degree = Math.PI - ranv(line_angle_min * Math.PI / 180, line_angle_max * Math.PI / 180);
    size = ranv(line_size_min*8, line_size_max*8);

    p1 = rotationMatrix(center.x, center.y, size, 0, degree);
    p2 = rotationMatrix(center.x, center.y, -size, 0, degree);
    
    line_points.length = 0;
    line_points.push(p1, p2);
    
    drawDot(main_context, p1.x, p1.y, guide_line_size*2);
    drawDot(main_context, p2.x, p2.y, guide_line_size*2);
    
    console.log("Drawing line: length=" + size + " angle=" + degree + " p1=" + JSON.stringify(p1) + " p2=" + JSON.stringify(p2) + " color=" + guide_line_color);

    main_context.strokeStyle = guide_line_color;
    main_context.lineWidth = guide_line_size;
    main_context.setLineDash(guide_line_style);
    main_context.beginPath();
    main_context.moveTo(p1.x, p1.y);
    main_context.lineTo(p2.x, p2.y);
    main_context.stroke();
  }
  
  
  function linearEstimation() {
    var start = points[0];
    var last = points[points.length - 1];

    var err = 0;
    for(var i = 1, len = points.length - 1; i < len; i++) {
      err = err + (distanceFromLine(start.x, start.y, last.x, last.y, points[i].x, points[i].y))**2;
    };

    try {
      err = err * 1000 / (points.length-2) / (distanceBetween(start.x, start.y, last.x, last.y) + 1000);
      $("#sometext").html("error=" + err + " points=" + (points.length-2) + " average=" + err/(points.length-2) + " distance=" + distanceBetween(start.x, start.y, last.x, last.y));

      main_context.beginPath();
      var color;

      if (err < 3.0) {
        color = "rgba(0,255,0,1.00)";
      } else if (err < 9.0) {
        color = "rgba(" + Math.floor((err-3.0)*20 + 135) + ",255,0,1.00)";
      } else if (err < 19.0) {
        color = "rgba(255," + Math.floor((19.0-err)*25) + ",0,1.00)";
      } else {
        color = "rgba(255,0,0,1.00)";
      }
      main_context.strokeStyle = color;
      main_context.moveTo(start.x, start.y);
      main_context.lineTo(last.x, last.y);
      main_context.stroke();

      main_context.strokeStyle = "#rgba(0,0,0,1.00)";
    } catch (e) {
      $("#sometext").html("error=" + 0);
    }
  }

  function linearRegression() {
    var x_sum = 0.0, y_sum = 0.0, x2_sum = 0.0, y2_sum = 0.0, xy_sum = 0.0;

    for (var i = 0, len = points.length; i < len; i++) {
      x_sum += points[i].x;
      x2_sum += points[i].x**2;
      y_sum += points[i].y;
      y2_sum += points[i].y**2;
      xy_sum += points[i].x * points[i].y;
    }
    // console.log(x_sum, x2_sum, y_sum, y2_sum, xy_sum);

    var ssxx = x2_sum - x_sum / points.length * x_sum;
    var ssyy = y2_sum - y_sum / points.length * y_sum;
    var ssxy = xy_sum - x_sum / points.length * y_sum;

    var xcof = ssxy;
    var ycof = -ssxx;
    var cof = x2_sum / points.length * y_sum - xy_sum / points.length * x_sum;

    for (var i = 0, len = points.length; i < len; i++) {
      x_sum += points[i].x;
      x2_sum += points[i].x**2;
      y_sum += points[i].y;
      y2_sum += points[i].y**2;
      xy_sum += points[i].x * points[i].y;
    }

    plotLine(xcof, ycof, cof);
  }

  function linearRegression2() { 

    var x_sum = 0.0, y_sum = 0.0, x2_sum = 0.0, y2_sum = 0.0, xy_sum = 0.0, n = points.length;

    for (var i = 0, len = points.length; i < len; i++) {
      x_sum += points[i].x;
      x2_sum += points[i].x**2;
      y_sum += points[i].y;
      y2_sum += points[i].y**2;
      xy_sum += points[i].x * points[i].y;
    }
    // console.log(x_sum, x2_sum, y_sum, y2_sum, xy_sum);

    var ssxx = x2_sum - x_sum / points.length * x_sum;
    var ssyy = y2_sum - y_sum / points.length * y_sum;
    var ssxy = xy_sum - x_sum / points.length * y_sum;

    var B = ((y2_sum - y_sum**2 / n) - (x2_sum - x_sum**2 / n)) / (x_sum / n * y_sum - xy_sum) / 2;
    var cofb = (-B) + Math.sqrt(B**2 + 1);
    var cofa = y_sum / n - cofb * x_sum / n;

    var err = ssxy / ssxx * ssxy / ssyy;


    console.log("ssxy=" + ssxy + " ssxx=" + ssxx + " ssyy=" + ssyy + " error=" + err);
    console.log("ssxy=" + ssxy + " ssxx=" + ssxx + " ssyy=" + ssyy + " error=" + (ssxy / ssyy * ssxy / ssxx));

    // console.log("y=(" + cofb + ")x + (" + cofa + ") " + err);

    plotLine(-cofb, 1, -cofa, "rgba(255,0,0,1.00)");

    cofb = (-B) - Math.sqrt(B**2 + 1);
    cofa = y_sum / n - cofb * x_sum / n;
    // console.log("y=(" + cofb + ")x + (" + cofa + ")" + err);
    plotLine(-cofb, 1, -cofa, "rgba(0,255,0,1.00)");
  }

  function plotLine(xcof, ycof, cof) {
    var x_interx = (-cof / ycof);
    var y_interx = (-cof / xcof);
    var x3000_interx = (-cof - xcof*3000) / ycof;
    var y2000_interx = (-cof - ycof*2000) / xcof;
    // var err = Math.sqrt(ssxy/ ssxx * ssxy / ssyy);

    // find point a
    var coor = [];
    if (0 < x_interx && x_interx < 2000) {
      coor.push({x:0, y:x_interx});
    }
    if (0 < y_interx && y_interx < 3000) {
      coor.push({x:y_interx, y:0});
    }
    if (0 < x3000_interx && x3000_interx < 2000) {
      coor.push({x:3000, y:x3000_interx});
    }
    if (0 < y2000_interx && y2000_interx < 3000) {
      coor.push({x:y2000_interx, y:2000});
    }

    // console.log(coor);

    // $("#sometext").html("eq=(" + xcof + ")x + (" + ycof + ")y + (" + cof + ")");

    if (coor.length == 2) {
      main_context.beginPath();
      // var err=0;
      var color;

      var err = 0;
      for (var i = 0, len = points.length; i < len; i++) {
        err += distanceFromLine(coor[0].x, coor[0].y, coor[1].x, coor[1].y, points[i].x, points[i].y)**2;
      }
      err = err / points.length;
      $("#sometext").html("err=" + err);

      if (err < 12) {
        color = "rgba(0,255,0,1.00)";
      } else if (err < 20) {
        color = "rgba(255,255,0,1.00)";
      } else if (err < 30) {
        color = "rgba(255,127,0,1.00)";
      } else {
        color = "rgba(255,0,0,1.00)";
      }

      main_context.strokeStyle = color;
      main_context.lineWidth = 3;
      main_context.moveTo(coor[0].x, coor[0].y);
      main_context.lineTo(coor[1].x, coor[1].y);
      main_context.stroke();
    }
  }

  function drawRandomCurve() {
    curve_points.length = 0;

    var p1, p2, p3, p4, p5;
    var s = ranv(curve_size_min, curve_size_max);
    var c = ranv(curve_complex_min, curve_complex_max);
    
    var xmin = 1500-(1200*s/100);
    var xmax = 1500+(1200*s/100);
    var ymin = 1000-(800*s/100);
    var ymax = 1000+(800*s/100);
    
    var xc = (xmax-xmin)*(c+1)/11;
    var yc = (ymax-ymin);


    p1 = { x:ranv(xmin, xmin+xc), y:ranv(ymin, ymax) };
    p2 = { x:ranv(1500-xc/2, 1500+xc/2), y:ranv(ymin, ymin+yc) };
    p4 = { x:ranv(1500-xc/2, 1500+xc/2), y:ranv(ymax-yc, ymax) };
    p5 = { x:ranv(xmax-xc, xmax), y:ranv(ymin, ymax), z: 9000000 };
    p3 = midPointBtw(p2, p4, ranv(0.5-(c+1)/22, 0.5+(c+1)/22));
    
    if (ranv(0, 1) > 0.5) {
      var pt = p2;
      p2 = p4;
      p4 = pt;
    }
    
    console.log("Drawing curve: size=" + s + " complexity=" + c);

    drawDot(main_context,p1.x,p1.y,guide_line_size*2);
    drawDot(main_context,p2.x,p2.y,guide_line_size*2);
    drawDot(main_context,p3.x,p3.y,guide_line_size*2);
    drawDot(main_context,p4.x,p4.y,guide_line_size*2);
    drawDot(main_context,p5.x,p5.y,guide_line_size*2);

    main_context.strokeStyle = guide_line_color;
    main_context.lineWidth = guide_line_size;
    main_context.setLineDash(guide_line_style);
    main_context.beginPath();
    main_context.moveTo(p1.x, p1.y);
    main_context.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    main_context.quadraticCurveTo(p4.x, p4.y, p5.x, p5.y);
    main_context.stroke();

    main_context.beginPath();
    main_context.moveTo(p1.x, p1.y);
    // console.log(points);
    // P(t) = (1-t)^2*P0 + 2t(1-t)P1 +t^2*P2.

    for (var t = 0; t < 1; t+=0.05) {
      curve_points.push({
        x: ((1-t)**2)*p1.x + 2*t*(1-t)*p2.x + t*t*p3.x,
        y: ((1-t)**2)*p1.y + 2*t*(1-t)*p2.y + t*t*p3.y,
        z: 9000000
      });
    }

    for (var t = 0; t < 1; t+=0.05) {
      curve_points.push({
        x: ((1-t)**2)*p3.x + 2*t*(1-t)*p4.x + t*t*p5.x,
        y: ((1-t)**2)*p3.y + 2*t*(1-t)*p4.y + t*t*p5.y,
        z: 9000000
      });
    }

    curve_points.push(p5);

    // curve_points.forEach(function(p) {
    //   drawDot(ctx,p.x,p.y,12);
    // });
  }


  function curveApproximation() {

    var err = 0;
    var errz = 0;
    for (var i = 0, ilen = points.length; i < ilen; i++) {

      var e = 3000*3000;

      for (var j = 0, jlen = curve_points.length; j < jlen; j++) {

        var dist = distanceBetweenSquared(points[i].x, points[i].y, curve_points[j].x, curve_points[j].y);

        if (dist < curve_points[j].z) {
          curve_points[j].z = dist;
        }

        if (dist < e) {
          e = dist;
        }
      }

      // console.log("point=" + i + "{" + points[i].x + "," + points[i].y + "} err=" + e);
      err += e;
    }
    
    for (var j = 0, jlen = curve_points.length; j < jlen; j++) {
      errz += curve_points[j].z;
    }

    // console.log("final e=" + (err/points.length + errz/curve_points.length) + " points=" + points.length + " errtotal=" + err);
    $("#sometext").html("err=" + (err/points.length + errz/curve_points.length));

  }

  function drawRandomEllipse() {

    var center, f1, f2;
    var a, b, c, degree;


    a = ranv(ellipse_size_min*8, ellipse_size_max*8);
    b = ranv(ellipse_round_min*a/100, ellipse_round_max*a/100);
    degree = Math.PI - ranv(ellipse_angle_min * Math.PI / 180, ellipse_angle_max * Math.PI / 180);
    console.log("Drawing Ellipse: a=" + a + " b=" + b + " rotation=" + degree);
    ellipse_radius = 2*a;

    center = {
      x:ranv(1400, 1600),
      y:ranv(950, 1050)
    }

    c = Math.sqrt(a**2 - b**2);

    f1 = rotationMatrix(center.x, center.y, c, 0, degree);
    f2 = rotationMatrix(center.x, center.y, -c, 0, degree);

    drawDot(main_context, f1.x, f1.y, guide_line_size*2);
    drawDot(main_context, f2.x, f2.y, guide_line_size*2);

    ellipse_points.length = 0;
    ellipse_points.push(center, f1, f2);

    main_context.strokeStyle = guide_line_color;
    main_context.lineWidth = guide_line_size;
    main_context.setLineDash(guide_line_style);
    main_context.beginPath();
    main_context.ellipse(center.x, center.y, a, b, degree, 0, 2 * Math.PI);
    main_context.stroke();
    main_context.moveTo(center.x + a*Math.cos(degree), center.y + a*Math.sin(degree));
    main_context.lineTo(center.x - a*Math.cos(degree), center.y - a*Math.sin(degree));
    main_context.stroke();
    main_context.moveTo(center.x - b*Math.sin(degree), center.y + b*Math.cos(degree));
    main_context.lineTo(center.x + b*Math.sin(degree), center.y - b*Math.cos(degree));
    main_context.stroke();
  }

  function ellipseErrorCalculation() {

    var err = 0;
    var errz = 0;

    var center = ellipse_points[0];
    var f1 = ellipse_points[1];
    var f2 = ellipse_points[2];

    var completeness = [];
    for (var _ = 0; _ < 10; _++) {
      completeness.push(700);
    }

    for (var i = 0, ilen = points.length; i < ilen; i++) {
      var dist = distanceBetween(f1.x, f1.y, points[i].x, points[i].y);
      dist += distanceBetween(f2.x, f2.y, points[i].x, points[i].y);

      var e = Math.abs(dist - ellipse_radius);
      err += e;

      var bucket = getRotationBucket(center.x, center.y, points[i].x, points[i].y);
      console.log("x:" + (points[i].x - center.x) + " y:" + (points[i].y - center.y) + " bucket=" + bucket);
      if (completeness[bucket] > e) {
        completeness[bucket] = e;
      }
    }

    for (var b = 0, len = completeness.length; b < len; b++) {
      errz += completeness[b];
    }

    console.log(completeness);
    console.log("error=" + (err/points.length + errz/completeness.length) + " n=" + points.length);

    $("#sometext").html("err=" + (err/points.length + errz/completeness.length));
  }


  //  var canvas, context, isDrawing;
  //  var points = [];
  //
  //  function init () {
  //
  //    // Find the canvas element.
  //    canvas = document.getElementById('main-canvas');
  //    context = canvas.getContext('2d');
  //    
  //    
  //    // Context configuration.
  //    context.lineWith = 5;
  //    context.lineJoin = context.lineCap = 'round';
  //    
  //    
  //    // Attach the mousedown, mousemove and mouseup event listeners.
  //    canvas.addEventListener('pointerdown', p_dn, false);
  //    canvas.addEventListener('pointerup', p_up, false);
  //    canvas.addEventListener('pointermove', p_mv, false);
  //  }
  //  
  //
  //  function p_dn(e) {
  //    isDrawing = true;
  //    points.push({x: e.clientX, y: e.clientY});
  //  }
  //
  //  function p_up(e) {
  //    isDrawing = false;
  //    points.length = 0;
  //  }
  //  
  //  function p_mv(e) {
  //    if (!isDrawing) return;
  //    
  //    points.push({ x: e.clientX, y: e.clientY });
  //    
  //    var p1 = points[0];
  //    var p2 = points[1];
  //
  //    context.beginPath();
  //    context.moveTo(p1.x, p1.y);
  ////    console.log(points);
  //
  //    for (var i = 1, len = points.length; i < len; i++) {
  //      // we pick the point between pi+1 & pi+2 as the
  //      // end point and p1 as our control point
  //      var midPoint = midPointBtw(p1, p2);
  //      context.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
  //      p1 = points[i];
  //      p2 = points[i+1];
  //    }
  //    // Draw last line as a straight line while
  //    // we wait for the next point to be able to calculate
  //    // the bezier control point
  //    context.lineTo(p1.x, p1.y);
  //    context.stroke();
  //  }
  //  
  //  
  //  function midPointBtw(p1, p2) {
  //    return {
  //      x: p1.x + (p2.x - p1.x) / 2,
  //      y: p1.y + (p2.y - p1.y) / 2
  //    };
  //  }
  //
  //  init();
  
  function init() {
    var initial_status = window.location.hash;
    
    console.log("link to: " + initial_status);

    if (initial_status == "#line") {
      status = "line";
      menuItemClick($("#nav-line-menu-item"));
      drawRandomLine();
    } else if (initial_status == "#curve") {
      status = "curve";
      menuItemClick($("#nav-curve-menu-item"));
      drawRandomCurve();
    } else if (initial_status == "#ellipse") {
      status = "ellipse";
      menuItemClick($("#nav-ellipse-menu-item"));
      drawRandomEllipse();
    } else if (initial_status == "#more-stuffff") {
      status = "note";
      menuItemClick($("#nav-note-menu-item"));
      hideCanvas();
    } else {
      status = "line";
      menuItemClick($("#nav-line-menu-item"));
      drawRandomLine();
    }
  }

  function unitTest() {
    console.log("*** UNITTEST ***");

    console.log("FUNCTION: getAlpha(color)");
    console.assert(getAlpha("rgba(0,0,0,1.00)") == 100, "alpha 100 test");
    console.assert(getAlpha("rgba(0,0,0,0.30)") == 30, "alpha 30 test");
    console.assert(getAlpha("rgba(0,0,0,0.00)") == 0, "alpha 0 test");

    console.log("FUNCTION: getHexColor(color)");
    console.assert(getHexColor("rgba(0,0,0,1.00)") == "#000000", "hex black test");
    console.assert(getHexColor("rgba(255,255,255,1.00)") == "#ffffff", "hex white test");
    console.assert(getHexColor("rgba(255,135,0,1.00)") == "#ff8700", "hex orange test");
    console.assert(getHexColor("rgba(215,15,40,0.50)") == "#d70f28", "hex crimson test");

    console.log("FUNCTION: getRgbColorList(color)");
    var c = getRgbColorList("rgba(0,0,0,1.00)");
    console.assert(c[0] == "0" && c[1] == "0" && c[2] == "0" && c[3] == "1.00", "rgblist black test");
    c = getRgbColorList("rgba(255,15,40,0.30)");
    console.assert(c[0] == "255" && c[1] == "15" && c[2] == "40" && c[3] == "0.30", "rgblist bright red test");

    console.log("FUNCTION: setAlpha(color, alpha)");
    console.assert(setAlpha("rgba(0,0,0,0.50)", 100) == "rgba(0,0,0,1.00)", "alpha 100 test");
    console.assert(setAlpha("rgba(0,0,0,1.00)", 30) == "rgba(0,0,0,0.30)", "alpha 30 test");
    console.assert(setAlpha("rgba(0,0,0,1.00)", 0) == "rgba(0,0,0,0.00)", "alpha 0 test", setAlpha("rgba(0,0,0,1.00)", 0));

    console.log("FUNCTION: setHexColor(color, hexColor)");
    console.assert(setHexColor("rgba(23,45,324,0.50)", "#000000") == "rgba(0,0,0,0.50)", "hex black test", setAlpha("rgba(23,45,324,0.50)", "#000000"));
    console.assert(setHexColor("rgba(0,0,0,0.50)", "#ffffff") == "rgba(255,255,255,0.50)", "hex white test", setAlpha("rgba(0,0,0,0.50)", "#ffffff"));
    console.assert(setHexColor("rgba(0,0,0,0.50)", "#ff8700") == "rgba(255,135,0,0.50)", "hex orange test", setAlpha("rgba(0,0,0,0.50)", "#ff8700"));
  }

  init();
  unitTest();
});


//function init () {
//
//  // Find the canvas element.
//  canvas = document.getElementById('main-canvas');
//  context = canvas.getContext('2d');
//
//  // Pencil tool instance.
//  tool = new tool_pencil();
//
//  // Attach the mousedown, mousemove and mouseup event listeners.
//  canvas.addEventListener('pointerdown', ev_canvas, false);
//  canvas.addEventListener('pointerup', ev_canvas, false);
//  canvas.addEventListener('pointermove', ev_canvas, false);
//}
//
//function distanceBetween(point1, point2) {
//  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
//}
//function angleBetween(point1, point2) {
//  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
//}
//
//// This painting tool works like a drawing pencil which tracks the mouse 
//// movements.
//function tool_pencil () {
//  var tool = this;
//  this.started = false;
//  var kk = new Image();
//  kk.src = 'img/brush3.png';
//  var canw = canvas.clientWidth;
//  var canh = canvas.clientHeight;
//
//  console.log(canw + " " + canh);
//
//  // This is called when you start holding down the mouse button.
//  // This starts the pencil drawing.
//  this.mousedown = function (ev) {
//    console.log("mousedown");
//    isDrawing = true;
//    lastPoint = { x: ev._x, y: ev._y };
//  };
//
//  this.pointerdown = function (ev) {
//    console.log("touchstart");
//
//    isDrawing = true;
//    lastPoint = { x: ev._x, y: ev._y };
//  };
//
//  // This function is called every time you move the mouse. Obviously, it only 
//  // draws if the tool.started state is set to true (when you are holding down 
//  // the mouse button).
//  this.mousemove = function (ev) {
//    if (!isDrawing) return;
//
//    var currentPoint = { x: ev._x, y: ev._y };
//    var dist = distanceBetween(lastPoint, currentPoint);
//    var angle = angleBetween(lastPoint, currentPoint);
//
//    for (var i = 0; i < dist; i+=1) {
//      x = lastPoint.x + (Math.sin(angle) * i);
//      y = lastPoint.y + (Math.cos(angle) * i);
//      context.drawImage(kk, x*1200/canw, y*800/canh, 3, 3);
//    }
//
//    lastPoint = currentPoint;
//  };
//
//  this.pointermove = function (ev) {
//    if (!isDrawing) return;
//
//    var currentPoint = { x: ev._x, y: ev._y };
//    var dist = distanceBetween(lastPoint, currentPoint);
//    var angle = angleBetween(lastPoint, currentPoint);
//
//    for (var i = 0; i < dist; i++) {
//      x = lastPoint.x + (Math.sin(angle) * i);
//      y = lastPoint.y + (Math.cos(angle) * i);
//      context.drawImage(kk, x*1200/canw + 600, y*800/canh + 400, 8, 8);
//    }
//
//    lastPoint = currentPoint;
//  };
//
//
//  // This is called when you release the mouse button.
//  this.mouseup = function (ev) {
//    console.log("mouseup");
//
//    isDrawing = false;
//  };
//
//  this.pointerup = function (ev) {
//    console.log("touchend");
//
//    isDrawing = false;
//  };
//}
//
//// The general-purpose event handler. This function just determines the mouse 
//// position relative to the canvas element.
//function ev_canvas (ev) {
//  ev.preventDefault();
//  if (ev.layerX || ev.layerX == 0) { // Firefox
//    ev._x = ev.layerX;
//    ev._y = ev.layerY;
//  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
//    ev._x = ev.offsetX;
//    ev._y = ev.offsetY;
//  }
//
//  // Call the event handler of the tool.
//  var func = tool[ev.type];
//  if (func) {
//    func(ev);
//  }
//}
//
//init();
//});
