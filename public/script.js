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
    
    $('#nav-expand-button-icon').toggleClass('glyphicon glyphicon-menu-hamburger').toggleClass('glyphicon glyphicon-menu-left');
  });
  
  $(".menu-item").click(function() {
    
    $(".menu-item").removeClass('nav-selected');
    $(this).addClass('nav-selected');
    
    if (!$('#nav-bar').hasClass('transform-active')) {
      $('#nav-bar').toggleClass('transform-active');
      $('#nav-expand-button-icon').toggleClass('glyphicon glyphicon-menu-hamburger').toggleClass('glyphicon glyphicon-menu-left');
    }
  });
});