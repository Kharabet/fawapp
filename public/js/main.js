(function(){

    $("#order-form .modal-close").on("click", function(){
        $("#order-form").modal('hide');

    });
    $(".order-now").on("click", function () {
        $("#order-form").modal({ backdrop: "static", keyboard: false }).modal('show');
    });

})();
