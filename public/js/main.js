//FAWapp custom JS-file 
// Bootstrap dependencies
import '../scss/main.scss'
window.$ = window.jQuery = require('jquery'); // required for bootstrap
// window.Popper = require('popper.js'); // required for tooltip, popup...
require('bootstrap');

(function () {

  $("#order-form-modal .close-modal").on("click", function () {
    $("#order-form-modal").modal('hide');
  });

  $(".order-now").on("click", function () {
    $("#order-form-modal").modal({ backdrop: "static", keyboard: false }).modal('show');
  });

  //custom fileinput
  $('input[type=file]' ).each( function()
  {
    var $input   = $(this),
    $label   = $input.closest('.inputfile-label'),
    labelVal = $label.find("filename").text();

    $input.on('change', function(e)
    {
      var fileName = '';      
      fileName = e.target.value.split('\\').pop();

      if(fileName)
        $label.find('span.filename').html(fileName);
      else
        $label.find("span.filename").text(labelVal);
    });

    // Firefox bug fix
    $input
    .on('focus', function(){ $input.addClass('has-focus'); })
    .on('blur', function(){ $input.removeClass('has-focus'); });
  });

  //smooth scroll https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
  var $root = $('html, body');
  $('a[href^="#"]').click(function () {
    if ($.attr(this, 'href') === "#") {
      return;
    }
    $root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);

    return false;
  });


  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

  //hide or show the "back to top" link
  $(window).scroll(function () {
    ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if ($(this).scrollTop() > offset_opacity) {
      $back_to_top.addClass('cd-fade-out');
    }
  });
})();
