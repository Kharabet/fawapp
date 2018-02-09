(function () {

  $("#order-form-modal .modal-close").on("click", function () {
    $("#order-form-modal").modal('hide');
  });
  $(".order-now").on("click", function () {
    $("#order-form-modal").modal({ backdrop: "static", keyboard: false }).modal('show');
  });

  //https://codepen.io/nopr/pen/rpsnd change name of label when file chosen
  $("[type=file]").on("change", function () {
    // Name of file and placeholder
    var file = this.files[0].name;
    var dflt = $(this).attr("placeholder");
    if ($(this).val() != "") {
      $(this).next().text(file);
    } else {
      $(this).next().text(dflt);
    }
  });

  //smooth scroll https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
  var $root = $('html, body');
  $('a[href^="#"]').click(function () {
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
