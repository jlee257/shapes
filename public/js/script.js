/*
This is a JavaScript (JS) file.
JavaScript is the programming language that powers the web.

To use this file, place the following <script> tag just before the closing </body> tag in your HTML file, making sure that the filename after "src" matches the name of your file...

    <script src="script.js"></script>

Learn more about JavaScript at https://developer.mozilla.org/en-US/Learn/JavaScript

When you're done, you can delete all of this grey text, it's just a comment.
*/



$(document).ready(function () {
  $("#nav-expand-menu-item").click(function() {
    $('#nav-bar').toggleClass('transform-active');
    
    $('#nav-expand-button-icon').toggleClass('glyphicons-menu-hamburger').toggleClass('glyphicons-chevron-left');
  });
  
  $(".menu-item").click(function() {
    
    $(".menu-item").removeClass('nav-selected');
    $(this).addClass('nav-selected');
    
    if (!$('#nav-bar').hasClass('transform-active')) {
      $('#nav-bar').toggleClass('transform-active');
      $('#nav-expand-button-icon').toggleClass('glyphicons-menu-hamburger').toggleClass('glyphicons-chevron-left');
    }
  });
  
  $("#nav-line-menu-item").click(function() {
    page = "line";
    clearPage();
  });
  
  $("#nav-curve-menu-item").click(randomCurve);
  
  $("#ruler-icon").click(function() {
    
    console.log("grid");
    
    var interval = 500;
    
    ctx.beginPath();
    for(var i = 0; i < 3000; i+=interval) {
      for (var j = 0; j < 2000; j+=interval) {
        ctx.moveTo(i, j);
        ctx.lineTo(i + interval, j);
        ctx.lineTo(i + interval, j + interval);
        ctx.lineTo(i, j + interval);
        ctx.lineTo(i, j);
      }
    }
    ctx.stroke();
    
  });
  
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
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=0; g=0; b=0; a=255;

    // Select a fill style
//    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
  } 
  
  function getEventPoint(ev) {
    console.log(ev.layerX + " " + ev.offsetX + " " + ev.clientX);
    if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX*3000/el.clientWidth;
      ev._y = ev.offsetY*2000/el.clientHeight;
    } else if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } 
    return ev;
  }
  
  
  function getTouchPoint(e) {
    var rect = el.getBoundingClientRect();
    e._x = (e.touches[0].clientX - rect.left)*3000/el.clientWidth;
    e._y = (e.touches[0].clientY - rect.top)*2000/el.clientHeight;
    console.log()
    return e;
  }
  
  
  function clearPage() {
    ctx.clearRect(0, 0, el.width, el.height);
  }
  
  
  
  var page = "line";
  var el = document.getElementById('main-canvas');
  var ctx = el.getContext('2d');

  ctx.lineWidth = 5.5;
  ctx.lineJoin = ctx.lineCap = 'round';

  var isDrawing, points = [ ];
  var curve_points = [];
  

  
//  el.pointerdown = function(e) {
//    e.preventDefault();
//    if (page == "line") {
//      clearPage();
//    }
//    e = getEventPoint(e);
//    isDrawing = true;
//    points.push({ x: e._x, y: e._y });
//  }
//  
  el.onmousedown = function(e) {
    e.preventDefault();
    if (page == "line") {
      clearPage();
    }
    e = getEventPoint(e);
    isDrawing = true;
    points.push({ x: e._x, y: e._y });
  };
  
  el.ontouchstart = function(e) {
    e.preventDefault();
    if (page == "line") {
      clearPage();
    }
    e = getTouchPoint(e);
    isDrawing = true;
    points.push({ x: e._x, y: e._y });
  }
  
  
  
  
  
  el.onmousemove = function(e) {
    e.preventDefault();
    if (!isDrawing) return;
    console.log("onmouse");

    e = getEventPoint(e);
    points.push({ x: e._x, y: e._y });

    var p1 = points[0];
    var p2 = points[1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
//    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var midPoint = midPointBtw(p1, p2);
//      drawDot(ctx, p1.x, p1.y, 6);
//      drawDot(ctx, midPoint.x, midPoint.y, 12);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
//    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
  };
  
  
  el.ontouchmove = function(e) {
    e.preventDefault();
    if (!isDrawing) return;
    console.log("ontouch");

    e = getTouchPoint(e);
    points.push({ x: e._x, y: e._y });

    var p1 = points[0];
    var p2 = points[1];

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    //    console.log(points);

    for (var i = 1, len = points.length; i < len; i++) {
      // we pick the point between pi+1 & pi+2 as the
      // end point and p1 as our control point
      var midPoint = midPointBtw(p1, p2);
      //      drawDot(ctx, p1.x, p1.y, 6);
      //      drawDot(ctx, midPoint.x, midPoint.y, 12);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
      p1 = points[i];
      p2 = points[i+1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    //    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  el.onmouseup = function() {
    isDrawing = false;
    if (page == "line") {
      linearRegression();
    } else if (page == "curve") {
      curveApproximation();
    }
    points.length = 0;
  };
  
  
//  el.onpointerup = function() {
//    isDrawing = false;
//    if (page == "line") {
//      linearRegression();
//    } else if (page == "curve") {
//
//    }
//    points.length = 0;
//  };
//  
  
  el.ontouchend = function() {
    isDrawing = false;
    if (page == "line") {
      linearRegression();
    } else if (page == "curve") {
      curveApproximation();
    }
    points.length = 0;
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

      ctx.beginPath();
      var color;
      
      if (err < 3.0) {
        color = "rgb(0,255,0)";
      } else if (err < 9.0) {
        color = "rgb(" + Math.floor((err-3.0)*20 + 135) + ",255,0)";
      } else if (err < 19.0) {
        color = "rgb(255," + Math.floor((19.0-err)*25) + ",0)";
      } else {
        color = "rgb(255,0,0)";
      }
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(last.x, last.y);
      ctx.stroke();

      ctx.strokeStyle = "#000000";
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
    console.log(x_sum, x2_sum, y_sum, y2_sum, xy_sum);

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
  
  
  
  
//  
//  function linearRegression2() { 
//
//    var x_sum = 0.0, y_sum = 0.0, x2_sum = 0.0, y2_sum = 0.0, xy_sum = 0.0, n = points.length;
//
//    for (var i = 0, len = points.length; i < len; i++) {
//      x_sum += points[i].x;
//      x2_sum += points[i].x**2;
//      y_sum += points[i].y;
//      y2_sum += points[i].y**2;
//      xy_sum += points[i].x * points[i].y;
//    }
//    console.log(x_sum, x2_sum, y_sum, y2_sum, xy_sum);
//    
//    var ssxx = x2_sum - x_sum / points.length * x_sum;
//    var ssyy = y2_sum - y_sum / points.length * y_sum;
//    var ssxy = xy_sum - x_sum / points.length * y_sum;
//
//    var B = ((y2_sum - y_sum**2 / n) - (x2_sum - x_sum**2 / n)) / (x_sum / n * y_sum - xy_sum) / 2;
//    var cofb = (-B) + Math.sqrt(B**2 + 1);
//    var cofa = y_sum / n - cofb * x_sum / n;
//
//    var err = ssxy / ssxx * ssxy / ssyy;
//
//    
//    console.log("ssxy=" + ssxy + " ssxx=" + ssxx + " ssyy=" + ssyy + " error=" + err);
//    console.log("ssxy=" + ssxy + " ssxx=" + ssxx + " ssyy=" + ssyy + " error=" + (ssxy / ssyy * ssxy / ssxx));
//
//    
//
////    console.log("y=(" + cofb + ")x + (" + cofa + ") " + err);
//
//    plotLine(-cofb, 1, -cofa, "#ff0000");
//
//    cofb = (-B) - Math.sqrt(B**2 + 1);
//    cofa = y_sum / n - cofb * x_sum / n;
////    console.log("y=(" + cofb + ")x + (" + cofa + ")" + err);
//    plotLine(-cofb, 1, -cofa, "#00ff00");
//    
//  }
  
  
  
  function plotLine(xcof, ycof, cof) {
    var x_interx = (-cof / ycof);
    var y_interx = (-cof / xcof);
    var x3000_interx = (-cof - xcof*3000) / ycof;
    var y2000_interx = (-cof - ycof*2000) / xcof;
//    var err = Math.sqrt(ssxy/ ssxx * ssxy / ssyy);

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

//    console.log(coor);

//    $("#sometext").html("eq=(" + xcof + ")x + (" + ycof + ")y + (" + cof + ")");



    if (coor.length == 2) {
      ctx.beginPath();
//      var err=0;
      var color;
//
//      
      
      var err = 0;
      for (var i = 0, len = points.length; i < len; i++) {
        err += distanceFromLine(coor[0].x, coor[0].y, coor[1].x, coor[1].y, points[i].x, points[i].y)**2;
      }
      err = err / points.length;
      $("#sometext").html("err=" + err);
    
      if (err < 12) {
        color = "rgb(0,255,0)";
      } else if (err < 20) {
        color = "rgb(255,255,0)";
      } else if (err < 30) {
        color = "rgb(255,127,0)";
      } else {
        color = "rgb(255,0,0)";
      }
      
      ctx.strokeStyle = color;
      ctx.moveTo(coor[0].x, coor[0].y);
      ctx.lineTo(coor[1].x, coor[1].y);
      ctx.stroke();
      ctx.strokeStyle = "#000000";
    }
  }
  
  
  
  
  function randomCurve() {
    page = "curve";
    curve_points.length = 0;
    clearPage();
    
    var p1, p2, p3, p4, p5;
    
    p1 = { x:ranv(300, 2000), y:ranv(300, 1700) };
    p2 = { x:ranv(500, 2500), y:ranv(300, 1700) };
    p4 = { x:ranv(500, 2500), y:ranv(300, 1700) };
    p5 = { x:ranv(1000, 2700), y:ranv(300, 1700), z: 9000000 };
    p3 = midPointBtw(p2, p4, ranv(0.2, 0.8));
    
    drawDot(ctx,p1.x,p1.y,12);
    drawDot(ctx,p2.x,p2.y,12);
    drawDot(ctx,p3.x,p3.y,12);
    drawDot(ctx,p4.x,p4.y,12);
    drawDot(ctx,p5.x,p5.y,12);
    
    ctx.strokeStyle = "#ff0000"
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
    ctx.quadraticCurveTo(p4.x, p4.y, p5.x, p5.y);
    ctx.stroke();
    ctx.strokeStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    //    console.log(points);

    

    //    P(t) = (1-t)^2*P0 + 2t(1-t)P1 +t^2*P2.

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
    
//    curve_points.forEach(function(p) {
//      drawDot(ctx,p.x,p.y,12);
//    });
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
      
      console.log("point=" + i + "{" + points[i].x + "," + points[i].y + "} err=" + e);
      err += e;
    }
    
    
    for (var j = 0, jlen = curve_points.length; j < jlen; j++) {
      errz += curve_points[j].z;
    }
    
    console.log("final e=" + (err/points.length + errz/curve_points.length) + " points=" + points.length + " errtotal=" + err);
    
    $("#sometext").html("err=" + (err/points.length + errz/curve_points.length));
  }

  
  function ranv(min, max) {
    return Math.random() * (max - min) + min;
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